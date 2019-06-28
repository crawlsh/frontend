<template>
  <ul class="navbarBadges navbar">
    <li class="navItem" >
      <a class="navButton" @click="goHome" style="cursor:pointer;">{{ $t('m.Home') }}</a>
      <a class="navButton" @click="goPricing" style="cursor:pointer;">{{ $t('m.Pricing') }}</a>
      <a class="navButton" @click="goHistory" v-show="hasLogin" style="cursor:pointer;">{{ $t('m.ViewJob') }}</a>

    </li>
    <li class="leftItem" v-show="!hasLogin">
      <el-button class="navButtonLeft primaryButton" type="primary" v-on:click="startLogin">{{ $t('m.Login') }}</el-button>
      <el-button class="navButtonLeft secondaryButton" type="primary"
                 plain v-on:click="startRegister">{{ $t('m.Register') }}</el-button>
    </li>
    <li class="leftItem" v-show="hasLogin">
      <el-button class="navButtonLeft secondaryButton"
                 plain type="primary" v-on:click="logout">{{ $t('m.Logout') }}</el-button>
    </li>
    <el-dialog
          :title="$t('m.Login')"
          :visible.sync="displayLogin"
          width="580px"
          :before-close="clearAll">
      <el-alert type="error" :title="errorMsg" v-show="isLoginError"></el-alert>
      <p class="inputLabel">{{$t("m.Username")}}/{{$t("m.Email")}}:</p>
      <el-input v-model="loginName" placeholder="tom@hanks.com"></el-input>
      <p class="inputLabel">{{$t("m.Password")}}:</p>
      <el-input v-model="loginPassword" type="password"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearAll">{{ $t('m.Cancel') }}</el-button>
        <el-button type="primary" @click="submitLogin">{{$t('m.Login')}}</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :title="$t('m.Register')"
      :visible.sync="displayRegister"
      width="580px"
      :before-close="clearAll">
      <el-alert :title="errorMsg" v-show="isRegisterError"
                :type="successRegister ? 'success': 'error'"></el-alert>
      <p class="inputLabel">{{$t("m.Username")}}:</p>
      <el-input v-model="registerName" placeholder="tomhanks"></el-input>
      <p class="inputLabel">{{$t("m.Email")}}:</p>
      <el-input v-model="registerMail" placeholder="tom@hanks.com"></el-input>
      <p class="inputLabel">{{$t("m.Password")}}:</p>
      <el-input v-model="registerPassword" type="password"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearAll">{{$t('m.Cancel')}}</el-button>
        <el-button type="primary" @click="submitRegister">{{ $t('m.Register') }}</el-button>
      </span>
    </el-dialog>
  </ul>

</template>

<script>
  import router from '../router'
  import store from '../store'
  import axios from 'axios'

  import BASE_URL from '../config'
  export default {
    name: 'navbar',
    data() {
      return {
        displayLogin: false,
        displayRegister: false,
        loginName: '',
        loginPassword: '',
        registerName: '',
        registerMail: '',
        registerPassword: '',
        isLoginError: 0,
        isRegisterError: 0,
        errorMsg: '',
        successRegister: 0,
        hasLogin: 0,
      }
    },
    mounted() {
      this.hasLogin = localStorage.getItem("hasLogin") == "1";

    },
    methods: {
      clearAll() {
        this.displayLogin = false;
        this.displayRegister = false;
        this.loginName = '';
        this.loginPassword = '';
        this.registerName = '';
        this.registerMail = '';
        this.registerPassword = '';
        this.isLoginError = 0;
        this.isRegisterError = 0;
        this.errorMsg = ''
        this.successRegister = 0
      },
      startLogin() {
        this.displayLogin = true;
      },
      startRegister() {
        this.displayRegister = true;
      },
      submitLogin() {
        let userParam = this.loginName;
        let password = this.loginPassword;
        let fd = new FormData();
        fd.append('userParam', userParam);
        fd.append('password', password);
        axios.post(BASE_URL + 'userLogin', fd).then(
          (res) => {
            if (res["data"]["success"]) {
              localStorage.setItem("token", res["data"]["info"]);
              localStorage.setItem("hasLogin", 1);
              this.displayLogin = false;
              this.loginSuccess();
            } else {
              this.showLoginErr(res["data"]["info"])
            }
          }).catch((err) => {
          console.log(err)
        });
      },
      showLoginErr(err) {
        this.errorMsg = err;
        this.isLoginError = 1;
      },
      loginSuccess() {
        this.hasLogin = 1;
        localStorage.setItem("hasLogin", 1)
      },
      submitRegister() {
        let email = this.registerMail;
        let username = this.registerName;
        let password = this.registerPassword;

        let fd = new FormData();
        fd.append('email', email);
        fd.append('username', username);
        fd.append('password', password);
        axios.post(BASE_URL + 'userRegister', fd).then(
          (res) => {
            if (res["data"]["success"]) {
              this.showRegisterSuccess(res["data"]["info"])
            } else {
              this.showRegisterErr(res["data"]["info"])
            }
          }).catch((err) => {
          console.log(err)
        });
      },
      showRegisterErr(err) {
        this.errorMsg = err;
        this.isRegisterError = 1;
        this.successRegister = 0;
      },
      showRegisterSuccess(err) {
        this.errorMsg = err;
        this.isRegisterError = 1;
        this.successRegister = 1;
      },
      goHistory() {
        router.push('history')
      },
      goPricing() {
        router.push('pricing')
      },
      goIntro() {

      },
      goHome() {
        router.push('/')
      },
      logout() {
        localStorage.setItem('token', '');
        localStorage.setItem('hasLogin', 0);
        this.hasLogin = 0
        window.location.href = "/"
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar{
    position: absolute;
    margin-top: 100px;
    padding: 0;
    width: 100%;
  }
  .navButton{
    padding: 5px;
    color: #eee;
    margin-right: 20px;

  }
  .navButton:hover{
    color: #ddd;
    margin-right: 20px;
    border-style: solid;
    border-color: #fff;
    border-width: 0;
    border-bottom-width: 1px;
    transition: all 20ms ease-in-out;
  }
  .navButtonLeft{
    margin-top: -7.5px;
    padding: 10px;
    color: #f8f9fa;
    background-color: transparent;
    background-image: none;
    border-color: #f8f9fa;
  }
  .primaryButton{
    background: #444;
    border-color: #444;
  }
  .secondaryButton:hover{
    background: #444;
    border-color: #444;
  }
  .secondaryButton:focus{
    background: transparent;
    border-color: #fff;
  }
  .navbarBadges{
    float: left;
    top: 0;
  }
  .navItem {
    position: absolute;
    left: 8%;
    float: left;
  }
  .leftItem{
    position: absolute;
    right: 8%;
  }

  ul {
    /* margin-top: 0; */
    margin-bottom: 1rem;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
    list-style: none;

  }
  a{
    text-decoration: none;
  }
  .inputLabel{
    text-align: left;
  }

</style>
