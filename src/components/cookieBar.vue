<template>

</template>

<script>
    export default {
        name: "cookieBar",
        mounted(){
          !localStorage.getItem("okCookie") ? this.$notify({
            title: '关于隐私与GDPR',
            dangerouslyUseHTMLString: true,
            message: 'Crawl.sh采用localStorage储存功能（类似Cookie）以给予您最佳浏览与使用体验。' +
              '继续访问网站内容代表您已同意并知晓我们使用您浏览器的localStorage功能。' +
              '<br><br><a style="text-decoration: none;" href="https://docs.crawl.sh/">查看更多（英语）</a>',
            duration: 0,
            onClose: function () {
              localStorage.setItem("okCookie", true)
            }
          }) : "";
        }
    }
</script>

<style scoped>
.cookieBarContainer{
  position: fixed;
  width: 100%;
  height: 100px;
  bottom: 0;
  background: #1B1464;
  opacity: 0.9;
}
</style>

