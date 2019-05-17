<template>
  <div>
  <section class="bkgIntro1Container">
    <i class="introIcon" data-feather="repeat"></i>

    <h1 class="title">自定义爬取方式</h1>
    <hr class="intro1Line">

    <div class="detailsContainer">
      <div class="nodeContainer">
        <h3 class="title">爬取全站</h3>
        <div class="introText">融合了国内主流短信供应商与数字营销技术的智能短信产品线，提供专业短信送达服务，包括验证码、系统通知等行业短信，新品推广、会员活动等营销短信。</div>
        <el-button class="btn btnGo" href="/doc">了解&nbsp;&nbsp;爬取全站</el-button>
      </div>
      <div class="nodeContainer">
        <h3 class="title">通过URL规则爬取</h3>
        <div class="introText">野狗通信云的PaaS型实时数据通信产品线，提供底层数据的实时同步和分发能力，并解决相应运维问题。企业和开发者无需再为App的底层数据通信问题而担忧，可专注于业务及产品创新上。</div>
        <el-button class="btn btnGo" href="/doc">了解&nbsp;&nbsp;链接爬取</el-button>
      </div>
    </div>
  </section>
  <section class="bkgIntro2Container">
    <i data-feather="filter" class="introIcon"></i>
    <h1 class=" title">自定义爬取内容</h1>
    <hr class="intro1Line">
    <div class="intro2Img"></div>
    <div class="intro2Content">
      <p class="introText">野狗通信云的PaaS型实时数据通信产品线</p>
    </div>
  </section>
  <section class="bkgFinalContainer">
    <h2 class="title" style="margin-top: 100px">使用Aparker的企业已有</h2>
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
    <el-button class="btnGo startToUseButton" href="#">开始使用</el-button>
  </section>
  <section class="footerContainer">
    <div class="footerContent">
      <div style="text-align: center;">
        <h1 style="font-size: 40px" class="title">
          这就是Crawl.sh👏
        </h1>
        <el-button href="#" style="margin-left: 11px;margin-bottom: 40px;width: 150px;">开始使用</el-button>
      </div>

      <el-divider style="width: 20px;"></el-divider>
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
    export default {
        name: "promo",
      data(){
          return {
            comment: [
              {
                img: "http://45.77.219.192/assets/testimonial-jet-logo.png",
                text: "“We use Buyer-Test at least every other day to identify areas of improvement across all " +
                  "shopping experiences. It’s helped us double our desktop " +
                  "conversion rate and increase shopping basket sizes by 8 percent.”",
                by: "@ Shou C"
              },
              {
                img: "http://45.77.219.192/assets/testimonial-jet-logo.png",
                text: "“We use Buyer-Test at least every other day to identify areas of improvement across all " +
                  "shopping experiences. It’s helped us double our desktop " +
                  "conversion rate and increase shopping basket sizes by 8 percent.”",
                by: "Shou C"
              },
              {
                img: "http://45.77.219.192/assets/testimonial-jet-logo.png",
                text: "“We use Buyer-Test at least every other day to identify areas of improvement across all " +
                  "shopping experiences. It’s helped us double our desktop " +
                  "conversion rate and increase shopping basket sizes by 8 percent.”",
                by: "Shou C"
              }
            ]
          }
      }
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
  .detailsContainer{
    width: 780px;
    margin: 70px auto 0;
    padding-top: 43px;
    padding-bottom: 40px;
    background: #FFF;
    /* -webkit-box-shadow: 0 0 5px 0 rgba(228,228,228,.5), 0 0 14px 0 rgba(227,227,227,.5); */
    box-shadow: 0 0 5px 0 rgba(228,228,228,.5), 0 0 14px 0 rgba(227,227,227,.5);
    border-radius: 10px;
    display: flex;
    z-index: 1000;

  }
  .nodeContainer{
    border-left: 1px dashed #e5e5e5;
    border-right: 1px dashed #e5e5e5;
    padding-left: 35px;
    padding-right: 35px;
    width: 50%;
    display: inline-block;
  }
  .introText{
    font-size: 14px;
    color: #969696;
    letter-spacing: .23px;
    line-height: 24px;
    margin-top: 30px;
    margin-bottom: 30px;
    text-align: justify;
  }
  .intro1Line{
    width: 100px;
    height: 1px;
    background-color: #666;
  }
  .bkgIntro2Container{
    text-align: center;
    margin-top: 100px;
  }
  .intro2Img{
    width: 780px;
    height: 300px;
    margin: 70px auto 0;
    background: #ccc;
    /* -webkit-box-shadow: 0 0 5px 0 rgba(228,228,228,.5), 0 0 14px 0 rgba(227,227,227,.5); */
    box-shadow: 0 0 5px 0 rgba(228,228,228,.5), 0 0 14px 0 rgba(227,227,227,.5);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    z-index: 1000;
  }
  .intro2Content{
    width: 780px;
    margin: 70px auto 0;
    margin-top: 0;
    background: #fff;
    /* -webkit-box-shadow: 0 0 5px 0 rgba(228,228,228,.5), 0 0 14px 0 rgba(227,227,227,.5); */
    box-shadow: 0 0 5px 0 rgba(228,228,228,.5), 0 0 14px 0 rgba(227,227,227,.5);
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    z-index: 1000;
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
  .commentBkg{
    position:absolute;

    height: 200px;
    width: 100%;
    background-color: #3884ff;
    transform: skew(0deg, -2deg);
  }
  .footerContainer{
    margin-top: 200px;
    padding: 100px;
    background: linear-gradient(-160deg, #24AADB 20%, #E94584 100%);
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
