import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/Header'
import PostList from '@/components/PostList'
import SideBar from '@/components/SideBar'
import UserInfo from '@/components/UserInfo'
import Article from '@/components/Article'

import { userInfo } from 'os';


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'root',
      components:{
        main:PostList
      } 
    },
    {
      path:'/topic/:id$author=:name',
      name:'post_content',
      components:{
        main:Article,
        sidebar:SideBar
      }
    },
    {
      path:'/user/:name',
      name:'user_info',
      components:{
        main:UserInfo
      }
    }

    // {
    //   path:'/user/:name',
    //   name:'user_info',
    //   components:{
    //     main:userInfo
    //   }
    // },
  ]
})
