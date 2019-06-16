<template>
  <div>
    <container></container>
    <div class="forumCoreContainer">
      <div class="forumContainer main" style="margin-right: 20px; height: max-content;">
        <h1>论坛</h1>
        <span class="subTitle">热帖🔥</span>
        <el-card class="box-card threadContainer" :class="'forumContainerColor' + v.tag" v-for="(v, k) in hotPosts">
          <span class="threadTitle">{{v.title}}</span><br>
          <span class="threadIntro">由 {{v.author}} 发表于 {{v._time}}</span>
        </el-card>
        <br>
        <div class="line"></div>
        <br>
        <span class="subTitle">最新发布️</span>
        <el-card class="box-card threadContainer" :class="'forumContainerColor' + v.tag" v-for="(v, k) in currentPosts">
            <span class="threadTitle">{{v.title}}</span><br>
            <span class="threadIntro">由 {{v.author}} 发表于 {{v._time}}</span>
        </el-card>
      </div>
      <div class="forumContainer sidebar" style="margin-left: 20px; height: max-content;">
        <h1>我</h1>
        <p><i class="el-icon-view" style="color: green;"></i>&nbsp;所发被查看 {{userInfo.level}} 次</p>
        <div class="line"></div>
        <p><i class="el-icon-chat-dot-round" style="color: green;"></i>&nbsp;所发被评论 {{userInfo.level}} 次</p>
        <div class="line"></div>
        <p><i class="el-icon-position" style="color: green;"></i>&nbsp;共评论 {{userInfo.level}} 次</p>
        <div class="line"></div>
        <p><i class="el-icon-message" style="color: green;"></i>&nbsp;共发帖 {{userInfo.level}} 次</p>
        <button class="newButton">写点什么!</button>
      </div>
    </div>
  </div>
</template>

<script>
  import container from '../container.vue'
  import coreContainer from '../coreContainer.vue'
  import axios from 'axios'
  import BASE_URL from '../../config'
  import router from '../../router'

  export default {
    name: "forumIndex",
    mixins: [coreContainer],
    components: {container},
    data(){
      return {
        currentPosts: [],
        hotPosts: [],
        user: null,
        userToken: localStorage.getItem("token"),
        userInfo: ''
      }
    },
    methods: {
      goHome(){
        router.push('/')
      },
      getThreads(){
        axios.get(BASE_URL + 'getThreads').then(
          (res) => {
            console.log(res.data.message)
            if (res.data.success) {
              this.currentPosts = res.data.info.current;
              this.hotPosts = res.data.info.hot;
            }
          }).catch((err) => {
          console.log(err)
        });
      },
      getUserInfo(){
        axios.get(BASE_URL + `getUserDetailByToken?userToken=${this.userToken}`).then(
          (res) => {
            if (res.data.success) {
              this.userInfo = res.data.info;
            }
          }).catch((err) => {
            console.log(err)
        });
      },
    },
    mounted() {
      this.getThreads();
      this.getUserInfo();
    },
    destroyed() {
    },

  }
</script>

<style scoped>
  .forumCoreContainer{
    display: flex;
    justify-content:center;
    margin-bottom: 50px;
  }
  .forumContainer{
    text-align: left;
    background-color: #FFF;
    margin-top: 220px;
    padding: 30px 60px;
    border-radius: 20px;
    box-shadow: 0 3px 26px 0 rgba(0,0,0,0.20);
  }
  .forumContainerColor1{
    background-image: linear-gradient( 135deg, #F97794 10%, #623AA2 100%);
  }
  .forumContainerColor2{
    background-image: linear-gradient( 135deg, #97ABFF 10%, #123597 100%);
  }
  .forumContainerColor3{
    background-image: linear-gradient( 135deg, #F05F57 10%, #360940 100%);
  }
  .threadContainer{
    color: #fff;
    margin-top: 20px;
    border-radius: 15px;
  }
  .threadTitle{
    width: 100%;
    font-size: 20px;
    font-weight: 600;
  }
  .subTitle{
    margin-left: 4px;
    font-weight: 800;
  }
  .threadIntro{
    float: right;
    font-size: 12px;
    margin: 14px;
  }
  .main{
    width: 38%;
  }
  .sidebar{
    width: 200px;
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
  .newButton{
    width: 100%;
    height: 40px;
    font-size: 15px;
    background-image: linear-gradient( 135deg, #444 10%, #000 100%);    border-width: 0;
    color: #fff;
    border-radius: 30px;
    box-shadow: 0px 2px 8px 0 #999;
    cursor: pointer;
  }
  .newButton:focus{
    outline: none
  }
</style>
