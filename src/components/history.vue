<template>
  <div>
    <container></container>
    <div class="searchContainer">
      <h1 class="title">
          {{ $t('m.Job') }}
      </h1>
      <el-alert
        title="注意"
        type="info"
        >
        非<proBadge></proBadge> 用户仅能爬取50个链接，剩余暂停爬取
      </el-alert>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort = "{prop: 'date', order: 'descending'}"
        v-loading="loading"
      >
        <el-table-column prop="content" :label="$t('m.Content')" sortable></el-table-column>
        <el-table-column prop="time" :label="$t('m.Time')" sortable>
          <template slot-scope="scope">
            <p>
              {{timestampToTime(scope.row.time)}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="time" :label="$t('m.Progress')">
          <template slot-scope="scope">
            <c>
              <el-progress :percentage="scope.row.progress[0]"  status="text"></el-progress>
              <p>{{scope.row.progress[1]}}</p>
            </c>
          </template>
        </el-table-column>
        <el-table-column :label="$t('m.ViewJob')">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="goDetail(scope.row.jobToken)"
              type="text">
              {{ $t('m.ViewJob') }}
            </el-button>
            <el-button
              @click.native.prevent="del(scope.row.jobToken)"
              type="text" icon="el-icon-delete">
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
  import proBadge from './proBadge.vue'
  export default {
    data () {
      return {
        tableData: [],
        loading: true,
        timer: null
      }
    },
    mounted(){
      this.getTableData()
      this.timer = setInterval(()=> {
        if(!this.loading){
          this.getTableData();
        }
      }, 2000)
    },
    methods: {
      timestampToTime: (timestamp)  =>{
        let date = new Date(timestamp * 1000);
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate();
        return Y+M+D;
      },
      goDetail(jobToken) {
        this.$router.push({ name: 'HistoryDetail', query: { jobToken: jobToken }});
      },
      getTableData(){
        this.loading = true
        axios.get(BASE_URL + `getAllJobs?token=${localStorage.getItem('token')}`).then(
          (res) => {
            this.tableData = res["data"]
            this.loading = false
          }).catch((err) => {
          console.log(err)
        });
      },
      del(id){
        this.loading = true;
        axios.get(BASE_URL + `deleteJob?jobToken=${id}`).then(
          () => {
            this.getTableData()
          }).catch((err) => {
          console.log(err)
        });
      }

  },
    destroyed() {
      clearInterval(this.timer);
    },
    components: {
      container,
      promo,
      proBadge
    },
    mixins: [coreContainer]
  }
</script>

<style scoped>


</style>
