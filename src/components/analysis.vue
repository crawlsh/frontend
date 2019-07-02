<template>
  <div>
  <el-button type="text" @click="showAddAnalysis = true">{{ $t('m.SetRule') }}</el-button>
  <el-dialog
    :visible.sync="showAddAnalysis"
    width="580px" style="padding-top: 0;">
    <h3>{{ $t('m.CurrentRule') }}</h3>
    <span v-for="tag in availableRules" class="ruleContainer">
      {{tag}}
      <el-button type="text" @click="delRules(tag)">{{ $t('m.Delete') }}</el-button>
    </span>
    <el-alert v-show="availableRules.length===0">NO_CONTENT</el-alert>
    <div class="line"></div>
    <h3>{{ $t('m.NewRule') }}</h3>
    <p class="inputLabel">{{ $t('m.Name') }}</p>
    <el-input v-model="name" placeholder="商务分类"></el-input>
    <p class="inputLabel">{{ $t('m.Rule') }}关键词</p>
    <el-alert>
      输入您希望满足此规则的内容所包含的关键词，用英语分号 (;) 隔开<br>
      例子：<br>
      如您爬取获得内容为"Crawl.sh 正在公测中"，您的规则关键词为"公测;投资"，那么该规则对该内容的分析结果为100%。<br>
      如您爬取获得内容为"Crawl.sh 正在寻求融资中"，您的规则关键词为"公测;投资"，那么该规则对该内容的分析结果依然为100%，因为投资与融资意思相近。
    </el-alert>
    <br>
    <el-input v-model="rules" type="textarea"></el-input>
    <div style="margin-top: 20px;">
      <el-radio v-model="way" label="0">{{ $t('m.Contain') }}</el-radio>
      <el-radio v-model="way" label="1">{{ $t('m.NContain') }}</el-radio>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="showAddAnalysis = false">关闭设置框</el-button>
        <el-button type="primary" @click="addRule">提交新规则</el-button>
      </span>
  </el-dialog>
  </div>

</template>

<script>
  import axios from 'axios'
  import BASE_URL from '../config'
    export default {
        name: "analysis",
        data(){
          return {
            showAddAnalysis: false,
            availableRules: [],
            showDelNotice: false,
            way: "0",
            name: "",
            rules: "",
          }
        },
      mounted(){
        this.getRules()
      },
      methods: {
        getRules(){
          let fd = new FormData();
          fd.append('token', localStorage.getItem("token"));
          axios.post(BASE_URL + 'getClassify', fd).then(
            (res) => {
              if (res["data"]["success"]){
                this.availableRules = res["data"]["info"]
                console.log(res["data"]["info"])
              }
            })
        },
        delRules(name){
          console.log(name)
          this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let fd = new FormData();
            fd.append('token', localStorage.getItem("token"));
            fd.append('name', name);
            axios.post(BASE_URL + 'deleteClassify', fd).then(
              (res) => {
                if (res["data"]["success"]){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });

                } else {
                  this.$message({
                    type: 'warning',
                    message: res["data"]["info"]
                  });
                }
                this.getRules()
              })

          })
        },
        addRule(){
          let name = this.name
          let rules = this.rules
          let way = this.way
          let fd = new FormData();
          fd.append('token', localStorage.getItem("token"));
          fd.append('classifyName', name);
          fd.append('classifyWay', way);
          fd.append('classifyContent', rules);
          axios.post(BASE_URL + 'addClassify', fd).then(
            (res) => {
              if (res["data"]["success"]){
                this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                this.name = ""
                this.rules = ""
              } else {
                this.$message({
                  type: 'warning',
                  message: res["data"]["info"]
                });
              }
              this.getRules()
            })
        }
      }
    }
</script>

<style scoped>
  .ruleContainer{
    border-style: solid;
    border-width: 1px;
    border-color: #ccc;
    border-radius: 4px;
    padding: 7px;
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .line{
    background: #eee;
    height: 1px;
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .inputLabel{
    text-align: left;
  }
</style>
