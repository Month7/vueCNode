import Vue from 'vue'
import Router from 'vue-router'
const Article = () => import('@/components/Article');
const Create = () => import('@/components/Create');
const Footer = () => import('@/components/Footer');
const cHeader = () => import('@/components/Header');
const Home = () => import('@/components/Home');
const Login = () => import('@/components/Login');
const Message = () => import('@/components/Message');
const PostList = () => import('@/components/PostList');
const Self = () => import('@/components/Self');
const UserInfo = () => import('@/components/UserInfo');

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history', // 注意这里也是为history模式
    routes: [
      {
        path: '/',
        name: 'index',
        components: {
          nav: cHeader,
          lists: PostList
        }
      },{    // 精华列表
        path: '/?tab=:tab',
        name: 'good',
        components: {
          nav: cHeader,
          lists: PostList
        }
      },{    // 分享列表
        path: '/?tab=:tab',
        name: 'share',
        components: {
          nav: cHeader,
          lists: PostList
        }
      },{    // 问答列表
        path: '/?tab=:tab',
        name: 'ask',
        components: {
          nav: cHeader,
          lists: PostList
        }
      },{    // 测试列表
        path: '/?tab=:tab',
        name: 'test',
        components: {
          nav: cHeader,
          lists: PostList
        }
      },{    // 招聘列表
        path: '/?tab=:tab',
        name: 'job',
        components: {
          nav: cHeader,
          lists: PostList
        }
      },{ // 全部列表
        path: '/?tab=:tab',
        name: 'all',
        components: {
          nav: cHeader,
          lists: PostList
        }
      },{
        path: '/article/:id',
        name: 'article',
        components: {
          lists: Article
        }
      },{
        path: '/create',
        name: 'create',
        components: {
          lists: Create
        }
      },{
        path: '/login',
        name: 'login',
        components: {
          lists: Login
        }
      },{
        path: '/message',
        name: 'message',
        components: {
          lists: Message
        }
      },{
        path: '/user/:loginname',
        name: 'userinfo',
        components: {
          lists: UserInfo
        }
      },{
        path: '/self',
        name: 'self',
        components: {
          lists: Self
        }
      }

    ]
  })
}