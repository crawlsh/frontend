<template>

</template>

<script>
    export default {
        name: "browserStyles"
    }
</script>

<style>
  .browserContent {
    height: 40px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: #555;
    width: 100%;
    border-width: 0px;
  }
  .ballGreen {
    background-color: #00b894;
    border-color: #00b894;
  }
  .ballYellow {
    background-color: #fdcb6e;
    border-color: #fdcb6e;
  }
  .ballRed {
    background-color: #d63031;
    border-color: #d63031;
  }
  .ball {
    height: 8px;
    width: 8px;
    float: left;
    margin-top: 14px;
    margin-left: 9px;
    border-style: solid;
    border-radius: 7px;
  }
  .linkContent {
    height: 25px;
    border-style: solid;
    border-width: 0.5px;
    border-color: #555;
    border-top-width: 0px;
    padding: 1px;
    padding-left: 5px;
  }
  .link{
    margin: 0;
  }
  .iframeFS {
    height: 600px;
    width: 99.9%; /* magic */
    border-style: solid;
    border-width: 0.5px;
    border-top-width: 0px;
    border-radius: 0 0 5px 5px;
    border-color: #555;
    margin-top: 0;
  }
</style>
