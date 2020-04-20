<template>
<div class="container">
  <div class="top-title">萤火阅读</div>
  <van-divider />
  <van-notice-bar  mode="closeable" text="欢迎您来到萤火阅读，我们将为你提供最优质的阅读服务，祝你阅读愉快！" left-icon="volume-o" />
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item><img class="swiper-img" src="../assets/imgs/swiper1.jpg" alt=""></van-swipe-item>
  <van-swipe-item><img class="swiper-img" src="../assets/imgs/swiper2.jpg" alt=""></van-swipe-item>
  <van-swipe-item><img class="swiper-img" src="../assets/imgs/swiper3.jpg" alt=""></van-swipe-item>
  <van-swipe-item><img class="swiper-img" src="../assets/imgs/swiper4.jpg" alt=""></van-swipe-item>
</van-swipe>
  <van-tabs v-model="activeName" sticky @click="ObtainBookList">
    <van-tab title="主页推荐" name="random" >
      <BookList :activeName=activeName ></BookList>
    </van-tab>
    <van-tab title="评分排行" name="mark" >
      <BookList :activeName=activeName ></BookList>
    </van-tab>
    <van-tab title="热度排行" name="hot" >
      <BookList :activeName=activeName ></BookList>
    </van-tab>
    <van-tab title="新书榜" name="new" >
      <BookList :activeName=activeName ></BookList>
    </van-tab>
</van-tabs>
</div>
</template>

<script>
import BookList from '../components/BookList'
const Base64 = require('js-base64').Base64
export default {
  name: 'Homepage',
  components: {
    BookList
  },
  data () {
    return {
      currentUserAccount: '',
      activeName: 'random'
    }
  },
  methods: {
    // 点击列表标题触发函数
    ObtainBookList (name, title) {
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
.top-title{
  background-color: white;
  width: 100%;
  height: 1rem;
  color: black;
  line-height: 1rem;
  font-size: 0.5rem;
}

.van-divider{
  margin: 0;
  padding: 0;
}
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 3.2rem;
  }
  .swiper-img{
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>
