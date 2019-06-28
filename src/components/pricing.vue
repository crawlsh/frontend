<template>
  <div>
    <container></container>
    <div class="pricingCoreContainer">
      <div class="pricingContainer" style="margin-right: 20px; height: max-content;">
        <h1>{{ $t('m.FreePriceLabel') }}</h1>
        <div v-for="(desc, k) in free">
          <p><i class="el-icon-check" style="color: green;"></i> {{desc}}</p>
          <div class="line" v-show="k < free.length - 1"></div>
        </div>
        <el-button type="success" style="margin-top: 20px;" plain @click="goHome">{{ $t('m.StartToUse') }}</el-button>
      </div>
      <div class="pricingContainer">
        <div style="display: flex;">
          <h1>199 RMB</h1><h1 class="month">/ {{ $t('m.Week') }}</h1>
        </div>
        <div v-for="(desc, k) in paid">
          <p><i class="el-icon-check" style="color: green;"></i> {{desc}}</p>
          <div class="line" v-show="k < paid.length - 1"></div>
        </div>

        <el-button type="success" style="margin-top: 20px;"
                   v-show="showPay"
                   @click="payMethodDialog = true">{{ $t('m.Pay') }}</el-button>
        <el-button disabled type="info" style="margin-top: 20px;margin-left: 0;"
                   v-show="!showPay">{{ $t('m.Bought') }}</el-button>
        <el-dialog
          :title="$t('m.SelectPayMethod')"
          :visible.sync="payMethodDialog"
          width="400px"
          :before-close="handleClose">
          <span>
            <a :href="backend + 'startPaypal'" target="_blank">
              <img src="https://cdn-bucket.ibkiller.com/img/PayPal.svg" >
            </a>
            <a :href="backend + 'startAlipay?userToken=' + userToken" target="_blank">
              <img src="https://cdn-bucket.ibkiller.com/img/AliPay_logo.svg" height="35px" width="125px">
            </a>
          </span>

        </el-dialog>
      </div>
      <div class="pricingContainer" style="margin-left: 20px; height: max-content;">
        <h1>{{ $t('m.ContactUs') }}</h1>
        <div v-for="(desc, k) in contact">
          <p><i class="el-icon-check" style="color: green;"></i> {{desc}}</p>
          <div class="line" v-show="k < contact.length - 1"></div>
        </div>
        <el-button type="success" style="margin-top: 20px;" @click="goSurvey">
          {{ $t('m.LeaveMsg') }}</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import container from './container.vue'
  import coreContainer from './coreContainer.vue'
  import axios from 'axios'
  import BASE_URL from '../config'
  import router from '../router'
  export default {
    name: "pricing",
    mixins: [coreContainer],
    components: {container},
    data(){
      return {
        free: [this.$t("m.FreeBenefit1"), this.$t("m.FreeBenefit2"), this.$t("m.FreeBenefit3")],
        paid: [this.$t("m.ProBenefit1"), this.$t("m.ProBenefit2"),
          this.$t("m.ProBenefit3"), this.$t("m.ProBenefit4")],
        contact: [this.$t("m.ContactBenefit1"), this.$t("m.ContactBenefit2"),
          this.$t("m.ContactBenefit3"), this.$t("m.ContactBenefit4")],
        payMethodDialog: false,
        showPay: true,
        backend: BASE_URL,
        userToken: localStorage.getItem("token")
      }
    },
    methods: {
      goHome(){
        router.push('/')
      },
      goSurvey(){
        window.location.href = 'https://surveys.hotjar.com/s?siteId=1337569&surveyId=134645'
      },
      startChecking(){
        axios.get(BASE_URL + 'isVIP?userToken=' + localStorage.getItem("token")).then(
          (res) => {
            if (res["data"]["success"]){
              localStorage.setItem("isVIP", res["data"]["info"]);
              if (res["data"]["info"]){
                this.payMethodDialog = false
                this.showPay = false
                this.$alert(this.$t("m.AlreadyVIP"), this.$t("m.Success"), {
                  confirmButtonText: this.$t("m.Back"),
                });
                this.stopChecking();
              }
            }
          }).catch((err) => {
          console.log(err)
        });
      },
      stopChecking(){
        clearInterval(this.timer);
      }
    },
    mounted() {
      this.startChecking()
      this.timer = setInterval(()=> {
        this.startChecking()
      }, 2000)
    },
    destroyed() {
      this.stopChecking();
    },

  }
</script>

<style scoped>
.pricingCoreContainer{
  display: flex;
  justify-content:center;
  margin-bottom: 50px;
}
.pricingContainer{
  text-align: left;
  width: 18%;
  background-color: #FFF;
  margin-top: 220px;
  padding: 30px 60px;
  border-radius: 20px;
  box-shadow: 0 3px 26px 0 rgba(0,0,0,0.20);
}
.month{
  margin-left: 10px;
  margin-top: 40px;
  font-size: 15px;
  font-weight: 300;
}
.line{
  background: #ddd;
  height: 1px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
