import Vue from 'vue'
import Router from 'vue-router'
import cHeader from '../components/Header.vue'
import allList from '../components/Index/AllList.vue'
import goodList from '../components/Index/Good.vue'
import shareList from '../components/Index/Share.vue'
import askList from '../components/Index/Ask.vue'
import jobList from '../components/Index/Job.vue'
import testList from '../components/Index/Test.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 主页
    {
      path: '/',
      name: 'index',
      components: {
        nav: cHeader,
        lists: allList
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
      path: '/?tab=good',
      name: 'good',
      components: {
        nav: cHeader,
        lists: goodList
      }
    },
    // 分享列表
    {
      path: '/?tab=share',
      name: 'share',
      components: {
        nav: cHeader,
        lists: shareList
      }
    },
    // 问答列表
    {
      path: '/?tab=ask',
      name: 'ask',
      components: {
        nav: cHeader,
        lists: askList
      }
    },
    // 测试列表
    {
      path: '/?tab=test',
      name: 'test',
      components: {
        nav: cHeader,
        lists: testList
      }
    },
    // 招聘列表
    {
      path: '/?tab=job',
      name: 'job',
      components: {
        nav: cHeader,
        lists: jobList
      }
    },
    // 全部列表
    {
      path: '/all',
      name: 'all',
      components: {
        nav: cHeader,
        lists: allList
      }
    }
  ]
})
