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
                 <span class="quote">,</span>
                 <li class="countDetails">7</li>
                 <li class="countDetails">5</li>
                 <li class="countDetails">3</li>
             </ol>
        </span>
    <el-button class="btnGo startToUseButton" href="#">开始使用</el-button>
  </section>
  <section class="footerContainer">
    <div class="container">
      <div class="row about footer-xs">
        <div class="col-lg-4 col-xs-12 col-md-3 col-sm-12 text-center mt-70">
          <h1 class="title">
            <img src="/static/spider.svg" height="30px" width="30px" style="margin-top: -5px">
            Aparker
          </h1>
        </div>
        <div>

        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
    export default {
        name: "promo"
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
    margin-left: 5px;
    margin-right: 5px;
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
  .footerContainer{
    margin-top: 100px;
    background: #f7f1e3;
    color: #000;
    padding: 100px;
  }
  .linking{
    color: #000;
    text-decoration: none;
  }
  .linking:hover{
    color: #666;
    text-decoration: none;
  }

  ol{
    list-style: none;
  }
</style>
