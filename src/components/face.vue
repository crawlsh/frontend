<template>
  <div class="stage">
      <div class="lantern">
        <div class="lantern-inner">
          <div class="lantern-head"></div>
          <div class="lantern-body">
            <div class="lantern-spark"></div>
            <div class="lantern-spark"></div>
            <div class="lantern-spark"></div>
            <div class="lantern-flame"></div>
          </div>
          <div class="lantern-base"></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "face",
      data() {
        return {
          html: ""
        }
      },
      mounted() {
      },
      methods: {}
    }
</script>

<style scoped>

  .stage {
    justify-content: center;
    width: 100%;
    padding-top: 40px;
    padding-bottom: 40px;
    background-image: linear-gradient( 135deg, #FFA8A8 10%, #FCFF00 100%);
  }

  .lantern {
    --c-lantern-body: hsl(262,38%,20%);
    --c-lantern-light: hsl(23,98%,75%);
    --c-lantern-glow: hsl(343,83%,63%);

    z-index: 1;
  }
  .lantern-handle {
    border: 6px solid hsl(257,41%,27%);
    border-radius: 50px;
    height: 0px;
    width: 200px;
  }
  .lantern-inner {
    animation: lantern-anim 1.2s ease-in-out alternate infinite;
    margin-top: -5px;
    transform-origin: top center;
  }
  .lantern-chain {
    height: 60px;
  }
  .lantern-chain::before {
    --c: hsl(260,38%,34%);

    background-color: var(--c);
    box-shadow:
      0 0 0 5px var(--c),
      0 20px 0 var(--c),
      0 35px 0 var(--c),
      0 50px 0 var(--c);
    border-radius: 50%;
    content: '';
    display: block;
    height: 10px;
    margin: 0 auto;
    width: 10px;
  }

  .lantern-head::before,
  .lantern-head::after {
    background: var(--c-lantern-body);
    border-radius: 5px;
    content: '';
    display: block;
    height: 15px;
  }
  .lantern-head::before {
    margin: 0 auto;
    width: 100px;
  }
  .lantern-head::after {
    border-radius: 3px;
    height: 30px;
    margin: 3px auto;
    width: 60px;
  }

  .lantern-body {
    perspective: 350px;
    position: relative;
  }
  .lantern-body::before {
    background-color: var(--c-lantern-light);
    border: 8px solid var(--c-lantern-body);
    border-radius: 50px;
    box-shadow:
      inset 0 0 0 5px var(--c-lantern-light),
      inset 0 0 0 20px var(--c-lantern-glow);
    content: '';
    display: block;
    height: 195px;
    margin: 0 auto;
    perspective: 100px;
    transform: rotateX(20deg) translateY(-20px);
    transform-origin: center center;
    width: 120px;
  }
  .lantern-body::after {
    --c: hsl(321,41%,42%);
    background-color: var(--c);
    border-radius: 4px;
    box-shadow: -5px 161px 0 1px var(--c), 5px 161px 0 1px var(--c);
    content: '';
    display: block;
    height: 7px;
    margin: -7px auto 0;
    transform: translateY(-195px);
    width: 40px;
  }

  .lantern-spark {
    animation: lantern-spark-anim linear 2s forwards infinite;
    background:
      radial-gradient(circle at center, var(--c-lantern-light) 60%, transparent 60%),
      linear-gradient(to right, transparent 10%, #fff 50%, transparent 50%);
    border-radius: 50%;
    clip: rect(0px 30px 30px 0px);
    height: 60px;
    left: calc(50% - 30px);
    position: absolute;
    top: calc(45% - 30px);
    transform-origin: center center;
    width: 60px;
  }
  .lantern-spark:nth-child(2) {
    animation-delay: calc(2s / 3);
  }
  .lantern-spark:nth-child(3) {
    animation-delay: calc((2s / 3) * 2);
  }

  .lantern-flame {
    background-color: #fff;
    border-radius: 50%;
    height: 30px;
    left: calc(50% - 15px);
    position: absolute;
    top: calc(45% - 15px);
    width: 30px;
  }

  .lantern-base {
    background: var(--c-lantern-body);
    border-radius: 5px;
    display: block;
    height: 15px;
    margin: -15px auto 0;
    width: 70px;
  }

  @keyframes lantern-anim {
    0% {
      transform: rotateZ(1deg);
    }
    100% {
      transform: rotateZ(-1deg);
    }
  }
  @keyframes lantern-spark-anim {
    100% {
      transform: rotateZ(360deg);
    }
  }

</style>
