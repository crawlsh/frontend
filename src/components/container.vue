<template class="searchContainer">
  <div>
    <navbar></navbar>
    <div class="bkgContainer"></div>
    <div class="helper" @click="handleHelper">
      <transition name="el-fade-in-linear">
        <i class="el-icon-s-promotion helpButton openButton" v-show="!shower"></i>
      </transition>
      <transition name="el-fade-in-linear">
        <i class="el-icon-close helpButton closeButton" v-show="shower"></i>
      </transition>
    </div>
    <transition name="el-fade-in-linear">
      <div v-show="shower" class="transition-box helpContainer">
        <div style="padding: 20px;">
          <h1>Hi there 👋</h1>
          <h3 style="font-weight: 100;">How can we help you?</h3>

          <div class="descContainer">
            <form style="padding: 20px;margin-bottom: 40px;" v-show="showForm">
              <p>Your Inquiry</p>
              <el-input type="textarea"
                        :autosize="{ minRows: 4, maxRows: 8}" clearable
                        resize="none"
                        v-model="inquiry"
                        placeholder="Your website is like shit!!"></el-input>
              <p>Rate Us</p>
              <el-rate v-model="rating" style="margin-bottom: 20px;"></el-rate>
              <el-button style="float: right;" type="success" @click="handleSubmit">Submit</el-button>
            </form>
            <form style="padding: 20px;margin-bottom: 40px;text-align: center;" v-show="!showForm">
              <i class="el-icon-ice-cream-round successIcon"></i>
              <h2>Thank You!</h2>
              <h5>We will email you ASAP</h5>
              <el-button @click="showForm = true" style="margin-top: 20px;">Get Back</el-button>
            </form>
          </div>
        </div>
        <div class="helpBkg"></div>

      </div>
    </transition>
  </div>
</template>

<script>
  import navbar from './navbarTransparent.vue'
  import coreContainer from './coreContainer.vue'
  import axios from 'axios'
  import BASE_URL from '../config'
  export default {
        name: "container",
      components: {
        navbar
      },
    data(){
      return {
        shower: false,
        inquiry: "",
        rating: null,
        showForm: true,
      }
    },
    mounted(){

    },
    methods: {
      handleHelper(){
        this.showForm = true
        this.shower = !this.shower;
      },
      handleSubmit(){
        let fd = new FormData();
        fd.append('token', localStorage.getItem('token'));
        fd.append('inquiry', this.inquiry);
        fd.append('rating', this.rating);

        axios.post(BASE_URL + 'userInquiry', fd).then(
          (res) => {
            if (res["data"]["success"]){
              this.inquiry = ""
              this.rating = null
              this.showForm = false
            } else {
              alert(res["data"]["info"])
            }

          }).catch((err) => {
          console.log(err)
        });
      }
    },
    mixins: {coreContainer}
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
  .helper{
    text-align: center;
    vertical-align: middle;
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 60px;
    height: 60px;
    cursor: pointer;
    background: linear-gradient(90deg, #29bdd9 0%, #276ace 100%);
    box-shadow: 0 3px 26px 0 rgba(0,0,0,0.20);
    border-radius: 50%;
    overflow: hidden;
  }
  .helpButton{
    margin-top: 11.5px;
    font-size: 35px;
    color: #fff;

  }
  .openButton {
    transition:all 0.1s linear;
    transform:rotate(0deg);
  }
  .closeButton{
    transition:all 0.1s linear;
    transform:rotate(0deg);
  }
  .helpContainer{
    height: 650px;
    width: 380px;
    position: fixed;
    bottom: 100px;
    right: 20px;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 10px 26px 0 rgba(0,0,0,0.30);
    z-index: 10000;
  }
  .helpBkg{
    background: url("https://js.intercomcdn.com/images/background-7.390b24b1.png");
    position: fixed;
    width: 382px;
    height: 300px;
    bottom: 450px;
    z-index: -1;
    right: 20px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

  }
  .descContainer{
    width: 100%;
    height: max-content;
    background-color: #fff;
    border-style: solid;
    border-color: #ccc;
    border-width: 1px;
    border-radius: 10px;
    border-top-width: 7px;
    border-top-color: #000;
    box-shadow: 0 3px 26px 0 rgba(0,0,0,0.20);
  }
  .successIcon{
    margin-top: 20px;
    font-size: 60px;
    color: #10ac84;
  }
</style>
