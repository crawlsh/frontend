<template>
  <div>
    <container></container>
    <div class="pricingContainer">
      <div class="priceContainer" style="margin-right: 20px; height: max-content;">
        <h1>免费</h1>
        <div v-for="(desc, k) in free">
          <p><i class="el-icon-check" style="color: green;"></i> {{desc}}</p>
          <div class="line" v-show="k < free.length - 1"></div>
        </div>
        <el-button type="success" style="margin-top: 20px;" plain>开始使用</el-button>
      </div>
      <div class="priceContainer">
        <div style="display: flex;">
          <h1>4800 元</h1><h1 class="month">/ 月</h1>
        </div>
        <div v-for="(desc, k) in paid">
          <p><i class="el-icon-check" style="color: green;"></i> {{desc}}</p>
          <div class="line" v-show="k < paid.length - 1"></div>
        </div>
        <el-button type="success" style="margin-top: 20px;">支付</el-button>

      </div>
      <div class="priceContainer" style="margin-left: 20px; height: max-content;">
        <h1>联系我们</h1>
        <div v-for="(desc, k) in contact">
          <p><i class="el-icon-check" style="color: green;"></i> {{desc}}</p>
          <div class="line" v-show="k < contact.length - 1"></div>
        </div>
        <el-button type="success" style="margin-top: 20px;">留言</el-button>

      </div>

    </div>
  </div>
</template>

<script>
  import container from './container.vue'
  import coreContainer from './coreContainer.vue'
  import axios from 'axios'
  import BASE_URL from '../config'
  export default {
    name: "pricing",
    mixins: [coreContainer],
    components: {container},
    data(){
      return {
        free: ["多IP匿名爬取", "被墙网站爬取", "语义分析"],
        paid: ["更快的速度", "无限制爬取", "设置定时爬取", "语义分类/概括"],
        contact: ["本地部署", "破解高级反爬虫机制", "实现登陆", "更多..."]
      }
    }

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
