<template>
  <div class="container">
    <div class="top-img">
      <div class="title">萤火阅读</div>
      <div class="title">Welcome to Yinghuo</div>
    </div>
    <div class="login">
      <div class="logo">
        <img
          class="logo-img"
          src="../assets/imgs/logo1.jpg"
          alt=""
        >
      </div>
      <van-cell-group>
        <van-field
          v-model="user.userAccount"
          label="账号:"
          clearable
          left-icon="manager"
          placeholder="请输入账号"
          size='large'
        />
        <van-field
          v-model="user.password"
          clearable
          label="密码:"
          type="password"
          size='large'
          left-icon="lock"
          placeholder="请输入密码"
        />
        <div class="remember">
        <van-checkbox v-model="user.remember" shape="square">记住密码</van-checkbox>
        <span class="res" @click="resgister">注册账号</span>
        </div>
      </van-cell-group>
      <van-button round type="info" color="linear-gradient(to bottom, #FB634B, #EC454C)" @click="Login(user)">登录</van-button>
      <div class="hint">如果你还没有账号，请先<span class="resgister" @click="resgister">注册账号</span>！</div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/e-reader'
const Base64 = require('js-base64').Base64
export default {
  name: 'Login',
  mounted () {

  },
  data () {
    return {
      user: {
        userAccount: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
  // 登录
    Login (user) {
      this.handleLogin(user)
      this.setUserInfo()
    },
    resgister () {
      this.$router.push({
        name: 'Resgister'
      })
    },
    async handleLogin (user) {
      try {
        const res = await login(Base64.encode(user.userAccount), Base64.encode(user.password))
        if (res.code) {
          this.$notify({ type: 'success', message: res.hint, duration: '1000' })
          this.setCookie('currentUser', Base64.encode(res.data), 1)
          localStorage.setItem('token', res.token)
          this.$router.push({
            path: '/'
          })
        } else {
          this.$notify({ type: 'warning', message: res.hint, duration: '1500' })
        }
      } catch (e) {
        this.$notify({ type: 'warning', message: '登录异常', duration: '1500' })
      }
    },
    setUserInfo () {
      // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
      // 如果没有勾选，储存的信息为空
      if (this.user.remember) {
        this.setCookie('e-reader-userAccount', Base64.encode(this.user.userAccount))
        // base64加密密码
        this.setCookie(
          'e-reader-password',
          Base64.encode(this.user.password)
        )
        this.setCookie('remember', this.user.remember)
      } else {
        this.setCookie('e-reader-userAccount', '')
        this.setCookie('e-reader-password', '')
      }
    },
    getCookie (key) {
      if (document.cookie.length > 0) {
        var start = document.cookie.indexOf(key + '=')
        if (start !== -1) {
          start = start + key.length + 1
          var end = document.cookie.indexOf(';', start)
          if (end === -1) end = document.cookie.length
          return unescape(document.cookie.substring(start, end))
        }
      }
      return ''
    },
    // 保存cookie
    setCookie (cName, value, expiredays) {
      var exdate = new Date()
      exdate.setDate(exdate.getDate() + expiredays)
      document.cookie =
        cName +
        '=' +
        decodeURIComponent(value) +
        (expiredays == null ? '' : ';expires=' + exdate.toGMTString())
    }
  },
  created () {
    let account = Base64.decode(this.getCookie('e-reader-userAccount'))
    let password = Base64.decode(this.getCookie('e-reader-password'))
    // 如果存在赋值给表单，并且将记住密码勾选
    if (account) {
      this.user.userAccount = account
      this.user.password = password
      this.user.remember = true
    }
  }
}
</script>

<style  scoped>
* {
  margin: 0px;
  padding: 0px;
}
.top-img {
  width: 100%;
  height: 3.5rem;
  background-image: url('../assets/imgs/login_bgm.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 1rem;
}
.title{
  color: white;
  padding: 0rem 0.8rem;
  text-align: left;
  font-size: 0.4rem;
}
.login {
  position: relative;
  top: -1rem;
  z-index: 2;
  width: 100%;
  /* margin: -.1rem auto 0; */
  height: 10rem;
  background: #fff;
  border-radius: 8px 8px 0 0;
}
.logo {
  padding: 0.7rem 0;
  text-align: center;
}
.logo-img {
  width: 1.5rem;
  height: 1.5rem;
  border: 0;
  border-radius: 8px;
  vertical-align: middle;
}
.van-cell-group{
  margin: 0 1rem;
}
.van-field{
  padding: 0.5rem 0;
  text-align: center;
  font-size: 0.42667rem;
}
.hint{
  text-align: center;
  font-size: 0.35rem;
}
.resgister{
  text-align: center;
  color: #0091DE ;
}
.remember{
  margin: 0.5rem 0;
  font-size: 0.35rem;
  position: relative;
}
.van-button{
  margin: 0.3rem 0.5rem;
  width: 80%;
}
.res{
position: absolute;
right: 0;
top: 0%;
 color: #0091DE ;

}
.van-checkbox{
  width: 40%;
  top: 0;
  vertical-align: top;
}
</style>
<style>
.el-notification__content{
  margin: 0!important;
}
</style>
