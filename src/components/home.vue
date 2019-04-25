<template>
  <div>
    <container></container>
    <div class="searchContainer">
      <h1 class="title">
        <img src="/static/spider.svg" height="30px" width="30px" class="logo" />
        <t>
          {{ $t('m.App') }}
        </t>
      </h1>
      <h3 style="margin-top: -25px">{{ $t('m.Description') }}</h3>
      <p>{{ $t('m.ModeSelection') }}</p>
      <div class="customSelect">
        <el-select v-model="value" filterable placeholder="请选择" class="selectContainer">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="startJourneyContainer">
          <el-button class="btn btn-outline-dark startJourneyButton" type="button" onclick="step1Done()">
            {{ $t('m.StartJourney') }}
          </el-button>
        </div>
      </div>
    </div>
    <promo></promo>
  </div>
</template>

<script>
import container from './container.vue'
import promo from './promo.vue'
import coreContainer from './coreContainer.vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value: '',
      options: [{
        value: '按照链接爬取',
        label: '按照链接爬取'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
    }
  },
  mounted(){

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



  .selectContainer{
    width: 80% !important;
    background: #fff !important;
    border-bottom-left-radius: 0.25rem !important;
    border-top-left-radius: 0.25rem !important;
  }
  .startJourneyButton{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    margin-left: -1px;
  }
  .customSelect{
    display: flex;
    flex-direction: row;
  }
  .startJourneyContainer{
    width: 20%;
  }


</style>
