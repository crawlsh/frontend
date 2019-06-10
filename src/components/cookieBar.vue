<template>

</template>

<script>
    export default {
        name: "cookieBar",
        mounted(){
          !localStorage.getItem("okCookie") ? this.$notify({
            title: this.$t("m.GDPRAndPrivacy"),
            dangerouslyUseHTMLString: true,
            message: this.$t("m.GDPRAndPrivacyDetail"),
            duration: 0,
            onClose: function () {

            }
          }) : "";
          localStorage.setItem("okCookie", true)
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

