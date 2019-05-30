<template>
  <el-tag type="info" size="small"
          style="background: #1e3799; color: #fff; margin-left: 2px;cursor: pointer;"
          @click="goPricing"
  >Pro</el-tag>
</template>

<script>
  import router from '../router'
  export default {
        name: "proBadge.vue",
      methods: {
          goPricing() {
            router.push('pricing')
          }
      }
    }
</script>

<style scoped>

</style>
