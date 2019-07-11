// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { createRouter } from './router/index'
import { createStore } from './vuex/store'
import { sync } from 'vuex-router-sync'

Vue.config.productionTip = false



export function createApp(){
  const router = createRouter();
  const store = createStore();
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app,router,store }
}

