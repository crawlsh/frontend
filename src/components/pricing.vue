<template>
  <div>
    <container></container>
    <div class="pricingContainer">
      <div class="priceContainer" style="margin-right: 20px; height: max-content;">
        <h1>{{ $t('m.FreePriceLabel') }}</h1>
        <div v-for="(desc, k) in free">
          <p><i class="el-icon-check" style="color: green;"></i> {{desc}}</p>
          <div class="line" v-show="k < free.length - 1"></div>
        </div>
        <el-button type="success" style="margin-top: 20px;" plain @click="goHome">{{ $t('m.StartToUse') }}</el-button>
      </div>
      <div class="priceContainer">
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
          width="30%"
          :before-close="handleClose">
          <span>
            <a :href="backend + '/startPaypal'" target="_blank">
              <img src="https://cdn-bucket.ibkiller.com/img/PayPal.svg" >
            </a>
            <a :href="backend + '/startAlipay'" target="_blank">
              <img src="https://cdn-bucket.ibkiller.com/img/AliPay_logo.svg" height="35px" width="125px">
            </a>
          </span>

        </el-dialog>
      </div>
      <div class="priceContainer" style="margin-left: 20px; height: max-content;">
        <h1>{{ $t('m.ContactUs') }}</h1>
        <div v-for="(desc, k) in contact">
          <p><i class="el-icon-check" style="color: green;"></i> {{desc}}</p>
          <div class="line" v-show="k < contact.length - 1"></div>
        </div>
        <el-button type="success" style="margin-top: 20px;">{{ $t('m.LeaveMsg') }}</el-button>
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
        free: ["多IP匿名爬取", "被墙网站爬取", "语义分析"],
        paid: ["更快的速度", "无限制爬取", "设置定时爬取", "语义分类/概括"],
        contact: ["本地部署", "破解高级反爬虫机制", "实现登陆", "更多..."],
        payMethodDialog: false,
        showPay: true,
        backend: BASE_URL
      }
    },
    methods: {
      goHome(){
        router.push('/')
      },
      startChecking(){
        axios.get(BASE_URL + 'isVIP?userToken=' + localStorage.getItem("token")).then(
          (res) => {
            if (res["data"]["success"]){
              localStorage.setItem("isVIP", res["data"]["info"]);
              if (res["data"]["info"]){
                this.payMethodDialog = false
                this.showPay = false
                this.$alert('你已经是VIP啦，请不要重复购买！', '成功！', {
                  confirmButtonText: '返回',
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
.pricingContainer{
  display: flex;
  justify-content:center;
  margin-bottom: 50px;
}
.priceContainer{
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
