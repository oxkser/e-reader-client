<template>
<div class="content">
  <div class="center-header">
    <div class="top-title">个人中心</div>
    <div class="img-box" v-if=currentUserAccount>
      <img class="avatar" :src='this.currentUserInfo.avatar' alt="">
    </div>
    <div class="img-box" v-else>
      <img class="avatar" src="../assets/imgs/default_user.png" alt=''>
    </div>
    <div class="name" v-if=currentUserAccount >书友：{{this.currentUserInfo.user_name}}</div>
    <div class="name" v-else >你还没有登录哦，请先登录！</div>
  </div>
  <div class="space-white"></div>
  <div class="grey"></div>
  <div class="function">我的功能</div>
  <van-grid clickable :column-num="2">
    <van-grid-item v-if=currentUserAccount icon="clock-o" text="历史记录" :to="{name:'History',params:{currentUserAccount:this.currentUserAccount}}" />
    <van-grid-item v-else icon="clock-o" @click="hint1" text="历史记录" />
    <van-grid-item v-if=currentUserAccount icon="orders-o" text="我的书架" :to="{name:'Bookshelf',params:{currentUserAccount:this.currentUserAccount}}" />
    <van-grid-item v-else icon="orders-o" @click="hint1" text="我的书架" />
  </van-grid>
  <div class="bottom">
    <div class="box-button" v-if=currentUserAccount>
      <van-button type="default" @click="Logout">退出登录</van-button>
    </div>
    <div class="box-button" v-else>
      <van-button type="default" @click="gotoLogin">去登录</van-button>
    </div>
  </div>
</div>
</template>
<script>
import {searchInfo} from '@/api/e-reader'
const Base64 = require('js-base64').Base64
export default {
  name: 'Mine',
  data () {
    return {
      currentUserAccount: '',
      currentUserInfo: {}
    }
  },
  methods: {
    gotoLogin () {
      this.$router.push({
        path: '/login'
      })
    },
    hint1 () {
      // this.$toast.fail('你还没有登录')
      this.$toast('你还没有登录')
    },
    Logout (beforeClose) {
      let that = this
      this.$dialog.confirm({
        title: '提示',
        message: '你确定要退出登录吗？',
        beforeClose: that.beforeClose
      })
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        setTimeout(() => {
          this.currentUserAccount = ''
          this.currentUserInfo = ''
          this.delCookie('currentUser')
          localStorage.removeItem('token')
          // this.$toast.success('退出成功')
          this.$notify({ type: 'success', message: '退出成功', duration: '1000' })
          done()
        }, 1000)
      } else {
        done()
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
    },
    delCookie (name) {
      var exp = new Date()
      exp.setTime(exp.getTime() - 1)
      var cval = this.getCookie(name)
      if (cval != null) { document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString() }
    },
    async handleSearchInfo (currentUserAccount) {
      try {
        const res = await searchInfo(currentUserAccount)
        if (res.code === 1) {
          this.currentUserInfo = res.data
        }
      } catch (error) {

      }
    }
  },
  mounted () {
    this.handleSearchInfo(this.currentUserAccount)
  },
  created () {
    let account = Base64.decode(this.getCookie('currentUser'))
    if (account) {
      this.currentUserAccount = account
    }
  }
}
</script>

<style scoped>
.content{
  width: 100%;
  height: 90vh;
  position: relative;
}
.center-header {
    width: 100%;
    height: 6rem;
    margin-top: 0;
    text-align: center;
    color: #fff;
    background-image: url('../assets/imgs/user_bgm.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
.top-title{
  background-color: white;
  width: 100%;
  height: 1rem;
  color: black;
  line-height: 1rem;
  font-size: 0.5rem;
}
.img-box{
  margin-top: 1rem;
}
.avatar{
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
}
.name{
  margin: 0 auto;
  margin-top: 0.2rem;
  width: 60%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.space-white{
  height: 1rem;
  background-color: white;
}
.grey{
  height: 0.4rem;
  background-color: #F6F7F9;
}
.function{
  text-align: left;
  margin: 0.2rem 0.4rem;
  color: #969BA3;
  font-size: 0.45rem;
}
.box-button{
  background-color: #F6F7F9;
  padding: 0.2rem 0;
  width: 100%;
}
.van-button{
  width: 100%;
  color: #F14D54;
}
.bottom{
  height: auto;
  width: 100%;
 position: absolute;
 bottom: 0;
}
</style>
