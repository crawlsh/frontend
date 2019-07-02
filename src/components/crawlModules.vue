<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio :label="3" v-show="isCrawlByOrderAvailable">{{ $t('m.CrawlByRandom')}}</el-radio>
      <el-radio :label="1" v-show="isCrawlByIDAvailable">{{ $t('m.CrawlByID')}}</el-radio>
      <el-radio :label="2" v-show="isCrawlByTimeAvailable">{{ $t('m.CrawlByTime')}}</el-radio>
    </el-radio-group>
    <div style="margin-top: 20px;">
      <div v-show="radio === 1">
        <el-alert
          title="一个例子"
          type="success">
          在新闻网站36Kr (https://36kr.com/)中<br>
          如果您希望获取第30-1000篇文章（依照时间顺序）<br>
          在以下输入框中输入30-1000即可<br>
        </el-alert>
        <br>
        <h>ID：  </h>
        <el-input-number v-model="startID" min="0"></el-input-number>
        <h>-</h>
        <el-input-number v-model="endID" min="0"></el-input-number>
      </div>
      <div v-show="radio === 2">

          <span class="demonstration">{{ $t('m.Time')}}：  </span>
          <el-date-picker
            v-model="time"
            type="monthrange"
            range-separator="-"
            :start-placeholder="$t('m.StartDate')"
            :end-placeholder="$t('m.EndDate')" class="font-family: 'Avenir', Helvetica, Arial, sans-serif;">
          </el-date-picker>
      </div>
      <div v-show="radio === 3">
        <el-alert
          title="一个例子"
          type="success">
          在新闻网站36Kr (https://36kr.com/)中<br>
          如果您希望随机获取30篇文章<br>
          在以下输入框中输入30<br>
        </el-alert>
        <br>
        <h>{{$t('m.Amount')}}：  </h>
        <el-input-number v-model="amount" min="1"></el-input-number>
      </div>
    </div>
    <el-button style="margin-top: 20px;" @click="nextStep">{{$t('m.Next')}}</el-button>
  </div>
</template>

<script>
  import store from '../store'
  import axios from 'axios'
  import BASE_URL from '../config'
  export default {
    name: "crawlLinks",
    data() {
      return {
        value: '',
        crawlMethodsInfo: null,
        currentModule: '',
        radio: 3,
        isCrawlByIDAvailable: 0,
        isCrawlByOrderAvailable: 0,
        isCrawlByTimeAvailable: 0,
        startID: 0,
        endID: 0,
        amount: 0,
        time: 0,
        isTesting: 0
      }
    },
    mounted(){
      this.currentModule = this.$route.query.selectedMode;
      this.isTesting = this.$route.query.isTesting;
      this.localServer = "http://127.0.0.1:" + this.$route.query.port + "/";
      let crawlMethodsInfo = store.state.crawlMethodsInfo;
      if (!store.state.crawlMethodsInfo || this.isTesting){
        axios.get((this.isTesting ? this.localServer : BASE_URL) + "getCrawlMethods").then((res) => {
          store.commit("setCrawlMethodsInfo", res["data"]);
          this.crawlMethodsInfo = res["data"][this.currentModule]
          this.showRadios();
        })
      } else {
        this.crawlMethodsInfo = crawlMethodsInfo[this.currentModule]
        this.showRadios();
      }
    },
    methods: {
      showRadios(){
        this.isCrawlByIDAvailable = this.crawlMethodsInfo['requirement']['info']['isCrawlByIDAvailable'];
        this.isCrawlByOrderAvailable = this.crawlMethodsInfo['requirement']['info']['isCrawlByOrderAvailable'];
        this.isCrawlByTimeAvailable = this.crawlMethodsInfo['requirement']['info']['isCrawlByTimeAvailable'];
      },
      nextStep(){
        let crawlBy;
        switch (this.radio){
          case 1:
            crawlBy = "ID"
            break
          case 2:
            crawlBy = "TIME"
            break
          case 3:
            crawlBy = "ORDER"
            break
        }
        let userParam = {
          "info": {
            "idRangeStart": this.startID,
            "idRangeEnd": this.endID,
            "timeRangeStart": crawlBy === "TIME" ? this.time[0].getTime()/1000 : "0",
            "timeRangeEnd":  crawlBy === "TIME" ? this.time[1].getTime()/1000 : "0",
            "requiredContent": [],
            "amount": this.amount,
          },
          "crawlBy": crawlBy,
        }
        if (localStorage.getItem('hasLogin') == null || localStorage.getItem('hasLogin') == 0){
          this.$swal(this.$t("m.NotLoginError"), "", "error");
          return 0;
        }
        if (crawlBy === "ID"){
          if (this.endID - this.startID <= 0){
            this.$swal("参数设置错误","", "error");
            return
          }
        }
        console.log(this.crawlMethodsInfo);
        this.$router.push({ name: 'CrawlForSelectionByChecks', query: {
          userParam: btoa(JSON.stringify(userParam)),
          selectedMode: this.$route.query.selectedMode,
          isTesting: this.isTesting,
          crawlMethodsInfo: btoa(
            unescape(encodeURIComponent(JSON.stringify(this.crawlMethodsInfo)))),
          localServer: (this.isTesting ? this.localServer : 0),
         }});
      }

    }
  }
</script>

<style scoped>
  .linkInput {
    margin-top: 15px;
  }
  .paramInputContainer{
    margin-top: 20px;
    border-style: solid;
    border-width: 0;
    border-top-width: 1px;
    border-color: #ccc;
  }
  .paramInputForm{
    margin-top: 20px;
  }
  .inputParamValueContainer{
    text-align: center;
  }
  .urlTemplate{
    padding: 0;
  }

</style>
