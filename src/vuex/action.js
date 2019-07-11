export default {
  addNum({commit},num){

    commit('addNum',num)
  },
  setData({commit},data){
    commit('setData',data)
  },
  // 帖子列表
  setLists({commit},data){
   commit('setList',data) 
  },
  // 
  setFooterStatus({commit},status){
    commit('setFooterStatus',status)
  },
  setArticleDetail({commit},status){
    commit('setArticleDetail',status)
  }
}