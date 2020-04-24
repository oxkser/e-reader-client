<template>
  <div class="container">
    <van-nav-bar
      :title=bookDetail.book_name
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
      <van-panel >
      <div class="content">
        <img class="bookcover" :src=bookDetail.cover alt="">
        <div class="right">
          <div class="bookname" >书名：{{bookDetail.book_name}}</div>
          <div class="author">作者：{{bookDetail.author}}</div>
          <div class="mark"> 评分：{{bookDetail.mark}}</div>
          <div class="sort">
            <van-tag round type="success">{{bookDetail.sort_1}}</van-tag>
            <van-tag round type="success">{{bookDetail.sort_2}}</van-tag>
            <van-tag round type="success">{{bookDetail.sort_3}}</van-tag>
          </div>
          <div class="number">字数：{{bookDetail.number}}万字</div>
          <div class="number">上架时间：{{getdate(bookDetail.shelf_time)}}</div>
        </div>
      </div>
      <van-divider />
      <div class="center-button">
        <van-button size="small" type="danger" @click="addBookshelf">加入书架</van-button>
        <van-button size="small" @click="startRead" >开始阅读</van-button>
      </div>
      <van-divider />
      <div class="intro-box">
        <div class="intro-title">简介：</div>
        <div class="intro" >{{bookDetail.introduction}}</div>
      </div>
      <van-divider />
     </van-panel>
  </div>
</template>

<script>
import moment from 'moment'
import { searchbookbyid, insertbooktobookshelf } from '@/api/e-reader'
const Base64 = require('js-base64').Base64
export default {
  name: 'BookDetail',
  data () {
    return {
      currentUserAccount: '',
      bookId: '',
      bookDetail: '',
      activeNames: ['1']
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        name: 'Homepage'
      })
    },
    startRead () {
      this.$router.push({
        name: 'Reader',
        params: {
          bookId: this.bookId
        }
      })
    },
    addBookshelf () {
      if (this.currentUserAccount) {
        this.handleInsertBookToBookshelf()
      } else {
        // this.$toast.fail('你还没有登录')
        this.$toast('你还没有登录,不能添加到书架')
      }
    },
    async handleInsertBookToBookshelf () {
      let userAccount = this.currentUserAccount
      let bookId = this.bookId
      try {
        const res = await insertbooktobookshelf(userAccount, bookId)
        if (res.code === 1) {
          this.$toast(res.hint)
        }
      } catch (error) {

      }
    },
    // getNumber (number) {
    //   if (number == null) {
    //     return '暂无数据'
    //   } else {
    //     let tem = (number / 10000).toFixed(2)
    //     return tem + '万字'
    //   }
    // },
    getdate (date) {
      if (date != null) {
        return moment(date).format('YYYY-MM-DD ')
      } else {
        return ''
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
    async handleSearchBookById () {
      try {
        const res = await searchbookbyid(this.bookId)
        if (res.code === 1) {
          this.bookDetail = res.data
        } else {
          this.$notify({ type: 'warning', message: res.hint, duration: '1000' })
        }
      } catch (error) {
        this.$notify({ type: 'warning', message: '查询书目信息异常', duration: '1000' })
      }
    }
  },
  created () {
    let account = Base64.decode(this.getCookie('currentUser'))
    if (account) {
      this.currentUserAccount = account
    }
    this.bookId = this.$route.params.bookId
  },
  mounted () {
    this.handleSearchBookById()
  }
}
</script>

<style scoped>
.container{
  text-align: left;
}
.content{
  margin: 0 0.7rem;
  text-align: left;
}
.bookcover{
  width: 36%;
  border-radius: 0.2rem;
}
.right{
  width: 60%;
  display: inline-block;
  vertical-align: top;
  margin: 0.1rem 0;
  margin-left: 0.2rem;
}
.right div{
  margin: 0.1rem 0;
}
.bookname{
  font-weight: 600;
  width: 100%;
}
.author{
  font-size: 0.35rem;
}
.mark{
  font-size: 0.4rem;
}
.number{
  font-size: 0.35rem;
}
.center-button{
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.van-button--small{
   min-width: 3.6rem;
}
.intro-box{
  margin: 0 0.7rem;
  text-align: left;
}
.intro-title{
  font-weight: 600;
  margin: 0.2rem 0;
}
.intro{
  text-indent: 2em;
}
.buttom-box{
  margin: 0 0.5rem;
}
.van-cell__title{
  font-size: 0.5rem;
  font-weight: 600;
}
</style>
