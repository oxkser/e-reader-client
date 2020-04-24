import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Homepage from '@/views/Homepage'
import Search from '@/views/Search'
import Mine from '@/views/Mine'
import Resgister from '@/views/Resgister'
import History from '@/views/History'
import Bookshelf from '@/views/Bookshelf'
import BookDetail from '@/views/BookDetail'
import Reader from '@/views/Reader'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: Mine,
      children: [
        {
          path: 'homepage',
          name: 'Homepage',
          component: Homepage
        },
        {
          path: 'search',
          name: 'Search',
          component: Search
        },
        {
          path: 'mine',
          name: 'Mine',
          component: Mine
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/resgister',
      name: 'Resgister',
      component: Resgister
    },
    {
      path: '/history/:currentUserAccount',
      name: 'History',
      component: History
    },
    {
      path: '/bookshelf/:currentUserAccount',
      name: 'Bookshelf',
      component: Bookshelf
    },
    {
      path: '/bookdetail/:bookId',
      name: 'BookDetail',
      component: BookDetail
    },
    {
      path: '/reader/:bookId',
      name: 'Reader',
      component: Reader
    }
  ]
})
