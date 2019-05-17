<template>
  <div>
    <container></container>
    <div style="display: flex;justify-content:center;margin-bottom: 50px;">
      <div class="container leftContainer">
        <span class="tocLabel">目录</span>
        <el-tree :data="urlInfo">
          <span style="width: 100%;" slot-scope="{ node, data }" @click="showInfo(node)">
            <span>{{ cutShort(node.data["url"]) }}</span>
          </span>
        </el-tree>
      </div>
      <div class="container rightContainer">
        <div class="buttonContainer">
          <el-button>复制带格式内容</el-button>
          <el-button>复制无格式内容</el-button>
          <el-button>复制网址</el-button>
          <div class="line"></div>
          <el-button @click="showAnalysis('sentiment')"
                     style="margin-bottom: 10px;margin-left: 0; margin-right: 10px;">情感分析</el-button>
          <el-button @click="showAnalysis('summary')"
                     style="margin-bottom: 10px;margin-left: 0; margin-right: 10px;">文本简介</el-button>
          <el-button v-for='v in buttonInfo' @click="showAnalysis(v)"
                     style="margin-bottom: 10px;margin-left: 0; margin-right: 10px;">{{ v }}</el-button>
        </div>
        <el-alert v-show="showMsg">{{alertMsg}}</el-alert>
        <div>
          <h3>带格式内容</h3>
          <div class="browserContent">
            <div class="ball ballGreen"></div>
            <div class="ball ballYellow"></div>
            <div class="ball ballRed"></div>
          </div>
          <div class="linkContent">
            <p class="link">{{ exampleLink }}</p>
          </div>
          <iframe class="iframeFS iframeFSLocal" :srcdoc="styledContent">

          </iframe>
        </div>
        <div>
          <h3>无格式内容</h3>
          <el-input type="textarea" disabled :value="unstyledContent" :autosize="{ minRows: 2, maxRows: 20}"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import container from './container.vue'
  import axios from 'axios'
  import BASE_URL from '../config'
  import browserStyles from './browserStyles.vue'

  export default {
    name: "historyDetail",
    data(){
      return {
        buttonInfo: [],
        urlInfo: [],
        exampleLink: "",
        styledContent: "",
        unstyledContent: "",
        currentNode: null,
        showMsg: false,
        alertMsg: ""
      }
    },
    mounted(){
      axios.get(BASE_URL + "getResult?jobToken=" +
        this.$route.query.jobToken).then((res) => {
        this.urlInfo = res["data"]["info"];
        let children = [];
        for (let i in this.urlInfo[0]["content"]){
          children.push(
            {url: this.urlInfo[0]["content"][i]["name"]}
          )
        }
        for (let j in this.urlInfo){
          this.urlInfo[j]["children"] = children
        }
      })
      let fd = new FormData();
      fd.append('token', localStorage.getItem("token"));
      axios.post(BASE_URL + 'getClassify', fd).then(
        (res) => {
          if (res["data"]["success"]){
            this.buttonInfo = res["data"]["info"]
          }
      })

    },
    methods: {
      cutShort(content){
        if (/(http.+?\/\/)(.+?)\//.test(content)){
          content = ".../" + content.replace(/(http.+?\/\/)(.+?)\//, "")
          if (content.length > 35){
            return content.substring(0, 35) + "..."
          }
          return content
        }
        return content
      },
      getDataByName(arr, name){
        for (let i in arr["content"]){
          if(arr["content"][i]["name"]===name){
            return arr["content"][i]
          }
        }
      },
      showInfo(content){
        if (content.isLeaf) {
          let name = content["data"]["url"]
          let parentNode = content["parent"]["data"]
          let currentNode = this.getDataByName(parentNode, name)
          if (currentNode["content"]===""){
            alert("UNSUCCESS")
            return;
          }
          this.currentNode = currentNode
          this.exampleLink = parentNode["url"]
          this.styledContent = currentNode["content"]
          this.unstyledContent = currentNode["string"]
          this.showMsg = false
        }
      },
      getPolarity(name){
        for(let i in this.currentNode["polarity"]){
          if (this.currentNode["polarity"][i]["name"]===name){
            return this.currentNode["polarity"][i]["info"]
          }
        }
      },
      showAnalysis(name){
        let content = this.getPolarity(name)
        if (content === undefined){
          this.alertMsg = "NO_CONTENT"
        } else {
          this.alertMsg = content
        }
        this.showMsg = true
      }
    },
    components: {
      container
    },
    mixins: [browserStyles]
  }
</script>

<style scoped>
  .container {
    text-align: left;
    background-color: #FFF;
    margin-top: 220px;
    padding: 30px 60px;
    border-radius: 20px;
    box-shadow: 0 3px 26px 0 rgba(0,0,0,0.20);
  }
  .leftContainer{
    overflow-y: scroll;
    overflow-x: hidden;

    height: 600px;
    width: 250px;
    padding: 20px 40px;
  }
  .rightContainer{
    margin-left: 20px;
    width: 50%;
  }
  .iframeFSLocal{
    height: 300px;
  }
  .buttonContainer{
    margin-bottom: 30px;
  }
  .line{
    background: #eee;
    height: 1px;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .tocLabel{
    font-size: 25px;
    margin-left: 5px;
    font-weight: 100;
  }
</style>
