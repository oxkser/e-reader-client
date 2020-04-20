<template>
  <div class="container">
    <van-sticky>
    <van-search
      v-model="str"
      show-action
      shape="round"
      background="#4fc08d"
      @search="onSearch"
      placeholder="请输入搜索关键词"
      clearable
  >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-dropdown-menu >
      <van-dropdown-item @change="changeSort" v-model="sort" :options="option1" />
    </van-dropdown-menu>
    </van-sticky>
    <BookListOfSearch :str=str  v-if="isSearch" ></BookListOfSearch>
    <BookListOfSort :sort=sort v-if="isSort" ></BookListOfSort>
  </div>
</template>

<script>
import BookListOfSearch from '../components/BookListOfSearch'
import BookListOfSort from '../components/BookListOfSort'
const Base64 = require('js-base64').Base64
export default {
  name: 'Search',
  components: {
    BookListOfSearch,
    BookListOfSort
  },
  data () {
    return {
      currentUserAccount: '',
      str: '',
      isSearch: true,
      isSort: false,
      sort: '全部分类',
      option1: [
        { text: '全部分类', value: '全部分类' },
        { text: '言情', value: '言情' },
        { text: '哲学', value: '哲学' },
        { text: '科幻', value: '科幻' },
        { text: '科学', value: '科学' }
      ]
    }
  },
  methods: {
    onSearch (val) {
      this.isSearch = true
      this.isSort = false
      this.sort = '全部分类'
    },
    changeSort () {
      this.isSearch = false
      this.isSort = true
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
</style>
