import Vue from 'vue'
import Router from 'vue-router'
import header from '@/components/Header'
import PostList from '@/components/PostList'
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
