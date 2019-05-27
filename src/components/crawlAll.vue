<template>
  <div>
    <p>{{$t('m.RandomlyInputArticleLink')}}</p>
    <el-input
              :placeholder="$t('m.link')"
              clearable v-model="exampleLink">
    </el-input>
    <el-button type="primary" class="submitButton" @click="nextStep">{{ $t('m.Next') }}</el-button>
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
