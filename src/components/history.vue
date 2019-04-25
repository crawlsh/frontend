<template>
  <div>
    <container></container>
    <div class="searchContainer">
      <h1 class="title">
          {{ $t('m.Job') }}
      </h1>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        v-loading="loading"
      >
        <el-table-column prop="content" label="内容" sortable></el-table-column>
        <el-table-column prop="time" label="时间" sortable>
          <template slot-scope="scope">
            <p>
              {{timestampToTime(scope.row.time)}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="进度">
          <template slot-scope="scope">
            <c>
              <el-progress :percentage="scope.row.progress[0]"  status="text"></el-progress>
              <p>{{scope.row.progress[1]}}</p>
            </c>
          </template>
        </el-table-column>
        <el-table-column label="查看任务">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="go(scope.row.jobToken)"
              type="text">
              查看任务
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>


<script>
  import container from './container.vue'
  import promo from './promo.vue'
  import coreContainer from './coreContainer.vue'
  import axios from 'axios'
  import BASE_URL from '../config'
  export default {
    name: 'HelloWorld',

    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        tableData: [],
        loading: true
      }
    },
    mounted(){
      axios.get(BASE_URL + `getAllJobs?token=${localStorage.getItem('token')}`).then(
        (res) => {
          this.tableData = res["data"]
          this.loading = false
        }).catch((err) => {
          console.log(err)
      });
    },
    methods: {
      timestampToTime: (timestamp)  =>{
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate();
        return Y+M+D;
      },
      go: (jobToken) => {
        console.log(jobToken)
      }

  },
    components: {
      container,
      promo
    },
    mixins: [coreContainer]
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
