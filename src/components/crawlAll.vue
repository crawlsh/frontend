<template>
  <div>
    <p>{{$t('m.RandomlyInputArticleLink')}}</p>

    <el-tooltip class="item" effect="dark" placement="left-end">
      <div slot="content">
        <span v-html="$t('m.URLNotice')"></span>
      </div>
      <el-input
        :placeholder="$t('m.Link')"
        clearable v-model="exampleLink">
      </el-input>
    </el-tooltip>
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
            if (localStorage.getItem('hasLogin') == null || localStorage.getItem('hasLogin') == 0){
              this.$swal(this.$t("m.NotLoginError"), "", "error");
              return 0;
            }
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
