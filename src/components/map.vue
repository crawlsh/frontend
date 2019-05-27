<template>
  <div class="section-image">
    <div class="image image-intstant-deployment">
      <div class="location-map location-map-sm location-map-grey">
        <div class="location-container">
          <div class="location location-chicago animate zoomIn" style="visibility: visible; animation-name: zoomIn;">
                                    <span class="location-name">
                                        <span>{{ $t('m.Chicago') }}</span>
                                    </span>
            <span class="location-pin"></span>
          </div>
          
          <div class="location location-silicon-valley animate zoomIn" style="visibility: visible; animation-name: zoomIn;">
                                    <span class="location-name">
                                        <span>{{ $t('m.SC') }}</span>
                                    </span>
            <span class="location-pin"></span>
          </div>

          <div class="location location-singapore animate zoomIn" style="visibility: visible; animation-name: zoomIn;">
                                    <span class="location-name">
                                        <span>{{ $t('m.Singapore') }}</span>
                                    </span>
            <span class="location-pin"></span>
          </div>

          <div class="location location-dallas animate zoomIn" style="visibility: visible; animation-name: zoomIn;">
                                    <span class="location-name">
                                        <span>{{ $t('m.Dallas') }}</span>
                                    </span>
            <span class="location-pin"></span>
          </div>
          <div class="location location-london animate zoomIn" style="visibility: visible; animation-name: zoomIn;">
                                    <span class="location-name">
                                        <span>{{ $t('m.London') }}</span>
                                    </span>
            <span class="location-pin"></span>
          </div>
          <div class="location location-paris animate zoomIn" style="visibility: visible; animation-name: zoomIn;">
                                    <span class="location-name">
                                        <span>{{ $t('m.Paris') }}</span>
                                    </span>
            <span class="location-pin"></span>
          </div>
          <div class="location location-tokyo animate zoomIn" style="visibility: visible; animation-name: zoomIn;">
                                    <span class="location-name">
                                        <span>{{ $t('m.Tokyo') }}</span>
                                    </span>
            <span class="location-pin"></span>
          </div>
          <div class="location location-sydney animate zoomIn" style="visibility: visible; animation-name: zoomIn;">
                                    <span class="location-name">
                                        <span>{{ $t('m.Sydney') }}</span>
                                    </span>
            <span class="location-pin"></span>
          </div>
          <div class="location location-seattle animate zoomIn" style="visibility: visible; animation-name: zoomIn;">
                                    <span class="location-name">
                                        <span>{{ $t('m.Seatle') }}</span>
                                    </span>
            <span class="location-pin"></span>
          </div>

          <div class="map map-grey"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "maps",

    }
</script>

<style scoped>

  .section-image .image {
    position: relative;
    margin-left: auto;
    margin-right: auto;
  }
  .section-image {
    max-width: 440px;
    margin: 35px auto;
  }
  .section-image .image:after,
  .section-image .image:before {
    display: table;
    content: "";
    clear: both;
  }
  .image span {
    display: block;
  }
  .section-image .image span {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  @media (min-width: 768px) {
    .section-center .section-desc,
    .section-center .section-title {
      text-align: center;
    }
  }
  @media (max-width: 767px) {
    .section-image {
      padding-top: 30px;
    }
  }
  .location {
    position: absolute;
    z-index: 998;
    height: 12px;
    width: 12px;
  }
  .location-name {
    position: absolute;
    z-index: 999;
    display: block;
    height: 28px;
  }
  .location-name span {
    display: block;
    height: 28px;
    padding: 0 10px;
    background-color: #1e88e4;
    color: #fff;
    font-size: 14px;
    line-height: 28px;
    white-space: nowrap;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    -webkit-box-shadow: 0 5px 20px -5px rgba(11,27,38, 0.2);
    box-shadow: 0 5px 20px -5px rgba(11,27,38, 0.2);
  }
  .location-name:after {
    position: absolute;
    z-index: -1;
    display: block;
    content: "";
    height: 1px;
    width: 20px;
    background-color: #545a5e;
  }
  .location-map-grey .location-name:after {
    background-color: #c4cacc;
  }
  .location-seattle {
    top: 180px;
    left: 150px;
  }
  .location-seattle .location-name {
    bottom: 44px;
    right: 44px;
  }
  .location-seattle .location-name:after {
    bottom: -20px;
    right: -49px;
    width: 58px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .location-map-sm .location-seattle {
    top: 84px;
    left: 66px;
  }
  .location-silicon-valley {
    top: 215px;
    left: 148px;
  }
  .location-silicon-valley .location-name {
    top: 35px;
    right: 37px;
  }
  .location-silicon-valley .location-name:after {
    top: -10px;
    right: -35px;
    width: 50px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .location-los-angeles {
    top: 232px;
    left: 164px;
  }
  .location-los-angeles .location-name {
    top: 78px;
    right: -45px;
  }
  .location-los-angeles .location-name:after {
    left: 50%;
    top: -70px;
    height: 70px;
    width: 1px;
  }

  .location-dallas {
    top: 238px;
    left: 232px;
  }
  .location-dallas .location-name {
    bottom: 72px;
    right: -24px;
  }
  .location-dallas .location-name:after {
    left: 50%;
    bottom: -60px;
    height: 60px;
    width: 1px;
  }

  .location-miami {
    top: 265px;
    left: 288px;
  }
  .location-miami .location-name {
    top: 29px;
    left: 30px;
  }
  .location-miami .location-name:after {
    top: -10px;
    left: -30px;
    width: 40px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .location-atlanta {
    top: 234px;
    left: 276px;
  }
  .location-atlanta .location-name {
    top: -9px;
    left: 110px;
  }
  .location-atlanta .location-name:after {
    top: 50%;
    left: -100px;
    width: 100px;
  }
  .location-new-jersey {
    top: 210px;
    left: 300px;
  }
  .location-new-jersey .location-name {
    bottom: 28px;
    left: 28px;
  }
  .location-new-jersey .location-name:after {
    bottom: -10px;
    left: -24px;
    width: 30px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .location-chicago {
    top: 200px;
    left: 267px;
  }
  .location-chicago .location-name {
    bottom: 70px;
    left: 70px;
  }
  .location-chicago .location-name:after {
    bottom: -31px;
    left: -75px;
    width: 90px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .location-london {
    top: 134px;
    left: 525px;
  }
  .location-london .location-name {
    bottom: 24px;
    right: 24px;
  }
  .location-london .location-name:after {
    bottom: -10px;
    right: -24px;
    width: 30px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .location-amsterdam {
    top: 131px;
    left: 545px;
  }
  .location-amsterdam .location-name {
    bottom: 73px;
    left: 73px;
  }
  .location-amsterdam .location-name:after {
    bottom: -32px;
    left: -78px;
    width: 95px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .location-paris {
    top: 154px;
    left: 538px;
  }
  .location-paris .location-name {
    top: 50px;
    left: 50px;
  }
  .location-paris .location-name:after {
    top: -20px;
    left: -52px;
    width: 65px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .location-frankfurt {
    top: 142px;
    left: 562px;
  }
  .location-frankfurt .location-name {
    top: -9px;
    left: 60px;
  }
  .location-frankfurt .location-name:after {
    top: 50%;
    left: -60px;
    width: 60px;
  }

  .location-tokyo {
    top: 201px;
    right: 162px;
  }
  .location-tokyo .location-name {
    bottom: 50px;
    left: 50px;
  }
  .location-tokyo .location-name:after {
    bottom: -22px;
    left: -58px;
    width: 75px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .location-singapore {
    top: 318px;
    right: 285px;
  }
  .location-singapore .location-name {
    bottom: 35px;
    left: 35px;
  }
  .location-singapore .location-name:after {
    bottom: -12px;
    left: -34px;
    width: 45px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }


  .location-toronto,
  .location-toronto-soon {
    top: 171px;
    left: 284px;
  }

  .location-toronto .location-name,
  .location-toronto-soon .location-name {
    bottom: 95px;
    left: -75px;
  }

  .location-toronto .location-name span {}
  .location-toronto-soon .location-name span {
    background-color: orange !important;
  }

  @media (min-width: 768px) {
    .location-toronto .location-name span:after {}
    .location-toronto-soon .location-name span:after {
      content: " - Coming Soon!";
    }
  }

  .location-toronto .location-name:after,
  .location-toronto-soon .location-name:after {
    bottom: -44px;
    left: 17px;
    width: 96px;
    -webkit-transform: rotate(-110deg);
    transform: rotate(-110deg);
  }


  .location-toronto .location-pin, .location-toronto .location-pin:after {}
  .location-toronto-soon .location-pin, .location-toronto-soon .location-pin:after {
    background-color: orange !important;
  }

  .location-sydney {
    bottom: 102px;
    right: 83px;
  }
  .location-sydney .location-name {
    bottom: 50px;
    left: 50px;
  }
  .location-sydney .location-name:after {
    bottom: -22px;
    left: -58px;
    width: 75px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .location-london .location-name,
  .location-seattle .location-name {
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
  }
  .location-silicon-valley .location-name {
    -webkit-transform-origin: top right;
    transform-origin: top right;
  }
  .location-los-angeles .location-name {
    -webkit-transform-origin: top center;
    transform-origin: top center;
  }
  .location-dallas .location-name {
    -webkit-transform-origin: bottom center;
    transform-origin: bottom center;
  }
  .location-atlanta .location-name,
  .location-frankfurt .location-name {
    -webkit-transform-origin: left center;
    transform-origin: left center;
  }
  .location-miami .location-name,
  .location-paris .location-name {
    -webkit-transform-origin: top left;
    transform-origin: top left;
  }
  @media (max-width: 1199px) {
    .location-seattle .location-name {
      bottom: 54px;
      right: -26px;
    }
    .location-tokyo .location-name {
      left: auto;
      right: 50px;
    }
    .location-sydney .location-name {
      left: auto;
      right: 50px;
    }
    .location-tokyo .location-name:after,
    .location-sydney .location-name:after {
      left: auto;
      right: -58px;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    .location-seattle .location-name:after {
      right: 3px;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
  @media (min-width: 568px) and (max-width: 767px) {
    .location-map-lg .location-name {
      height: 36px;
      font-size: 20px;
      line-height: 36px;
    }
  }
  @media (max-width: 567px) {
    .location-map-lg .location {
      position: inherit;
      top: auto;
      bottom: auto;
      left: auto;
      right: auto;
      float: left;
      height: auto;
      width: 50%;
      margin-bottom: 8px;
      padding-left: 30px;
    }
    .location-map-lg .location:after,
    .location-map-lg .location:before {
      display: block;
      content: "";
      clear: both;
    }
    .location-map-lg .location-pin {
      position: absolute;
      left: 0;
      top: 4px;
      margin: 5px 10px 5px;
    }
    .location-map-lg .location .location-name {
      position: inherit;
      left: auto;
      right: auto;
      top: auto;
      bottom: auto;
      display: inline-block;
      background: transparent;
      color: #616366;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      -ms-box-shadow: none;
      -o-box-shadow: none;
      box-shadow: none;
    }
    .location-map-lg .location .location-name > span {
      position: inherit;
      left: auto;
      right: auto;
      top: auto;
      bottom: auto;
      display: inline-block;
      background: transparent;
      color: #616366;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      -ms-box-shadow: none;
      -o-box-shadow: none;
      box-shadow: none;
    }
    .location-map-lg .location-name:after {
      display: none;
    }
    .section-dark .location-map-lg .location .location-name span {
      color: #fff;
    }
  }

  .section-dark a.section_link {
    color: rgba(255, 255, 255, 0.6);
  }
  .location-map .map {
    background: url("/static/map.svg") no-repeat center center;
    background-size: cover;
    opacity: 0.2;
  }
  .location-container {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  /* 3.8.1 Map: Large */

  .location-map-sm {
    height: 260px;
  }
  .location-map-sm .location-container {
    height: 260px;
    width: 524px;
    margin: -130px 0 0 -262px;
  }
  .location-map-sm .map {
    height: 260px;
    width: 524px;
  }
  .location-map-sm .location-name {
    opacity: 0;
    visibility: hidden;
    -webkit-transition: all ease .15s;
    transition: all ease .15s;
    -webkit-transform: scale(0.65);
    transform: scale(0.65);
    -webkit-transform-origin: bottom left;
    transform-origin: bottom left;
  }
  .location-map-sm .location:hover {
    z-index: 1000;
  }
  .location-map-sm .location:hover .location-name {
    opacity: 1;
    visibility: visible;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  @media (max-width: 991px) {
    .location-map-sm {
      height: 170px;
    }
    .location-map-sm .location-container {
      -webkit-transform: scale(0.65);
      transform: scale(0.65);
    }
  }

  /* 3.8.2 Map: Large */

  .location-map-lg .map {
    height: 580px;
    width: 1174px;
  }
  @media (min-width: 568px) {
    .location-map-lg {
      height: 520px;
    }
    .location-map-lg .location-container {
      height: 580px;
      width: 1174px;
      margin: -290px 0 0 -582px;
    }
    .location-map .actions {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
    }
  }
  @media (min-width: 568px) and (max-width: 1199px) {
    .location-map-lg {
      height: 450px;
    }
    .location-map-lg .location-container {
      -webkit-transform: scale(0.9);
      -moz-transform: scale(0.9);
      -ms-transform: scale(0.9);
      -o-transform: scale(0.9);
      transform: scale(0.9);
    }
  }
  @media (min-width: 568px) and (max-width: 991px) {
    .location-map-lg {
      height: 424px;
    }
    .location-map-lg .location-container {
      -webkit-transform: scale(0.68);
      -moz-transform: scale(0.68);
      -ms-transform: scale(0.68);
      -o-transform: scale(0.68);
      transform: scale(0.68);
    }
  }
  @media (min-width: 568px) and (max-width: 767px) {
    .location-map-lg {
      height: 290px;
    }
    .location-map-lg .location-container {
      -webkit-transform: scale(0.5);
      -moz-transform: scale(0.5);
      -ms-transform: scale(0.5);
      -o-transform: scale(0.5);
      transform: scale(0.5);
    }
  }
  @media (max-width: 567px) {
    .location-map-lg .map {
      display: none;
    }
    .location-map-lg .location-container {
      position: inherit;
      top: auto;
      left: auto;
      max-width: 380px;
      margin: 0 auto;
      padding: 25px 0;
    }
    .location-container:after,
    .location-container:before {
      display: block;
      content: "";
      clear: both;
    }
    .location-map-lg .location-map {
      padding: 0 30px;
    }
  }

  /* 3.8.3 Map: Pin */

  .location-pin,
  .location-pin:after {
    background-color: #1e88e4;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
  }
  .location-pin {
    position: relative;
    z-index: 999;
    display: block;
    height: 12px;
    width: 12px;
  }
  .location-pin-lg {
    position: relative;
    display: block;
    height: 20px;
    width: 20px;
  }
  .location-pin:after {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    content: "";
    height: 22px;
    width: 22px;
    margin: -11px 0 0 -11px;
    -webkit-animation: pulsate 2s linear;
    animation: pulsate 2s linear;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  .location-pin-lg:after {
    height: 40px;
    width: 40px;
    margin: -20px 0 0 -20px;
  }
  .location-map-sm .location {
    height: 8px;
    width: 8px;
    cursor: pointer;
  }
  .location-map-sm .location-pin {
    height: 8px;
    width: 8px;
  }
  .location-map-sm .location-pin:after {
    height: 16px;
    width: 16px;
    margin: -8px 0 0 -8px;
  }
  @-webkit-keyframes pulsate{
    0% {
      -webkit-transform: scale(0);
      opacity: .05;
    }
    20% {
      -webkit-transform: scale(0.7);
      opacity: .1;
    }
    40% {
      -webkit-transform: scale(0.9);
      opacity: .2;
    }
    60% {
      -webkit-transform: scale(1.1);
      opacity: .3;
    }
    100% {
      -webkit-transform: scale(1.4);
      opacity: 0;
    }
  }
  @keyframes pulsate{
    0% {
      transform: scale(0);
      opacity: .05;
    }
    20% {
      transform: scale(0.7);
      opacity: .1;
    }
    40% {
      transform: scale(0.9);
      opacity: .2;
    }
    60% {
      transform: scale(1.1);
      opacity: .3;
    }
    100% {
      transform: scale(1.4);
      opacity: 0;
    }
  }

  /* 3.8.3 Map: Locations */

  .location {
    position: absolute;
    z-index: 998;
    height: 12px;
    width: 12px;
  }
  .location-name {
    position: absolute;
    z-index: 999;
    display: block;
    height: 28px;
  }
  .location-name span {
    display: block;
    height: 28px;
    padding: 0 10px;
    background-color: #1e88e4;
    color: #fff;
    font-size: 14px;
    line-height: 28px;
    white-space: nowrap;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    -webkit-box-shadow: 0 5px 20px -5px rgba(11,27,38, 0.2);
    box-shadow: 0 5px 20px -5px rgba(11,27,38, 0.2);
  }
  .location-name:after {
    position: absolute;
    z-index: -1;
    display: block;
    content: "";
    height: 1px;
    width: 20px;
    background-color: #545a5e;
  }
  .location-map-grey .location-name:after {
    background-color: #c4cacc;
  }
  .location-seattle {
    top: 180px;
    left: 150px;
  }
  .location-seattle .location-name {
    bottom: 44px;
    right: 44px;
  }
  .location-seattle .location-name:after {
    bottom: -20px;
    right: -49px;
    width: 58px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .location-map-sm .location-seattle {
    top: 84px;
    left: 66px;
  }
  .location-silicon-valley {
    top: 215px;
    left: 148px;
  }
  .location-silicon-valley .location-name {
    top: 35px;
    right: 37px;
  }
  .location-silicon-valley .location-name:after {
    top: -10px;
    right: -35px;
    width: 50px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .location-map-sm .location-silicon-valley {
    top: 100px;
    left: 64px;
  }
  .location-los-angeles {
    top: 232px;
    left: 164px;
  }
  .location-los-angeles .location-name {
    top: 78px;
    right: -45px;
  }
  .location-los-angeles .location-name:after {
    left: 50%;
    top: -70px;
    height: 70px;
    width: 1px;
  }
  .location-map-sm .location-los-angeles {
    top: 108px;
    left: 72px;
  }
  .location-dallas {
    top: 238px;
    left: 232px;
  }
  .location-dallas .location-name {
    bottom: 72px;
    right: -24px;
  }
  .location-dallas .location-name:after {
    left: 50%;
    bottom: -60px;
    height: 60px;
    width: 1px;
  }
  .location-map-sm .location-dallas {
    top: 106px;
    left: 98px;
  }
  .location-miami {
    top: 265px;
    left: 288px;
  }
  .location-miami .location-name {
    top: 29px;
    left: 30px;
  }
  .location-miami .location-name:after {
    top: -10px;
    left: -30px;
    width: 40px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .location-map-sm .location-miami {
    top: 120px;
    left: 126px;
  }
  .location-atlanta {
    top: 234px;
    left: 276px;
  }
  .location-atlanta .location-name {
    top: -9px;
    left: 110px;
  }
  .location-atlanta .location-name:after {
    top: 50%;
    left: -100px;
    width: 100px;
  }
  .location-map-sm .location-atlanta {
    top: 108px;
    left: 126px;
  }
  .location-new-jersey {
    top: 210px;
    left: 300px;
  }
  .location-new-jersey .location-name {
    bottom: 28px;
    left: 28px;
  }
  .location-new-jersey .location-name:after {
    bottom: -10px;
    left: -24px;
    width: 30px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .location-map-sm .location-new-jersey {
    top: 98px;
    left: 132px;
  }
  .location-chicago {
    top: 200px;
    left: 267px;
  }
  .location-chicago .location-name {
    bottom: 70px;
    left: 70px;
  }
  .location-chicago .location-name:after {
    bottom: -31px;
    left: -75px;
    width: 90px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .location-map-sm .location-chicago {
    top: 90px;
    left: 116px;
  }
  .location-london {
    top: 134px;
    left: 525px;
  }
  .location-london .location-name {
    bottom: 24px;
    right: 24px;
  }
  .location-london .location-name:after {
    bottom: -10px;
    right: -24px;
    width: 30px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .location-map-sm .location-london {
    top: 62px;
    left: 232px;
  }
  .location-amsterdam {
    top: 131px;
    left: 545px;
  }
  .location-amsterdam .location-name {
    bottom: 73px;
    left: 73px;
  }
  .location-amsterdam .location-name:after {
    bottom: -32px;
    left: -78px;
    width: 95px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .location-map-sm .location-amsterdam {
    top: 60px;
    left: 242px;
  }
  .location-paris {
    top: 154px;
    left: 538px;
  }
  .location-paris .location-name {
    top: 50px;
    left: 50px;
  }
  .location-paris .location-name:after {
    top: -20px;
    left: -52px;
    width: 65px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .location-map-sm .location-paris {
    top: 70px;
    left: 240px;
  }
  .location-frankfurt {
    top: 142px;
    left: 562px;
  }
  .location-frankfurt .location-name {
    top: -9px;
    left: 60px;
  }
  .location-frankfurt .location-name:after {
    top: 50%;
    left: -60px;
    width: 60px;
  }
  .location-map-sm .location-frankfurt {
    top: 66px;
    left: 250px;
  }
  .location-tokyo {
    top: 201px;
    right: 162px;
  }
  .location-tokyo .location-name {
    bottom: 50px;
    left: 50px;
  }
  .location-tokyo .location-name:after {
    bottom: -22px;
    left: -58px;
    width: 75px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .location-map-sm .location-tokyo {
    top: 90px;
    right: 72px;
  }
  .location-singapore {
    top: 318px;
    right: 285px;
  }
  .location-singapore .location-name {
    bottom: 35px;
    left: 35px;
  }
  .location-singapore .location-name:after {
    bottom: -12px;
    left: -34px;
    width: 45px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .location-map-sm .location-singapore {
    top: 142px;
    right: 126px;
  }
  .location-map-sm .location-singapore .location-name {
    bottom: 24px;
    left: 24px;
  }
  .location-map-sm .location-singapore .location-name:after {
    bottom: -10px;
    left: -24px;
    width: 30px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }

  .location-toronto,
  .location-toronto-soon {
    top: 171px;
    left: 284px;
  }

  .location-toronto .location-name,
  .location-toronto-soon .location-name {
    bottom: 95px;
    left: -75px;
  }

  .location-toronto .location-name span {}
  .location-toronto-soon .location-name span {
    background-color: orange !important;
  }

  @media (min-width: 768px) {
    .location-toronto .location-name span:after {}
    .location-toronto-soon .location-name span:after {
      content: " - Coming Soon!";
    }
  }

  .location-toronto .location-name:after,
  .location-toronto-soon .location-name:after {
    bottom: -44px;
    left: 17px;
    width: 96px;
    -webkit-transform: rotate(-110deg);
    transform: rotate(-110deg);
  }


  .location-toronto .location-pin, .location-toronto .location-pin:after {}
  .location-toronto-soon .location-pin, .location-toronto-soon .location-pin:after {
    background-color: orange !important;
  }

  .location-sydney {
    bottom: 102px;
    right: 83px;
  }
  .location-sydney .location-name {
    bottom: 50px;
    left: 50px;
  }
  .location-sydney .location-name:after {
    bottom: -22px;
    left: -58px;
    width: 75px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  .location-map-sm .location-sydney {
    bottom: 44px;
    right: 36px;
  }
  .location-london .location-name,
  .location-seattle .location-name {
    -webkit-transform-origin: bottom right;
    transform-origin: bottom right;
  }
  .location-silicon-valley .location-name {
    -webkit-transform-origin: top right;
    transform-origin: top right;
  }
  .location-los-angeles .location-name {
    -webkit-transform-origin: top center;
    transform-origin: top center;
  }
  .location-dallas .location-name {
    -webkit-transform-origin: bottom center;
    transform-origin: bottom center;
  }
  .location-atlanta .location-name,
  .location-frankfurt .location-name {
    -webkit-transform-origin: left center;
    transform-origin: left center;
  }
  .location-miami .location-name,
  .location-paris .location-name {
    -webkit-transform-origin: top left;
    transform-origin: top left;
  }
  @media (max-width: 1199px) {
    .location-seattle .location-name {
      bottom: 54px;
      right: -26px;
    }
    .location-tokyo .location-name {
      left: auto;
      right: 50px;
    }
    .location-sydney .location-name {
      left: auto;
      right: 50px;
    }
    .location-tokyo .location-name:after,
    .location-sydney .location-name:after {
      left: auto;
      right: -58px;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    .location-seattle .location-name:after {
      right: 3px;
      -webkit-transform: rotate(90deg);
      transform: rotate(90deg);
    }
  }
  @media (min-width: 568px) and (max-width: 767px) {
    .location-map-lg .location-name {
      height: 36px;
      font-size: 20px;
      line-height: 36px;
    }
  }
  @media (max-width: 567px) {
    .location-map-lg .location {
      position: inherit;
      top: auto;
      bottom: auto;
      left: auto;
      right: auto;
      float: left;
      height: auto;
      width: 50%;
      margin-bottom: 8px;
      padding-left: 30px;
    }
    .location-map-lg .location:after,
    .location-map-lg .location:before {
      display: block;
      content: "";
      clear: both;
    }
    .location-map-lg .location-pin {
      position: absolute;
      left: 0;
      top: 4px;
      margin: 5px 10px 5px;
    }
    .location-map-lg .location .location-name {
      position: inherit;
      left: auto;
      right: auto;
      top: auto;
      bottom: auto;
      display: inline-block;
      background: transparent;
      color: #616366;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      -ms-box-shadow: none;
      -o-box-shadow: none;
      box-shadow: none;
    }
    .location-map-lg .location .location-name > span {
      position: inherit;
      left: auto;
      right: auto;
      top: auto;
      bottom: auto;
      display: inline-block;
      background: transparent;
      color: #616366;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      -ms-box-shadow: none;
      -o-box-shadow: none;
      box-shadow: none;
    }
    .location-map-lg .location-name:after {
      display: none;
    }
    .section-dark .location-map-lg .location .location-name span {
      color: #fff;
    }
  }



</style>
