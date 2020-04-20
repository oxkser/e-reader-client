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
import { searchbookshelf } from '@/api/e-reader'
export default {
  name: 'Bookshelf',
  data () {
    return {
      currentUserAccount: '',
      currentUserBookshelf: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({
        name: 'Mine'
      })
    },
    async handleSearchBookshelf (data) {
      try {
        const res = await searchbookshelf(data)
        this.currentUserBookshelf = res
        console.log(this.currentUserBookshelf)
      } catch (error) {
        this.$notify({ type: 'warning', message: '查询用户书架信息异常', duration: '1500' })
      }
    }
  },
  mounted () {
    console.log(this.currentUserAccount)
    this.handleSearchBookshelf(this.currentUserAccount)
  },
  created () {
    this.currentUserAccount = this.$route.params.currentUserAccount
  }
}
</script>
<style scoped>

</style>
