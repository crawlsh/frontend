<template>
  <div>
    <container></container>
    <div class="searchContainer">
      <div>
        <h1 class="title">
          <h class="step">步骤</h>
          <h class="step">1</h>
          <h class="totalStep">/&nbsp;&nbsp;2</h>
        </h1>
        <crawlLinks v-show="showCrawlLinks"></crawlLinks>
        <crawlModules v-show="showCrawlModules"></crawlModules>
        <crawlAll v-show="showCrawlWholeSites"></crawlAll>
      </div>
    </div>
  </div>
</template>

<script>
  import container from './container.vue'
  import coreContainer from './coreContainer.vue'
  import crawlLinks from './crawlLinks.vue'
  import crawlModules from './crawlModules.vue'
  import crawlAll from './crawlAll.vue'


  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        showCrawlLinks: 0,
        showCrawlWholeSites: 0,
        showCrawlModules: 0
      }
    },
    mounted(){
      let selectedMode = this.$route.query.selectedMode;
      switch (selectedMode) {
        case "0":
          this.showCrawlLinks = 1;
          return 1;
        case "1":
          this.showCrawlWholeSites = 1;
          return 1;
        default:
          this.showCrawlModules = 1;
          return 1;
      }
    },
    components: {
      container,
      crawlLinks,
      crawlModules,
      crawlAll
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
