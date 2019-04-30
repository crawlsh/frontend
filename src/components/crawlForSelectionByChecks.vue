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
        <el-checkbox-group v-model="checkVal">
          <el-checkbox :label="check"  v-for="(check, k) in checksInfo">{{ check }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button style="margin-top: 20px" @click="dialogPeriodJob = true">提交</el-button>
    </div>
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
  import store from '../store'
  import BASE_URL from '../config'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        crawlMethodsInfo: null,
        checksInfo: [],
        checkVal: [],
        isPeriodic: "0",
        interval: '',
        maxRetry: '',
        dialogPeriodJob: false
      }
    },
    mounted(){
      this.currentModule = this.$route.query.selectedMode;
      let crawlMethodsInfo = store.state.crawlMethodsInfo;
      if (store.state.crawlMethodsInfo){
        axios.get(BASE_URL + "getCrawlMethods").then((res) => {
          store.commit("setCrawlMethodsInfo", res["data"]);
          this.crawlMethodsInfo = res["data"][this.currentModule]
          this.checksInfo = this.crawlMethodsInfo["requirement"]["info"]["labels"];
        })
      } else {
        this.crawlMethodsInfo = crawlMethodsInfo[this.currentModule]
        this.checksInfo = this.crawlMethodsInfo["requirement"]["info"]["labels"];
      }
    },
    components: {
      container,
    },
    methods: {
      submitJob(){
        let userParamObj = JSON.parse(atob(this.$route.query.userParam));
        userParamObj["info"]["requiredContent"] = this.checkVal;
        let userParam = btoa(JSON.stringify(userParamObj));
        let crawlMethod = this.$route.query.selectedMode;
        let token = localStorage.getItem("token");
        let periodicInfo = this.isPeriodic;
        let period = this.interval;
        let maxRetry = this.maxRetry;
        let limit = "10";
        let fd = new FormData();
        fd.append('userParam', userParam);
        fd.append('crawlMethod', crawlMethod);
        fd.append('token', token);
        fd.append('periodicInfo', periodicInfo);
        fd.append('period', period);
        fd.append('maxRetry', maxRetry);
        fd.append('limit', limit);
        axios.post(BASE_URL + 'crawlModule', fd).then(
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


</style>
