<template>
 <div>
<router-view></router-view>

<van-tabbar route>
  <van-tabbar-item replace to="/homepage" icon="home-o">
    主页
  </van-tabbar-item>
  <van-tabbar-item replace to="/search" icon="search">
    发现
  </van-tabbar-item>
  <van-tabbar-item replace to="/mine" icon="friends-o">
    我的
  </van-tabbar-item>
</van-tabbar>
 </div>
</template>

<script>
const Base64 = require('js-base64').Base64
export default {
  name: 'Home',
  data () {
    return {
      currentUserAccount: ''
    }
  },
  methods: {
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
    }
  },
  mounted () {
  },
  created () {
    let account = Base64.decode(this.getCookie('userAccount'))
    if (account) {
      this.currentUserAccount = account
    }
  }
}
</script>

<style scoped>

</style>
