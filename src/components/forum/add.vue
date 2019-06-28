<template>
  <div>
    <container></container>
    <div class="searchContainer">
      <div>
        <h1 class="title">发表帖子</h1>
        <p style="font-weight: 800;">标题</p>
        <el-input v-model="title"></el-input>
        <p style="font-weight: 800;">正文</p>
        <wysiwyg v-model="content"
                 style="border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;">
        </wysiwyg>
        <br>
        <el-tag
          class="click"
          @click="changeSelection(1)"
          :type="firstType"
          effect="dark">提问/求助</el-tag>
        <el-tag
          class="click"
          @click="changeSelection(2)"
          :type="secondType"
          effect="dark">分享</el-tag>
        <el-tag
          class="click"
          @click="changeSelection(3)"
          :type="thirdType"
          effect="dark">改进建议</el-tag>
        <br>

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
    data() {
      return {
        content: "",
        title: "",
        tag: "",
        selection: 0,
        firstType: 'info',
        secondType: 'info',
        thirdType: 'info'
      }
    },
    components: {
      container,
    },
    methods: {
      submit(){
        if (this.selection === 0){
          alert("选择一个标签")
          return
        }
        let fd = new FormData();
        fd.append('userToken', localStorage.getItem("token"));
        fd.append('content', this.content);
        fd.append('tag', this.selection);
        fd.append('title', this.title);
        axios.post(BASE_URL + 'addThread', fd).then((res) => {
          if(res["data"]["success"] === 1){
            this.$router.push({ name: 'FIndex', query: {}});
          }
        })
      },
      changeSelection(i){
        this.selection = i;
        this.firstType = i === 1 ? 'success' : 'info';
        this.secondType = i === 2 ? 'success' : 'info';
        this.thirdType = i === 3 ? 'success' : 'info'
      }
    },
    mixins: [coreContainer]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .click{
    cursor: pointer;
  }
</style>
