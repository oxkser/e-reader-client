<template>
<div>
<van-nav-bar title="我的书架" left-text="返回" left-arrow @click-left="onClickLeft"/>
<div class="list-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        style="text-align:left"
      >
      <van-card v-for="item in currentUserBookshelf" :key="item.book_id" :thumb=item.cover  >
        <template #title>
          <div class="bookName">书名：{{item.book_name}}</div>
          <div class="author">作者：{{item.author}}</div>
        </template>
        <template #desc>
          <div class="progress">上次阅读到：{{item.chapter}}</div>
          <div>加入书架时间：{{getdate (item.addtime)}}</div>
        </template>
        <template #footer>
          <van-button size="small" type="danger" @click="deletebook(currentUserAccount, item.book_id)">从书架删除</van-button>
          <van-button size="small" type="primary" @click="gotoBookDetail(item.book_id)">继续阅读</van-button>
        </template>
      </van-card>
      </div>
    </van-list>
  </div>
</div>
</template>

<script>
import moment from 'moment'
import { searchbookshelf, deleteBookForBookId } from '@/api/e-reader'
export default {
  name: 'Bookshelf',
  data () {
    return {
      loading: false,
      finished: false,
      currentUserAccount: '',
      currentUserBookshelf: ''
    }
  },
  watch: {
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        name: 'Mine'
      })
    },
    onLoad () {
      this.handleSearchBookshelf(this.currentUserAccount)
    },
    gotoBookDetail (bookId) {
      this.$router.push({
        name: 'BookDetail',
        params: {
          bookId
        }
      })
    },
    getdate (date) {
      if (date != null) {
        return moment(date).format('YYYY-MM-DD HH:mm:SS')
      } else {
        return ''
      }
    },
    async handleSearchBookshelf (data) {
      try {
        const res = await searchbookshelf(data)
        this.currentUserBookshelf = res.data
        this.finished = true
      } catch (error) {
        this.$notify({ type: 'warning', message: '查询用户书架信息异常', duration: '1500' })
      }
    },
    // 删除一条书架记录
    deletebook (userAccount, bookId) {
      this.$dialog.confirm({
        title: '提示',
        message: '你确定要删除本条书架记录吗？'
      })
        .then(async () => {
          // on confirm
          for (let index = 0; index < this.currentUserBookshelf.length; index++) {
            if (this.currentUserBookshelf[index].book_id === bookId) {
              this.currentUserBookshelf.splice(index, 1)
            }
          }
          try {
            const res = await deleteBookForBookId(userAccount, bookId)
            if (res.code === 1) {
              this.$toast(res.hint)
            } else {
              this.$toast(res.hint)
            }
          } catch (error) {

          }
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  mounted () {
    this.handleSearchBookshelf(this.currentUserAccount)
  },
  created () {
    this.currentUserAccount = this.$route.params.currentUserAccount
  }
}
</script>
<style scoped>
.bookName{
  font-size: 0.4rem;
  font-weight: 600;
}
.author{
  font-size: 0.35rem;
  font-weight: 600;
}
.progress{
  margin: 0.2rem 0;
  font-size: 0.35rem;
}
</style>
<style >
.list-container .van-list__error-text {
  height: 3rem !important;
}
.list-container .van-list__finished-text {
  height: 3rem !important;
}
.list-container .van-list__loading {
  height: 3rem !important;
}
.list-container .van-image__img {
  width: auto!important;
}
</style>
