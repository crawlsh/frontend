<template>
  <div>
    <container></container>
    <div class="searchContainer">
      <div>
        <h1 class="title">
          <h class="step">步骤</h>
          <h class="step">2</h>
          <h class="totalStep">/&nbsp;&nbsp;2</h>
        </h1>
      </div>
      <div class="browserContent">
        <div class="ball ballGreen"></div>
        <div class="ball ballYellow"></div>
        <div class="ball ballRed"></div>
      </div>
      <div class="linkContent">
        <p class="link">{{ exampleLink }}</p>
      </div>
      <iframe class="iframeFS" :src="FSFrameLink"></iframe>
      <el-table
        :data="crawlParam"
        style="width: 100%;margin-top: 20px;"
        :default-sort = "{prop: 'date', order: 'descending'}"
        v-show="showTable"
      >
        <el-table-column
          prop="name"
          label="名称"
          sortable>
        </el-table-column>
        <el-table-column
          prop="exampleContent"
          label="内容"
          sortable>
        </el-table-column>
        <el-table-column
          prop="id"
          label="设置">
          <template slot-scope="scope">
            <el-button @click="startChangeCrawlParam(scope.row.id)">修改</el-button>
            <el-button type="primary" @click="delCrawlParam(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="setPeriodicTaskButton" type="primary" @click="startSetPeriodic">设置定时任务</el-button>
    </div>
    <el-dialog
      title="爬取内容设置"
      :visible.sync="dialogPopNotice"
      width="70%"
    >
      <span>
        <p>内容</p>
        <el-input
          v-model="HTMLString"
          :disabled="true" type="textarea" :rows="20">
        </el-input>
        <p>名称</p>
        <el-input
          v-model="HTMLStringName" placeholder="好听一点哦">
        </el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPopNotice = false">取 消</el-button>
        <el-button type="primary" @click="confirmParam">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="定时任务设置"
      :visible.sync="dialogPeriodJob"
      width="40%"
    >
      <span>
          <el-radio v-model="isPeriodic" label="0">爬取一次</el-radio>
          <el-radio v-model="isPeriodic" label="1">爬取多次</el-radio>
          <div v-show="isPeriodic == '1'" style="margin-top: 20px;">
            <h>时间间隔:&nbsp;&nbsp;&nbsp;</h>
            <el-input-number v-model="interval" :min="1" :max="100"></el-input-number>
          </div>
          <div v-show="isPeriodic == '1'" style="margin-top: 20px;">
            <h>尝试次数:&nbsp;&nbsp;&nbsp;</h>
            <el-input-number v-model="maxRetry" :min="1" :max="100"></el-input-number>
          </div>

      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPeriodJob = false">取 消</el-button>
        <el-button type="primary" @click="submitJob">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import container from './container.vue'
  import coreContainer from './coreContainer.vue'
  import axios from 'axios'
  import BASE_URL from '../config'
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
        crawlID: ''
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
      container
    },
    methods: {
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
      },
      delCrawlParam(_id){
        let deleteKey;
        this.crawlParam.map((v, k) => {
          if (v["id"] == _id){
            deleteKey = k;
          }
        });
        this.crawlParam.splice(deleteKey,1);
        this.updateTable()
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
    mixins: [coreContainer]
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
  .browserContent {
    height: 40px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #555;
    width: 100%;
    border-width: 0px;
  }
  .ballGreen {
    background-color: #00b894;
    border-color: #00b894;
  }
  .ballYellow {
    background-color: #fdcb6e;
    border-color: #fdcb6e;
  }
  .ballRed {
    background-color: #d63031;
    border-color: #d63031;
  }
  .ball {
    height: 8px;
    width: 8px;
    float: left;
    margin-top: 14px;
    margin-left: 9px;
    border-style: solid;
    border-radius: 7px;
  }
  .linkContent {
    height: 25px;
    border-style: solid;
    border-width: 0.5px;
    border-color: #555;
    border-top-width: 0px;
    padding: 1px;
    padding-left: 5px;
  }
  .link{
    margin: 0;
  }
  .iframeFS {
    height: 600px;
    width: 100%;
    border-style: solid;
    border-width: 0.5px;
    border-top-width: 0px;
    border-radius: 0 0 5px 5px;
    border-color: #555;
  }
  .setPeriodicTaskButton{
    margin-top: 20px;
  }




</style>
