<template>
  <div>
  <section class="bkgIntro1Container">
    <i class="introIcon" data-feather="repeat"></i>

    <h1 class="title">我们的优势
    </h1>
    <hr class="intro1Line">
    <div class="detailsContainer">
      <div class="tocContainer">
        <div :class="'featuresContainer feature' + v.id" @mouseover="showFeature(v.id)" v-for="v in [
          {name: '快速', id: 1, pic: '/static/zap.svg',desc: '爬取1w+篇文章仅需8分钟'},
          {name: '文本分析', id: 2, pic: '/static/dollar-sign.svg',desc: '内置强大AI算法'},
          {name: '安全', id: 3, pic: '/static/shield.svg',desc: '被爬网站无法追踪到用户'}]">
          <div class="feature">
            <img :src="v.pic" height="35px" width="35px" style="margin-top: 32.5px; margin-left: 15px;">
            <div class="featuresText">
              <span>{{v.name}}</span>
              <br>
              <span style="font-size: 15px;">{{v.desc}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="nodeContainer" style="text-align: left;">
        <div v-show="isFeature1">
          <mapContainer></mapContainer>
          <p>我们在世界各地有上万台爬取服务器，每当收到爬取任务，系统会判断出网站访问速度最快的一百台服务器并进行爬取</p>
        </div>
        <div v-show="isFeature2">
          <h3>例子</h3>
          <div class="feature2Example">
            <el-popover
              placement="right-start"
              title="分析结果"
              width="200"
              trigger="hover">
              <h>情感：0.5001<br>总结：Crawl.sh 是一个爬虫网站</h>
              <el-button slot="reference" type="text">Crawl.sh 是一个爬虫网站</el-button>
            </el-popover>
            <br>
            <el-popover
              placement="right-start"
              title="分析结果"
              width="200"
              trigger="hover">
              <h>情感：0.1491<br>总结：开发者是坏蛋</h>
              <el-button slot="reference" type="text">这个网站的开发者是一个无恶不作的大坏蛋</el-button>
            </el-popover>
            <br>
            <el-popover
              placement="right-start"
              title="分析结果"
              width="200"
              trigger="hover">
              <h>情感：0.8736<br>总结：开发者捐献</h>
              <el-button slot="reference" type="text">这个网站的开发者将盈利所得捐献给贫困山区</el-button>
            </el-popover>
          </div>
          <p>我们采用爬取的海量数据训练机器学习模型，从而使自然语义分析更精准高效</p>
        </div>
        <div v-show="isFeature3">
          <div style="background: #010e28;padding: 20px;border-radius: 20px;text-align: center;">
            <img src="/static/safe.png" height="280px"/>
          </div>
          <p>{{$t("m.Feature3")}}</p>
        </div>

      </div>
    </div>
  </section>

  <section class="bkgFinalContainer">
    <h2 class="title" style="margin-top: 100px">使用Crawl.sh的用户已有</h2>
    <span class="count">
             <ol class="total">
                 <li class="countDetails">4</li>
                 <li class="countDetails">0</li>
                 <span class="quote">&nbsp;,</span>
                 <li class="countDetails">7</li>
                 <li class="countDetails">5</li>
                 <li class="countDetails">3</li>
             </ol>
        </span>
    <el-button class="btnGo startToUseButton" href="#">查看用户留言</el-button>
  </section>
  <section class="startUseContainer">
    <div style="text-align: center;">
      <h1 style="font-size: 40px" class="title">
        这就是Crawl.sh👏
      </h1>
      <el-button href="#" style="margin-left: 11px;margin-bottom: 40px;width: 150px;">开始使用</el-button>
    </div>
  </section>
  <section class="footerContainer">

    <div class="footerContent">
      <div style="display: flex;justify-content:center;">

        <div class="linkingContainer">
          <a class="linking" href="https://docs.crawl.sh/#/en/Crawl">使用文档</a><br>
          <a class="linking" href="#">联系方式</a><br>
          <a class="linking" href="#">合作</a><br>
        </div>
        <div class="linkingContainer">
          <a class="linking" href="https://docs.crawl.sh/#/?id=1">服务条款</a><br>
          <a class="linking" href="https://docs.crawl.sh/#/?id=security">隐私策略</a><br>
          <a class="linking" href="https://docs.crawl.sh/#/?id=security">安全</a><br>
        </div>
        <div class="linkingContainer rightLinkingContainer">
          <a class="linking" href="https://zwang.tech">关于我们</a><br>
          <a class="linking" href="https://docs.crawl.sh/#/?id=cases">客户案例</a><br>
        </div>
      </div>
      <p class="copyright">© 2019 Zhanwang Tech.</p>
    </div>
  </section>
  </div>
</template>

<script>
  import { VueTyper } from 'vue-typer'
  import mapContainer from "./map.vue"
    export default {
      name: "promo",

      data(){
          return {
            isFeature1: true,
            isFeature2: false,
            isFeature3: false,
          }
      },
      methods: {
        hideFeatures(){
          this.isFeature1 = false
          this.isFeature2 = false
          this.isFeature3 = false

        },
        showFeature(id){
          this.hideFeatures()
          if (id == 1){
            this.isFeature1 = true
          }
          if (id == 2){
            this.isFeature2 = true
          }
          if (id == 3){
            this.isFeature3 = true
          }
        }
      },
      components:{mapContainer, VueTyper}
    }
</script>

<style scoped>
  #promo{
    position: absolute;
    width: 100%;
  }
  .bkgIntro1Container{
    height: 580px;
    border-style: solid;
    border-width: 0;
    border-bottom-width: 1px;
    border-color: #eee;
    text-align: center;
  }
  .introIcon{
    margin-top: 150px;
    margin-bottom: 50px;
    height: 40px;
    width: 40px;
  }
  .feature2Example{
    border-radius: 10px;
    padding: 15px;
    box-shadow: 1px 1px 8px 0 #ccc;
  }

  .detailsContainer{
    width: 1000px;
    margin: 10px auto 0;
    padding-top: 43px;
    padding-bottom: 40px;
    background: #FFF;
    display: flex;
    z-index: 1000;
  }
  .tocContainer{
    width: 200px;
    padding-left: 35px;
    padding-right: 35px;
    width: 30%;
    display: inline-block;
  }
  .featuresContainer{
    border-radius: 10px;
    height: 100px;
    box-shadow: 0 0 5px 0 #ccc;
    margin-top: 20px;
  }
  .feature1:hover{
    border: 1px solid #6b5df4;
    box-shadow: 0 2px 6px 0 #6b5df4;
  }
  .feature2:hover{
    border: 1px solid #3ACEB5;
    box-shadow: 0 2px 6px 0 #04BAA8;
  }
  .feature3:hover{
    border: 1px solid #f4ad4d;
    box-shadow: 0 2px 6px 0 #f4ad4d;
  }
  .feature {
    display: flex;
  }
  .featuresText {
    text-align: left;
    float: left;
    margin: 10px;
    margin-top: 20px;
    font-size: 20px;
  }
  .featuresContainerSelected{
    box-shadow: 0 0 5px 0 #000;
  }
  .nodeContainer{
    border-left: 1px dashed #e5e5e5;
    padding-left: 35px;
    padding-right: 35px;
    width: 50%;
    display: inline-block;
  }

  .intro1Line{
    width: 100px;
    height: 1px;
    background-color: #666;
  }


  .bkgFinalContainer{
    text-align: center;
    margin-top: 100px;
  }
  .count{
    margin: 30px auto 0;
    display: block;
    line-height: 1.5;
    width: 295px;
    padding-bottom: 50px;
    border-bottom: 1px dashed #e5e5e5;
  }
  .total{
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: inline-block;
  }
  .countDetails{
    float: left;
    padding-left: 2px;
    padding-right: 1.5px;
    padding-top: 3px;
    margin-left: 5px;
    width: 24px;
    height: 32px;
    border: 1px solid #ccc;
    font-weight: 300;
    font-size: 20px;
    color: #333;
    border-radius: 3px;
  }
  .quote{
    font-size: 18px;
    float: left;
    line-height: 0;
    margin-top: 16px;
    color: #333;
    margin-bottom: 0;
  }
  .startToUseButton{
    margin-top: 20px;

  }
  .btnGo{
    color: #ff9f43;
    border-color: #feca57;
  }
  .btnGo:hover{
    background-color: #ff9f43;
    color: #fff;
  }
  .startUseContainer{
    margin-top: 120px;
    color: #fff;
    background-color: #0652DD;
    padding: 50px;
  }
  .footerContainer{
    padding: 100px;
    background: #010e28;
    color: #fff;
  }
  .linkingContainer{
    margin-top: 40px;
    margin-right: 100px;
    display: block;
  }
  .rightLinkingContainer{
    margin-right: 0;
  }
  .linking{
    color: #fff;
    text-decoration: none;
  }
  .linking:hover{
    color: #ddd;
    text-decoration: none;
  }
  .copyright{
    margin-top: 50px;
    text-align: center;
    font-size: 15px;
    color: #ccc;
  }

  ol{
    list-style: none;
  }
</style>
