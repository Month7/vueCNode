// 客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中：
import { createApp } from './main'
import Vue from 'vue'
const { app,router,store } = createApp();
import Loading from './components/Loading' 

if(window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
// 添加路由钩子函数，用于处理 asyncData.
// 在初始路由 resolve 后执行，
// 以便我们不会二次预取(double-fetch)已有的数据。
// 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
router.onReady(()=>{
  console.log('router ready') 
  Vue.config.devtools = true;
  Vue.filter('filterTime', function (str) {
    if (!str) return ''
    var date = new Date(str)
    var time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
      return ''
    } else if ((time / 1000 < 30)) {
      return '刚刚'
    } else if (time / 1000 < 60) {
      return parseInt((time / 1000)) + '秒前'
    } else if ((time / 60000) < 60) {
      return parseInt((time / 60000)) + '分钟前'
    } else if ((time / 3600000) < 24) {
      return parseInt(time / 3600000) + '小时前'
    } else if ((time / 86400000) < 31) {
      return parseInt(time / 86400000) + '天前'
    } else if ((time / 2592000000) < 12) {
      return parseInt(time / 2592000000) + '月前'
    } else {
      return parseInt(time / 31536000000) + '年前'
    }
  })

  router.beforeResolve((to, from, next) => {
    console.log('beforeResolve触发');
    const matched = router.getMatchedComponents(to);
    const Constructor = Vue.extend(Loading);
    const loading = new Constructor();
    var component = loading.$mount();
    document.getElementById('app').appendChild(component.$el)
    Promise.all(matched.map(c => {
      console.log(c.asyncData);
      if (c.asyncData) {
        return c.asyncData({ store, route: to })
      }
    })).then(() => {
      document.getElementById('app').removeChild(component.$el)
      next()
    }).catch(next)
  })


  // Vue.mixin({
  //   getData(data){
  //     this.loading = false;
  //     this.dispatch('setData',data)
  //   },
  //   beforeMount () {
  //     // console.log('beforeMount调用')
  //     const { asyncData } = this.$options
  //     if (asyncData) {
  //       // 将获取数据操作分配给 promise
  //       // 以便在组件中，我们可以在数据准备就绪后
  //       // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
  //       this.dataPromise = asyncData({
  //         store: this.$store,
  //         route: this.$route,
  //         vm: this
  //       })
  //     }
  //   },
  //   beforeRouteUpdate (to, from, next) {
  //     // console.log('beforeRouteUpdate调用')
  //     const { asyncData } = this.$options
  //     if (asyncData) {
  //       asyncData({
  //         store: this.$store,
  //         route: to
  //       }).then(next).catch(next)
  //     } else {
  //       next()
  //     }
  //   },
  //   beforeRouteLeave(to, from, next){
  //     // console.log('beforeRouteLeave调用')
  //     // console.log(this.$options);
  //     const { asyncData } = this.$options
  //     if (asyncData) {
  //       asyncData({
  //         store: this.$store,
  //         route: to,
  //         vm: this
  //       }).then(next).catch(next)
  //     } else {
  //       // console.log('?asyncData不存在?')
  //       next()
  //     }
  //   }
  // })
  app.$mount('#app')
})

