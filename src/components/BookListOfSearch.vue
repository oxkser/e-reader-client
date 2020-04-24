<template>
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
      <van-card v-for="item in bookListArr1" :key="item.book_id" :thumb=item.cover @click="gotoBookDetail(item.book_id)" >
        <template #title>
          <div>书名：{{item.book_name}}</div>
          <div>作者：{{item.author}}</div>
        </template>
        <template #desc>
          <div>评分：
            <!-- <van-rate v-model=item.mark size='10px' :count="10" readonly/> -->
            <el-rate
              style="display: inline-block;"
              v-model=item.mark
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </div>
          <div>热度：{{item.attention}}</div>
          <div>上架时间：{{getdate(item.shelf_time)}}</div>
        </template>
        <template #tags>
          <van-tag plain type="danger">{{item.sort_1}}</van-tag>
          <van-tag plain type="danger">{{item.sort_2}}</van-tag>
          <van-tag plain type="danger">{{item.sort_3}}</van-tag>
        </template>
      </van-card>
      </div>
    </van-list>
  </div>
</template>

<script>
import { vaguesearchbook } from '@/api/e-reader'
import moment from 'moment'
export default {
  name: 'BookListOfSearch',
  props: {
    str: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      current: 1,
      bookListArr1: []
    }
  },
  watch: {
    str () {
      this.current = 1
      this.bookListArr1 = []
      this.onLoad()
    }
  },
  methods: {
    onLoad () {
      this.handleVagueSearchBook(this.str)
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
        return moment(date).format('YYYY-MM-DD ')
      } else {
        return ''
      }
    },
    // 处理模糊分页查询
    async handleVagueSearchBook (str) {
      try {
        const res = await vaguesearchbook(str, this.current)
        setTimeout(() => {
          if (res.code === 1) {
            for (let index = 0; index < res.data.length; index++) {
              const element = res.data[index]
              this.bookListArr1.push(element)
            }
            this.current++
            this.loading = false
          } else {
            this.finished = true
          }
        }, 1000)
      } catch (error) {
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
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
