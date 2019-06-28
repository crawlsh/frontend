<template>
  <div>
    <container></container>
    <div class="searchContainer">
      <div>
        <h1 class="title">{{articleData.threadInfo.title}}</h1>
        <div style="border-width: 1px; border-style: solid; text-align: center;
                    padding: 5px;border-color: #ccc;border-radius: 20px;">
          <img src="/static/edit-3.svg" height="18px" style="margin-bottom: -5px;"/>
          <span style="margin-bottom: 20px;">{{articleData.threadInfo.author}}  &nbsp;</span>
          <img src="/static/clock.svg" height="18px" style="margin-bottom: -5px;"/>
          <span style="margin-bottom: 20px;">{{articleData.threadInfo._time}}</span>
        </div>



        <p>{{articleData.threadInfo.content}}</p>
        <div class="line"></div>
        <p style="font-weight: 800;">评论</p>
        <div style="height: max-content;">
          <div v-show="articleData.threadInfo.comment_count === 0"
            style="text-align: center;padding: 30px;color: #aaa;">
            /* 还没有评论 */
          </div>
        </div>
        <div v-for="v,k in this.articleData.commentInfo" style="border-style: solid;
                border-width: 1px;margin-bottom: 20px;border-radius: 10px;
                padding: 10px;border-color: #ccc;">
          <span>{{v.content}}</span>
          <br>
          <img src="/static/edit-3.svg" height="18px" style="margin-bottom: -5px;"/>
          <span>{{v.author}}  &nbsp;</span>
          <img src="/static/clock.svg" height="18px" style="margin-bottom: -5px;"/>
          <span>{{v._time}}</span>
        </div>
        <wysiwyg v-model="content"
                 style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
        </wysiwyg>
        <el-button @click="submit" style="margin-top: 20px;">发布</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import container from '../container.vue'
  import coreContainer from '../coreContainer.vue'
  import axios from 'axios'
  import store from '../../store'
  import BASE_URL from '../../config'
  import "vue-wysiwyg/dist/vueWysiwyg.css";

  export default {
    name: 'index',
    mounted(){
      axios.get(BASE_URL + 'getThreadDetails?thread_id='
        +this.$route.query.thread_id).then((res) => {
        if(res["data"]["success"] === 1){
          this.articleData = res["data"]["info"]
        }
      })
    },
    data() {
      return {
        content: "",
        articleData: {threadInfo: null, commentInfo: null}
      }
    },
    components: {
      container,
    },
    methods: {
      submit(){
        let fd = new FormData();
        fd.append('userToken', localStorage.getItem("token"));
        fd.append('content', this.content);
        fd.append('thread_id', this.$route.query.thread_id);
        axios.post(BASE_URL + 'addComment', fd).then((res) => {
          alert("ok")
        })

      },
    },
    mixins: [coreContainer]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .click{
    cursor: pointer;
  }
  .line{
    background: #ddd;
    height: 1px;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
