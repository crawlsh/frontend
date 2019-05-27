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
        <el-checkbox-group v-model="checkVal">
          <el-checkbox :label="check"  v-for="(check, k) in checksInfo">{{ check }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button style="margin-top: 20px" @click="dialogPeriodJob = true">{{ $t('m.Submit') }}</el-button>
    </div>
    <el-dialog
      title="定时任务设置"
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
  import store from '../store'
  import BASE_URL from '../config'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        crawlMethodsInfo: null,
        checksInfo: [],
        checkVal: [],
        isPeriodic: "0",
        interval: '',
        maxRetry: '',
        isTesting: '',
        dialogPeriodJob: false
      }
    },
    mounted(){
      this.isTesting = this.$route.query.isTesting;
      this.crawlMethodsInfo = JSON.parse(atob(this.$route.query.crawlMethodsInfo));
      this.checksInfo = this.crawlMethodsInfo["requirement"]["info"]["labels"];
      this.localServer = this.$route.query.localServer;
    },
    components: {
      container,
    },
    methods: {
      submitJob() {
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
        axios.post((this.isTesting ? this.localServer : BASE_URL) + 'crawlModule', fd).then(
          (res) => {
            if (res["data"] == 1) {
              this.$router.push({name: 'History'});
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
