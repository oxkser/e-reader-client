<template>
    <div class="reader">
        <!--头部-->
        <top-menu :class="{show: menu}"></top-menu>
        <!--内容-->
        <div class="reader-container" :bg="currentStyle" :night="night">
            <mt-header fixed :title="title"></mt-header>
            <div class="content">
                <p v-for="(item,index) in contents" :style="{fontSize: `${fontSize}px`}" :key="index">{{item}}</p>
            </div>
            <ul class="btns">
                <li @click="preChapter">上一章</li>
                <li @click="nextChapter">下一章</li>
            </ul>
        </div>
        <!--底部菜单-->
        <bottom-menu :class="{show: menu}"></bottom-menu>
        <!--显示菜单栏-->
        <div class="show-menus" @click="showMenu"></div>
        <div class="page-up" @click="pageUp">上一页</div>
        <div class="page-down" @click="pageDown">下一页</div>
        <!--目录-->
        <title-list :class="{show: cover}" :book-id="bookId"></title-list>
        <!--字体-->
        <fonts :class="{show: font}"></fonts>
    </div>
</template>

<script>
// import {getBookContent, getLate, postLately} from '../fetch'
import { read, insertHistory } from '@/api/e-reader'
import {mapState} from 'vuex'
import TopMenu from '../components/TopMenu'
import BottomMenu from '../components/BottomMenu'
import TitleList from '../components/TitleList'
import Fonts from '../components/Fonts'
const Base64 = require('js-base64').Base64

export default {
  name: 'Reader',
  data () {
    return {
      bookId: '',
      title: '',
      contents: [],
      currentUserAccount: '',
      counts: 0
    }
  },
  components: {
    'top-menu': TopMenu,
    'bottom-menu': BottomMenu,
    'title-list': TitleList,
    'fonts': Fonts
  },
  computed: {
    ...mapState([
      'currentCpt', 'cover', 'fontSize', 'font', 'menu', 'night', 'currentStyle'
    ])
  },
  watch: {
    currentCpt (value) {
      this.getBookContent(this.$route.params.bookId, value)
    }
  },
  methods: {
    // getBookContent (id, chapter) {
    //   getBookContent(id, chapter).then(res => {
    //     this.title = res.title
    //     this.contents = res.content.split('-')
    //   })
    // },
    async getBookContent (bookId, chapterId) {
      try {
        const res = await read(bookId, chapterId)
        if (res.code === 1) {
          this.title = res.data.chapter
          this.contents = res.data.content.split('-')
        }
      } catch (error) {

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
    preChapter () {
      this.$store.dispatch('preCpt').then(() => {
        this.$nextTick(() => {
          window.scrollTo(0, 0)
        })
      })
    },
    nextChapter () {
      this.$store.dispatch('nextCpt', 500).then(() => {
        this.$nextTick(() => {
          window.scrollTo(0, 0)
        })
      })
    },
    async handleInsertHistory () {
      try {
        const res = await insertHistory(this.currentUserAccount, this.bookId, this.currentCpt)
        if (res.code === 1) {
          this.$store.dispatch('menus')
        }
      } catch (error) {

      }
    },
    showMenu () {
      this.$store.dispatch('menus')
    },
    // 向上翻页
    pageUp () {
      let target = window.pageYOffset - window.innerHeight - 80
      this.startScroll(target)
    },
    // 向下翻页
    pageDown () {
      let target = window.pageYOffset + window.innerHeight - 80
      this.startScroll(target)
    },
    startScroll (target) {
      window.scrollTo(0, target)
    }
  },
  created () {
    let account = Base64.decode(this.getCookie('userAccount'))
    if (account) {
      this.currentUserAccount = account
    }
    this.bookId = this.$route.params.bookId
    this.getBookContent(this.$route.params.bookId, this.$store.state.currentCpt)
  },
  beforeDestroy () {
    let account = Base64.decode(this.getCookie('userAccount'))
    if (account) {
      this.handleInsertHistory()
    }
  }
}
</script>

<style lang="less">
    .reader {
        text-align: left;
        .bgc(@color) {
            background-color: @color;
            .mint-header {
                background-color: @color;
            }
        }

        .reader-container {
            padding: 50px 15px 0;
            color: #555;

            &[bg='style1'] {
                .bgc(#e9dfc7);

                &[night='true'] {
                    .bgc(#000)
                }
            }

            &[bg='style2'] {
                .bgc(#e7eee5);

                &[night='true'] {
                    .bgc(#000)
                }
            }

            &[bg='style3'] {
                .bgc(#a4a4a4);

                &[night='true'] {
                    .bgc(#000)
                }
            }

            &[bg='style4'] {
                .bgc(#cdefcd);

                &[night='true'] {
                    .bgc(#000)
                }
            }

            &[bg='style5'] {
                .bgc(#283548);

                &[night='true'] {
                    .bgc(#000)
                }
            }

            .mint-header {
                height: 50px;
                line-height: 50px;
                background-color: #fff;
                font-size: 18px;
                color: #555;
            }

            .content {
                p {
                    text-indent: 2em;
                    font-size: 16px;
                    line-height: 1.8;
                    margin-bottom: 10px;
                }
            }

            .btns {
                width: 100%;
                padding: 15px 0;
                height: 40px;
                font-size: 0;
                text-align: center;
                z-index: 99;

                li {
                    width: 100px;
                    display: inline-block;
                    line-height: 40px;
                    color: #fff;
                    text-align: center;
                    background-color: #26a2ff;
                    font-size: 14px;
                    -webkit-border-radius: 6px;
                    -moz-border-radius: 6px;
                    border-radius: 6px;
                    margin: 0 15px;
                }
            }
        }

        .show-menus {
            position: fixed;
            top: 30%;
            width: 100%;
            height: 35%;
        }

        .page-up {
            position: fixed;
            top: 50px;
            height: 30%;
            width: 100%;
            text-indent: -9999px;
            z-index: 5;
        }

        .page-down {
            position: fixed;
            bottom: 70px;
            height: 30%;
            width: 100%;
            text-indent: -9999px;
            z-index: 5;
        }

    }
</style>
