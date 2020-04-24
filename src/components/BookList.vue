<template>
  <div class="list-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div
        v-if="activeName==='random'"
        style="text-align:left"
      >
      <van-card v-for="item in bookListArr1" :key="item.book_id" :thumb=item.cover @click="gotoBookDetail(item.book_id)">
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
      <div v-else-if="activeName==='mark'" style="text-align:left">
        <van-card v-for="item in bookListArr2" :key="item.book_id" :thumb=item.cover @click="gotoBookDetail(item.book_id)" >
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
      <div v-else-if="activeName==='hot'" style="text-align:left">
        <van-card v-for="item in bookListArr3" :key="item.book_id" :thumb=item.cover @click="gotoBookDetail(item.book_id)" >
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
      <div v-else style="text-align:left">
        <van-card v-for="item in bookListArr4" :key="item.book_id" :thumb=item.cover @click="gotoBookDetail(item.book_id)" >
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
import {
  randomsearchbook,
  searchbookbymark,
  searchbookbyattention,
  searchbookbyshelftime
} from '@/api/e-reader'
import moment from 'moment'
export default {
  name: 'BookList',
  props: {
    activeName: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      current: 1,
      bookListArr1: [],
      bookListArr2: [],
      bookListArr3: [],
      bookListArr4: []
    }
  },
  watch: {
    activeName () {
      this.current = 1
    }
  },
  methods: {
    onLoad () {
      if (this.activeName === 'random') {
        this.handleRandomSearchBook()
      } else if (this.activeName === 'mark') {
        this.handleSearchBookByMark()
      } else if (this.activeName === 'hot') {
        this.handleSearchBookByAttention()
      } else {
        this.handleSearchBookByShelftime()
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
    getdate (date) {
      if (date != null) {
        return moment(date).format('YYYY-MM-DD ')
      } else {
        return ''
      }
    },
    // 处理随机推荐分页查询
    async handleRandomSearchBook () {
      try {
        const res = await randomsearchbook(this.current)
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
      } catch (error) {}
    },
    // 处理按评分分页查询
    async handleSearchBookByMark () {
      try {
        const res = await searchbookbymark(this.current)
        setTimeout(() => {
          if (res.code === 1) {
            for (let index = 0; index < res.data.length; index++) {
              const element = res.data[index]
              this.bookListArr2.push(element)
            }
            this.current++
            this.loading = false
          } else {
            this.finished = true
          }
        }, 1000)
      } catch (error) {}
    },
    // 处理按热度分页查询
    async handleSearchBookByAttention () {
      try {
        const res = await searchbookbyattention(this.current)
        setTimeout(() => {
          if (res.code === 1) {
            for (let index = 0; index < res.data.length; index++) {
              const element = res.data[index]
              this.bookListArr3.push(element)
            }
            this.current++
            this.loading = false
          } else {
            this.finished = true
          }
        }, 1000)
      } catch (error) {}
    },
    // 处理按上架时间分页查询
    async handleSearchBookByShelftime () {
      try {
        const res = await searchbookbyshelftime(this.current)
        setTimeout(() => {
          if (res.code === 1) {
            for (let index = 0; index < res.data.length; index++) {
              const element = res.data[index]
              this.bookListArr4.push(element)
            }
            this.current++
            this.loading = false
          } else {
            this.finished = true
          }
        }, 1000)
      } catch (error) {}
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
