<template>
  <div>
    <container></container>
    <div class="searchContainer">
      <div>
        <h1 class="title">
          <h class="step">{{ $t('m.Step') }}</h>
          <h class="step">2</h>
          <h class="totalStep">/&nbsp;&nbsp;2</h>
        </h1>
      </div>
      <el-alert title="注意！"
                type="info"
      >
        为了您的账号安全，我们将网站的脚本以及格式内容删除了。如果没有看见所要爬取的内容，您可以点击如下按钮或联系我们。
        <br><br>
        <el-switch
          v-model="usingSelenium"
          @change="switchToSelenium"
        >
        </el-switch>
        <proBadge></proBadge>
      </el-alert>
      <br>
      <el-alert
                type="success"
      >
        点击您所要获取的信息的位置即可，请确保您选中了全部所需要的
      </el-alert>
      <br>
      <div class="browserContent">
        <div class="ball ballGreen"></div>
        <div class="ball ballYellow"></div>
        <div class="ball ballRed"></div>
      </div>
      <div class="linkContent">
        <p class="link">{{ exampleLink }}</p>
      </div>
      <iframe class="iframeFS" :src="FSFrameLink" id="cfsFrame"></iframe>
      <el-table
        :data="crawlParam"
        style="width: 100%;margin-top: 20px;"
        :default-sort = "{prop: 'date', order: 'descending'}"
        v-show="showTable"
      >
        <el-table-column
          prop="name"
          :label="$t('m.Name')"
          sortable>
        </el-table-column>
        <el-table-column
          prop="exampleContent"
          :label="$t('m.Time')"
          sortable>
        </el-table-column>
        <el-table-column
          prop="id"
          :label="$t('m.Setting')">
          <template slot-scope="scope">
            <el-button @click="startChangeCrawlParam(scope.row.id)">修改</el-button>
            <el-button type="primary" @click="delCrawlParam(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="setPeriodicTaskButton" type="primary" @click="startSetPeriodic">设置定时任务</el-button>
    </div>
    <el-dialog
      :title="$t('m.CrawlParamSetting')"
      :visible.sync="dialogPopNotice"
      width="70%"
    >
      <span>
        <p>{{$t('m.Content')}}</p>
        <el-input
          v-model="HTMLString"
          :disabled="true" type="textarea" :rows="10">
        </el-input>
        <p>{{$t('m.Name')}}</p>
        <el-input
          v-model="HTMLStringName" :placeholder="$t('m.SoundGood')">
        </el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPopNotice = false">{{ $t('m.Cancel') }}</el-button>
        <el-button type="primary" @click="confirmParam">{{ $t('m.Confirm') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="$t('m.PeriodicTaskSetting')"
      :visible.sync="dialogPeriodJob"
      width="40%"
    >
      <span>
          <el-radio v-model="isPeriodic" label="0">{{ $t('m.CrawlOnce') }}</el-radio>
          <el-radio v-model="isPeriodic" label="1">{{ $t('m.CrawlMultiple') }}</el-radio>
          <div v-show="isPeriodic == '1'" style="margin-top: 20px;">
            <h>{{ $t('m.TimeInterval') }}:&nbsp;&nbsp;&nbsp;</h>
            <el-input-number v-model="interval" :min="1" :max="100"></el-input-number>
          </div>
          <div v-show="isPeriodic == '1'" style="margin-top: 20px;">
            <h>{{ $t('m.MaxRetry') }}:&nbsp;&nbsp;&nbsp;</h>
            <el-input-number v-model="maxRetry" :min="1" :max="100"></el-input-number>
          </div>

      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPeriodJob = false">{{ $t('m.Cancel') }}</el-button>
        <el-button type="primary" @click="submitJob">{{ $t('m.Confirm') }}</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import container from './container.vue'
  import coreContainer from './coreContainer.vue'
  import axios from 'axios'
  import BASE_URL from '../config'
  import browserStyles from './browserStyles.vue'
  import proBadge from './proBadge.vue'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        exampleLink: '',
        showTable: false,
        postMessageListener: null,
        FSFrameLink: '',
        dialogPopNotice: false,
        dialogPeriodJob: false,
        HTMLString: 'Loading',
        HTMLStringName: '',
        isPeriodic: "0",
        crawlParam: [],
        currentID: '',
        currentMode: '', //whether editing
        interval: '',
        maxRetry: '',
        crawlID: '',
        usingSelenium: 0,

      }
    },
    mounted(){
      this.exampleLink = atob(this.$route.query.exampleLink);
      this.FSFrameLink = `${BASE_URL}crawlForSelectionHTML?url=${this.exampleLink}`+
        `&token=${localStorage.getItem("token")}`+
        `&selenium=0`;
      this.startListen();
    },
    components: {
      proBadge,
      container
    },
    methods: {
      switchToSelenium(){
        this.FSFrameLink = `${BASE_URL}crawlForSelectionHTML?url=${this.exampleLink}`+
          `&token=${localStorage.getItem("token")}`+
          `&selenium=${this.usingSelenium ? 1 : 0}`;
      },
      clearInput(){
        this.HTMLStringName = '';
        this.currentID = '';
        this.currentMode = 0;
      },
      cutShort(content){
        if (content.length > 20){
          return content.substring(0, 20) + "..."
        }
        return content
      },
      startListen(){
        this.postMessageListener = e => {
          var data = e.data;
          if(data.popNotice){
            console.log(data.crawlID)
            this.startSetCrawlParam(data.id, data.crawlID)
          }
        };
        window.addEventListener('message', this.postMessageListener)
      },
      startSetCrawlParam(_id, crawlID){
        this.currentMode = 0;
        this.currentID = _id;
        this.HTMLString = "Loading";
        this.crawlID = crawlID;
        let fd = new FormData();
        fd.append('token', localStorage.getItem("token"));
        fd.append('id', _id);
        fd.append('crawlID', crawlID);
        axios.post(BASE_URL + 'getContent', fd).then(
          (res) => {
            this.HTMLString = res["data"];
            this.dialogPopNotice = true;
          }).catch((err) => {
          console.log(err)
        });
      },
      setCrawlParam(){
        let name = this.HTMLStringName;
        let _id = this.currentID;
        let content = this.HTMLString;
        let exampleContent = this.cutShort(this.HTMLString);
        this.crawlParam.push({
          "name": name,
          "id": _id,
          "exampleContent": exampleContent,
          "content": content
        })
        this.dialogPopNotice = false;
        this.clearInput()
        this.updateTable()
        let cfsFrame = document.getElementById('cfsFrame');
        cfsFrame.contentWindow.postMessage({colorify:true, id: _id, name: name},'*');
      },
      delCrawlParam(_id){
        let deleteKey;
        this.crawlParam.map((v, k) => {
          if (v["id"] == _id){
            deleteKey = k;
          }
        });
        this.crawlParam.splice(deleteKey,1);
        this.updateTable();
        let cfsFrame = document.getElementById('cfsFrame');
        cfsFrame.contentWindow.postMessage({colorify:false, id: _id},'*');
      },
      startChangeCrawlParam(_id){
        this.currentMode = 1;
        let changeKey;
        this.crawlParam.map((v, k) => {
          if (v["id"] == _id){
            changeKey = k;
          }
        });
        this.HTMLString = this.crawlParam[changeKey]["content"];
        this.HTMLStringName = this.crawlParam[changeKey]["name"];
        this.currentID = _id;
        this.dialogPopNotice = true;
      },
      changeCrawlParam(){
        let _id = this.currentID;
        this.delCrawlParam(_id);
        this.setCrawlParam();
      },
      confirmParam(){
        return this.currentMode ? this.changeCrawlParam() : this.setCrawlParam()
      },
      updateTable(){
        if (this.crawlParam.length > 0){
          this.showTable = true
        } else {
          this.showTable = false
        }
      },
      getCrawlParamForSubmit(){
        let newCrawlParam = [];
        this.crawlParam.map((v) => {
          newCrawlParam.push({
            "name": v["name"],
            "id": v["id"]
          })
        });
        return newCrawlParam
      },
      startSetPeriodic(){
        if (this.crawlParam.length > 0){
          this.dialogPeriodJob = true;
        } else {
          alert("Set param first")
        }
      },
      submitJob(){
        switch (Number(this.$route.query.selectedMode)) {
          case 0:
            this.submitCrawlLinks();
            return
          case 1:
            this.submitCrawlAll();
            return
        }
      },
      submitCrawlLinks(){
        let crawlParam = btoa(JSON.stringify(this.getCrawlParamForSubmit()));
        let linkParam = this.$route.query.linkParam;
        let selenium = 0;
        let token = localStorage.getItem("token");
        let crawlID = this.crawlID;
        let periodicInfo = this.isPeriodic;
        let period = this.interval;
        let maxRetry = this.maxRetry;
        let fd = new FormData();
        fd.append('crawlParam', crawlParam);
        fd.append('linkParam', linkParam);
        fd.append('selenium', selenium);
        fd.append('token', token);
        fd.append('crawlID', crawlID);
        fd.append('periodicInfo', periodicInfo);
        fd.append('period', period);
        fd.append('maxRetry', maxRetry);
        axios.post(BASE_URL + 'crawlLinks', fd).then(
          (res) => {
            if (res["data"] == 1){
              this.$router.push({ name: 'History'});
            } else {
              alert("error")
            }
          }).catch((err) => {
          console.log(err)
        });
      },
      submitCrawlAll(){
        let crawlParam = btoa(JSON.stringify(this.getCrawlParamForSubmit()));
        let url = this.exampleLink;
        let selenium = "0";
        let token = localStorage.getItem("token");
        let crawlID = this.crawlID;
        let periodicInfo = this.isPeriodic;
        let period = this.interval;
        let maxRetry = this.maxRetry;
        let limit = "10";
        let fd = new FormData();
        fd.append('crawlParam', crawlParam);
        fd.append('url', url);
        fd.append('selenium', selenium);
        fd.append('token', token);
        fd.append('crawlID', crawlID);
        fd.append('periodicInfo', periodicInfo);
        fd.append('period', period);
        fd.append('maxRetry', maxRetry);
        fd.append('limit', limit);

        axios.post(BASE_URL + 'crawlWholeSite', fd).then(
          (res) => {
            if (res["data"] == 1){
              this.$router.push({ name: 'History'});
            } else {
              alert("error")
            }
          }).catch((err) => {
          console.log(err)
        });
      }
    },

    beforeDestroy() {
      window.removeEventListener('message', this.postMessageListener);
    },
    mixins: [coreContainer, browserStyles]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .step {
    font-size: 28px;
    font-weight: 400;
  }
  .totalStep {
    font-size: 12px;
    margin-left: -5px;
  }

  .setPeriodicTaskButton{
    margin-top: 20px;
  }




</style>
