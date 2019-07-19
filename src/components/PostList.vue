<template v-if="lists && lists.length">
    <div class="all" ref="all">
      <div class="list" v-for="(list,index) in lists" :key="index" ref="lists">
          <div class="author">
              <div class="author-image">
                  <router-link :to="{name:'userinfo',params:{loginname:list.author.loginname}}"><img :src="list.author.avatar_url"/></router-link>
              </div>
              <div>
                  <div>
                      <router-link :to="{name:'userinfo',params:{loginname:list.author.loginname}}">{{list.author.loginname}}</router-link>
                  </div>
              </div>
          </div>
          <div class="title" @click="gotoDetail('article',{id:list.id})">
              <router-link :to="{name:'article',params:{id:list.id}}">{{list.title}}</router-link>
          </div>
          <hr>
          <div class="count" @click="gotoDetail('article',{id:list.id})">
              <div>
                  <i class="glyphicon glyphicon-eye-open"></i>{{list.visit_count}}
              </div>
              <div>
                  <i class="glyphicon glyphicon-comment"></i>{{list.reply_count}}
              </div>
              <div>
                  <i class="glyphicon glyphicon-time"></i>{{list.create_at | filterTime}}
              </div>
          </div>
      </div>
      <div v-show="loadMore" class="loadMore" ref="loadMore">
        <img src="../../static/loading.gif" alt="加载中" />
      </div>
			<Footer status='index'></Footer>
</div>
</template>
<script>
	import axios from 'axios';
	import Footer from './Footer'
  export default {
    name: 'PostList',
		components: {
			Footer
		},
    methods: {
      gotoDetail(name,params){
        this.$router.push({name: name,params: params})
      },
      getNextPage(){
        const body = document.body || document.documentElement;
        const container = this.$refs.all;
        const loadMoreDom = this.$refs.loadMore;
        
        const height = loadMoreDom.offsetHeight
      
        if(container){
          container.addEventListener('touchstart',(e)=>{
            console.log('滚动条位置'+container.scrollTop)
            console.log('touchstart');
            console.log('总长度'+container.scrollHeight);
            this.startY = e.changedTouches[0].clientY;
            const isBottom = container.scrollTop + container.clientHeight >= (container.scrollHeight - height);
            if(isBottom){
              this.backY = container.scrollTop;
              this.loadMore = true;
            }
          })
          container.addEventListener('touchend',(e)=>{
            let tab = this.$route.query.tab || 'all'
            this.endY = e.changedTouches[0].clientY;
            const diffY = this.startY - this.endY;
            const isBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - height
            if(isBottom){
              console.log('isBottom')
              if(diffY > 240) {
                axios({
                  url: `https://cnodejs.org/api/v1/topics?tab=${tab}&page=${this.page}`,
                  method: 'get',
                }).then((res)=>{
                  this.lists.push(...res.data.data)
                  this.$store.dispatch('loadMoreList',res.data.data)
                  this.page += 1;
                  this.loadMore = false;
                  console.log('加载下一页');
                })
              } else {
                  console.log('回到原来的位置');
                  const diffY2 = container.scrollTop - this.backY;
                  var timer = setInterval(()=>{
                    console.log('原来的位置'+this.backY);
                    if(container.scrollTop <= this.backY) {
                      clearTimeout(timer);
                      this.loadMore = false;
                    }
                    container.scrollTop -= Math.floor(diffY2/10);
                  },20)
              }
              // container.scrollTop = 0;
              
            } 
          })
        }
      }
    },
    async asyncData({store, route}){
      let tab = route.query.tab || 'all'
      await axios({
        url: `https://cnodejs.org/api/v1/topics?tab=${tab}`,
        method: 'get',
      }).then((res)=>{
        return store.dispatch('setData',res.data.data)
      })
      return {store,route};
    },
    data () {
      return {
        startY: 0,
        endY: 0,
        lists: this.$store.state.data,
        page: 2,
        loadMore: true,
        backY: 0,
      }
    },
    mounted(){
      this.$store.dispatch('setFooterStatus','index');
      this.getNextPage();
    },
  }
</script>
<style scoped>
@import url('../assets/postlist.css');
.title{
  text-align: left;
}
.loadMore{
  height: 15rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-sizing: border-box!important
}

</style>