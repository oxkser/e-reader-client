<template>
<div>
<van-nav-bar
  title="标题"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
</div>
</template>

<script>
import { searchhistory } from '@/api/e-reader'
export default {
  name: 'History',
  data () {
    return {
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
    async handleSearchHistory (data) {
      try {
        const res = await searchhistory(data)
        this.currentUserHistory = res
        console.log(this.currentUserHistory)
      } catch (error) {
        this.$notify({ type: 'warning', message: '查询用户历史记录异常', duration: '1500' })
      }
    }
  },
  mounted () {
    console.log(this.currentUserAccount)
    this.handleSearchHistory(this.currentUserAccount)
  },
  created () {
    this.currentUserAccount = this.$route.params.currentUserAccount
  }
}
</script>
<style scoped>

</style>
