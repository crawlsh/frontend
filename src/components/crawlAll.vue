<template>
  <div>
    <p>输入任意一篇文章的链接</p>
    <el-input
              placeholder="链接"
              clearable v-model="exampleLink">
    </el-input>
    <el-button type="primary" class="submitButton" @click="nextStep">下一步</el-button>
  </div>

</template>

<script>
    export default {
        name: "crawlAll",
        data(){
          return {
            "exampleLink": ""
          }
        },
        methods: {
          nextStep(){
            this.$router.push({
              name: 'CrawlForSelection', query: {
                selectedMode: 1,
                exampleLink: btoa(this.exampleLink),
                }
              })
          }
        }
    }
</script>

<style scoped>
  .submitButton{
    margin-top: 20px;
  }
</style>
