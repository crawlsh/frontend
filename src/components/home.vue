<template>
  <div>
    <container></container>
    <div class="searchContainer">
      <h1 class="title">
        <img src="/static/spider.svg" height="30px" width="30px" class="logo" />
        <t style="font-family: 'Righteous', cursive;">
          {{ $t('m.App') }}
        </t>
      </h1>
      <h3 style="margin-top: -25px">{{ $t('m.Description') }}</h3>
      <el-tooltip class="item" effect="dark" placement="left-end">
        <div slot="content">
          <span v-html="$t('m.SearchAvailableNotice')"></span>
        </div>
        <p>{{ $t('m.ModeSelection') }}</p>
      </el-tooltip>
      <div class="customSelect">
        <el-select v-model="selectedMode" filterable :placeholder="$t('m.PleaseSelect')" class="selectContainer">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label + ' (' + item.description + ')'"
            :value="item.value">
            <span style="float: left">{{ item.description }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
        <div class="startJourneyContainer">
          <el-button class="btn btn-outline-dark startJourneyButton" type="button" @click="goCrawlSetting(selectedMode)">
            {{ $t('m.StartJourney') }}
          </el-button>
        </div>
      </div>
    </div>
    <promo></promo>
  </div>
</template>

<script>
import container from './container.vue'
import promo from './promo.vue'
import coreContainer from './coreContainer.vue'
import axios from 'axios'
import BASE_URL from '../config'
import store from '../store'

export default {
  name: 'Home',
  data () {
    return {
      selectedMode: '',
      options: [],
    }
  },
  mounted(){
    axios.get(BASE_URL + "getCrawlMethods").then((res) => {
      store.commit("setCrawlMethodsInfo", res["data"]);
      this.options = [{
        value: "0",
        label: 'CrawlLinks',
        description: this.$t("m.CrawlLinksLabel")
      },{
        value: "1",
        label: 'CrawlAllSite',
        description: this.$t("m.CrawlAllLabel")
      }]
      for (let method in res["data"]){
        this.options.push({
          value: method,
          label: res["data"][method]["name"],
          description: res["data"][method]["description"],
        })
      }
    })
    if (this.$route.query.confirm == 1){
      this.confirm()
    }
  },
  methods: {
    goCrawlSetting: function(selectedMode){
      this.$router.push({ name: 'CrawlSetting', query: { selectedMode: selectedMode }});
    },
    confirm(){
      let fd = new FormData();
      fd.append('authToken', this.$route.query.authToken);
      fd.append('email', this.$route.query.email);
      axios.post(BASE_URL + 'userConfirm', fd).then((res) => {
        if(res["data"]["success"] === 0){
          this.$swal("Oops", this.$t("m.VerifyUnSuccess"), "error");
          this.$router.push({ name: 'Home', query: {}});
        } else {
          this.$swal("OK", this.$t("m.VerifySuccess"), "success");
          localStorage.setItem("token", res["data"]["info"])
          localStorage.setItem("hasLogin", 1)
          window.location.href = "/"
        }
      })
    }
  },
  components: {
    container,
    promo
  },
  mixins: [coreContainer]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



  .selectContainer{
    width: 80% !important;
    background: #fff !important;
    border-bottom-left-radius: 0.25rem !important;
    border-top-left-radius: 0.25rem !important;
  }
  .startJourneyButton{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    margin-left: -1px;
  }
  .customSelect{
    display: flex;
    flex-direction: row;
  }
  .startJourneyContainer{
    width: 20%;
  }


</style>
