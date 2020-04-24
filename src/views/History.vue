<template>
<div>
  <van-nav-bar title="历史记录" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="list-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div style="text-align:left">
      <van-card v-for="item in currentUserHistory" :key="item.book_id" :thumb=item.cover  >
        <template #title>
          <div class="bookName">书名：{{item.book_name}}</div>
          <div class="author">作者：{{item.author}}</div>
        </template>
        <template #desc>
          <div class="progress">上次阅读到：：{{item.chapter}}</div>
          <div>最近一次阅读时间：{{ getdate (item.addtime)}}</div>
        </template>
        <template #footer>
          <van-button size="small" type="danger" @click="deletebook(currentUserAccount, item.book_id)">删除本条历史记录</van-button>
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
import { searchhistory, deleteHistoryForBookId } from '@/api/e-reader'
export default {
  name: 'History',
  data () {
    return {
      loading: false,
      finished: false,
      currentUserAccount: '',
      currentUserHistory: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        name: 'Mine'
      })
    },
    onLoad () {
      this.handleSearchHistory(this.currentUserAccount)
    },
    getdate (date) {
      if (date != null) {
        return moment(date).format('YYYY-MM-DD HH:mm:SS')
      } else {
        return ''
      }
    },
    gotoBookDetail (bookId) {
      this.$router.push({
        name: 'BookDetail',
        params: {
          bookId
        }
      })
    },
    async handleSearchHistory (currentUserAccount) {
      try {
        const res = await searchhistory(currentUserAccount)
        this.currentUserHistory = res.data
        this.finished = true
      } catch (error) {
        this.$notify({ type: 'warning', message: '查询用户历史记录异常', duration: '1500' })
      }
    },
    async deletebook (userAccount, bookId) {
      this.$dialog.confirm({
        title: '提示',
        message: '你确定要删除本条历史记录吗？'
      }).then(async () => {
        for (let index = 0; index < this.currentUserHistory.length; index++) {
          if (this.currentUserHistory[index].book_id === bookId) {
            this.currentUserHistory.splice(index, 1)
          }
        }
        try {
          const res = await deleteHistoryForBookId(userAccount, bookId)
          if (res.code === 1) {
            this.$toast(res.hint)
          } else {
            this.$toast(res.hint)
          }
        } catch (error) {

        }
      }
      ).catch(() => {

      })
    }
  },
  mounted () {
  },
  created () {
    this.currentUserAccount = this.$route.params.currentUserAccount
  }
}
</script>
<style scoped>

</style>
