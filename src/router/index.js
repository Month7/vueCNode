import Vue from 'vue'
import Router from 'vue-router'
import cHeader from '../components/Header.vue'
import content from '../components/PostList.vue'
import home from '../components/Home.vue'
import login from '../components/Login.vue'
import self from '../components/Self.vue'
import article from '../components/Article.vue'
import create from '../components/Create.vue'
import userinfo from '../components/UserInfo.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user/:loginname',
      name: 'userinfo',
      components: {
        lists: userinfo
      }
    },
    {
      path: '/create',
      name: 'create',
      components: {
        lists: create
      }
    },
    {
      path: '/article/:id',
      name: 'article',
      components: {
        lists: article
      }
    },
    {
      path: '/self',
      name: 'self',
      components: {
        lists: self
      }
    },
    // 主页
    {
      path: '/',
      name: 'index',
      components: {
        nav: cHeader,
        lists: home
      }
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      components: {
        lists: login
      }
    },
    // 消息
    {
      path: '/message',
      name: 'message',
      components: {
        nav: cHeader
      }
    },
    // 精华列表
    {
      path: '/?tab=:tab',
      name: 'good',
      components: {
        nav: cHeader,
        lists: content
      }
    },
    // 分享列表
    {
      path: '/?tab=:tab',
      name: 'share',
      components: {
        nav: cHeader,
        lists: content
      }
    },
    // 问答列表
    {
      path: '/?tab=:tab',
      name: 'ask',
      components: {
        nav: cHeader,
        lists: content
      }
    },
    // 测试列表
    {
      path: '/?tab=:tab',
      name: 'test',
      components: {
        nav: cHeader,
        lists: content
      }
    },
    // 招聘列表
    {
      path: '/?tab=:tab',
      name: 'job',
      components: {
        nav: cHeader,
        lists: content
      }
    },
    // 全部列表
    {
      path: '/?tab=:tab',
      name: 'all',
      components: {
        nav: cHeader,
        lists: content
      }
    }
  ]
})
