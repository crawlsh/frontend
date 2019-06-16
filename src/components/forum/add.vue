<template>
  <div>
    <container></container>
    <div class="searchContainer">
      <div>
        <h1 class="title">发表帖子</h1>
        <wysiwyg v-model="myHTML" />
        <el-button @click="test">1</el-button>
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
        myHTML: ""
      }
    },
    components: {
      container,
    },
    methods: {
      test(){
        console.log(this.myHTML)
      }
    },
    mixins: [coreContainer]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
