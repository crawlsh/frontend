<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio :label="1" v-show="isCrawlByIDAvailable">通过ID爬取</el-radio>
      <el-radio :label="3" v-show="isCrawlByOrderAvailable">随机爬取</el-radio>
      <el-radio :label="2" v-show="isCrawlByTimeAvailable">通过时间爬取</el-radio>
    </el-radio-group>
    <div style="margin-top: 20px;">
      <div v-show="radio === 1">
        <h>ID：  </h>
        <el-input-number v-model="startID"></el-input-number>
        <h>至</h>
        <el-input-number v-model="endID"></el-input-number>
      </div>
      <div v-show="radio === 2">
          <span class="demonstration">时间：  </span>
          <el-date-picker
            v-model="time"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份" class="font-family: 'Avenir', Helvetica, Arial, sans-serif;">
          </el-date-picker>
      </div>
      <div v-show="radio === 3">
        <h>数量：  </h>
        <el-input-number v-model="amount"></el-input-number>
      </div>
    </div>
    <el-button style="margin-top: 20px;" @click="nextStep">下一步</el-button>
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
        radio: 1,
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
        this.$router.push({ name: 'CrawlForSelectionByChecks', query: {
          userParam: btoa(JSON.stringify(userParam)),
          selectedMode: this.$route.query.selectedMode,
          isTesting: this.isTesting,
          crawlMethodsInfo: btoa(JSON.stringify(this.crawlMethodsInfo)),
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
