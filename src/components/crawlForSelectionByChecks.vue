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
          <el-checkbox :label="k"  v-for="(check, k) in checksInfo">{{ check }}</el-checkbox>
        </el-checkbox-group>
      </div>
      <el-button style="margin-top: 20px">提交</el-button>
    </div>
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
        checkVal: []
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
