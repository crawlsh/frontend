<template>
  <div>
    <div>
      <el-tooltip class="item" effect="dark" placement="left-end">
        <div slot="content">
          {{ $t("m.URLNotice") }}
        </div>
        <p>{{ $t('m.EnterLinkForComparisonDescription') }}</p>
      </el-tooltip>
      <el-input class="linkInput"
                :placeholder="$t('m.Link1')"
                clearable v-model="firstURL">
      </el-input>
      <el-input  class="linkInput"
                 :placeholder="$t('m.Link2')"
                 clearable v-model="secondURL">
      </el-input>
      <el-button type="primary" class="linkInput" plain @click="generateURLTemplate">{{ $t("m.Compare") }}</el-button>
    </div>
    <div class="paramInputContainer" v-show="showURLTemplates">
      <el-alert
        :title="$t('m.LinkTemplate')"
        type="info"
        description=''
        class="paramInputForm"
        show-icon>
        <el-tooltip class="item" effect="dark" placement="left-end">
          <div slot="content">
            {{ $t("m.LinkParamNotice") }}
          </div>
          <el-button type="text" class="urlTemplate">{{ URLTemplate }}</el-button>
        </el-tooltip>
      </el-alert>
      <div class="paramInputForm" v-for='(k, v) in URLParams.idParam'>
        <p>{{ $t('m.Key') }}{{ v }} <strong>{{ k }}</strong></p>
        <div class="inputParamValueContainer">
          <el-input-number @change="setParam(v)"
                           v-model="form[v.toString() + 'a']"></el-input-number>
          <h>-</h>
          <el-input-number @change="setParam(v)"
                           v-model="form[v.toString() + 'b']"></el-input-number>
        </div>
      </div>
      <div style="margin-top: 20px;">
        <el-alert
          type="success" v-show="showPossibilityExample">
          {{ $t('m.Possibility') }}: {{ possibility }}<br>
          {{ $t('m.Example') }}: <el-link :href="example" target="_blank">{{ example }}</el-link>
          <br>
          <h v-show="showTooManyError">
            {{ $t('m.ProCrawlLimit') }}
          </h>
        </el-alert>
      </div>
      <el-button type="primary" class="paramInputForm" @click="goCrawlForSelection">{{ $t('m.Done') }}</el-button>
    </div>
  </div>
</template>

<script>
    import proBadge from "./proBadge"
    export default {
      name: "crawlLinks",
      data() {
        return {
          value: '',
          firstURL: 'https://www.ethercap.com/cases/view?id=302',
          secondURL: 'https://www.ethercap.com/cases/view?id=30',
          URLParams: [],
          URLTemplate: {},
          showURLTemplates: false,
          form: {},
          linkParam: {},
          possibility: 0,
          example: "",
          showPossibilityExample: false,
          showTooManyError: false
        }
      },
      components: {
        proBadge
      },
      methods: {
        getURLParams(URL){
          return [
            URL.match(/http.+?\/\/.+?\/(.+)/)[1],
            URL.match(/http.+?\/\/.+?\//)[0],
          ];
        },
        splitIntAndString(string) {
          var matchingParam = [];
          let arr = string.split(/([0-9]+)/);
          arr.map((val) => {
            if (val != ""){
              matchingParam = matchingParam.concat(val);
            }
          });
          return matchingParam;
        },
        splitIntAndStringInArray(arr) {
          var matchingParam = [];
          arr.map((val) => {
            matchingParam = matchingParam.concat(this.splitIntAndString(val));
          });
          return matchingParam;
        },
        identifyDifference(param1, param2) {
          let arrayOfParam1 = this.splitIntAndStringInArray(param1.split(/[\/.?#@$%]/));
          let arrayOfParam2 = this.splitIntAndStringInArray(param2.split(/[\/.?#@$%]/));
          var maximumLen;
          var maximumArr;
          var minimumArr;
          var maximumParam;
          if (arrayOfParam1.length < arrayOfParam2.length){
            maximumLen = arrayOfParam2.length;
            maximumArr = arrayOfParam2;
            minimumArr = arrayOfParam1;
            maximumParam = param2;
          } else {
            maximumLen = arrayOfParam1.length;
            maximumArr = arrayOfParam1;
            minimumArr = arrayOfParam2;
            maximumParam = param1;
          }
          var correlation = [];
          for (var i=0; i<maximumLen; i++){
            for (var eachParamID in minimumArr){
              if(minimumArr[eachParamID] == maximumArr[i]){
                if (eachParamID == i){
                  //same location and same value
                  correlation = correlation.concat({"success": 1,
                    "sameLoc": 1, "param": i, "content": maximumArr[i]});
                  break;
                } else {
                  //same value but different location (for future development)
                  correlation = correlation.concat({"success": 1,
                    "sameLoc": 0, "param": [i, eachParamID], "content": maximumArr[i]});
                  break;
                }
              }
              if (eachParamID == minimumArr.length - 1){
                correlation = correlation.concat({"success": 0,
                  "sameLoc": 0, "param": i, "content": maximumArr[i]});
              }
            }
          }
          return [correlation, maximumArr, maximumParam];
        },
        generateURLTemplate() {
          let firstURL = this.firstURL;
          let secondURL = this.secondURL;
          var param1 = this.getURLParams(firstURL);
          var param2 = this.getURLParams(secondURL);
          var base = param1[1];
          var difference = this.identifyDifference(param1[0], param2[0]);
          var maximumParam = difference[2];
          var ids = [];
          var idParam = [];
          var currentMaxID = 0;
          for (var i in difference[0]){
            if (difference[0][i].success == 0){
              var isInt = true;
              for (var k in difference[1][difference[0][i].param]){
                if (difference[1][difference[0][i].param][k].charCodeAt() <= 57){
                  isInt = isInt && true;
                } else {
                  isInt = isInt && false;
                }
              }
              var insertParam = isInt ? `@{integer ID:${currentMaxID}}` : `@{string ID:${currentMaxID}}`;
              maximumParam = maximumParam.replace(difference[0][i].content, insertParam);
              idParam = idParam.concat(insertParam);
              ids = ids.concat(currentMaxID);
              currentMaxID++;
            }
          }

          let result = {
            "parsedURL": base + maximumParam,
            "idParam": idParam,
            "ids": ids,
          };
          this.showURLTemplates = true;
          this.URLParams = result;
          this.URLTemplate = result["parsedURL"];
        },
        setParam(k){
          let result = this.form[k.toString() + "a"] + "-" + this.form[k.toString() + "b"];
          this.linkParam[k.toString()] = result;
          this.getPossibility();
          this.getExample();
        },
        getPossibility(){
          let linkParam = this.linkParam;
          let totalCount = 1;
          for (let linkKey in linkParam){
            let currentLinkParam = linkParam[linkKey]
            let start = Number(currentLinkParam.split("-")[0]);
            let end = Number(currentLinkParam.split("-")[1]);
            let currentCount = end - start || 1;
            totalCount *= currentCount;
          }
          this.showPossibilityExample = true;
          this.possibility = totalCount < 0 ? "Unavailable" : totalCount
        },
        randomNum(minNum,maxNum){
          switch(arguments.length){
            case 1:
              return parseInt(Math.random()*minNum+1,10);
            case 2:
              return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            default:
              return 0;
          }
        },
        getExample(){
          let linkParam = this.linkParam;
          let link = this.URLParams["parsedURL"].toString();
          for (let linkKey in linkParam){
            let currentLinkParam = linkParam[linkKey];
            let currentIDParam = "@{integer ID:" + linkKey + "}";
            let start = Number(currentLinkParam.split("-")[0]);
            let end = Number(currentLinkParam.split("-")[1]);
            let randomSample = this.randomNum(start, end)
            link = link.replace(currentIDParam, randomSample)
          }
          this.showPossibilityExample = true;
          this.example = link;
          if (this.possibility > 30 && localStorage.getItem("isVIP") === "false"){
            this.showTooManyError = true
            return 0;
          }
        },
        goCrawlForSelection(){
          if (localStorage.getItem('hasLogin') == 0){
            this.$swal(this.$t("m.NotLoginError"), "", "error");
            return 0;
          }
          if (this.possibility > 1000){
            this.$swal("爬取可能性过多，请缩小爬取范围", "", "error");
            return 0;
          }


          this.$router.push({
            name: 'CrawlForSelection', query: {
              selectedMode: 0,
              exampleLink: btoa(this.firstURL),
              linkParam: btoa(JSON.stringify({
                param: this.linkParam,
                parsedLink: this.URLParams["parsedURL"].toString()
              }))
            }})
        }
      }
    }
</script>

<style scoped>
  .linkInput {
    margin-top: 15px;
  }
  .paramInputContainer{
    margin-top: 20px;
    border-style: solid;
    border-width: 0;
    border-top-width: 1px;
    border-color: #ccc;
  }
  .paramInputForm{
    margin-top: 20px;
  }
  .inputParamValueContainer{
    text-align: center;
  }
  .urlTemplate{
    padding: 0;
  }

</style>
