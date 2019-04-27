<template class="searchContainer">
  <div>
    <navbar></navbar>
    <div class="bkgContainer"></div>
  </div>
</template>

<script>
  import navbar from './navbarTransparent.vue'
  export default {
        name: "container",
      components: {
        navbar
      }
    }
</script>

<style scoped>
  .bkgContainer{
    top: -220px;
    left: 0;
    right: 0;
    width: 100%;
    height: 680px;
    background:
      /*1*/ radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%,rgba(255,255,255,0) 100%),
      /*2*/ radial-gradient(ellipse at 70% 60%, rgba(195,224,96,1) 0%,rgba(195,224,96,0) 30%),
      /*3*/ radial-gradient(ellipse at bottom left, rgba(0,163,203,1) 0%, rgba(0,163,203,0) 70%),
      /*4*/ linear-gradient(135deg, rgba(18,46,119,0) 0%,rgba(18,46,119,0) 75%,rgba(18,46,119,1) 100%),
      /*5*/ linear-gradient(to right, rgba(98,87,147,1) 0%, rgba(213,93,100,1) 17%, rgba(228,145,41,1) 74%, rgba(192,103,28,1) 100%);
    background-blend-mode:
      /*1*/ screen,
      /*2*/ hue,
      /*3*/ color,
      /*4*/ overlay,
      /*5*/ normal;
    position: absolute;
    z-index: -1;
    transform: skewY(8deg);
  }
</style>
