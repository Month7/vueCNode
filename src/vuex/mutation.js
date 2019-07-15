export default {
  addNum(state,num){
    state.num += num;
  },
  setData(state,data){
    state.data = data;
  },
  // 帖子列表
  setList(state,data){
    state.lists = data;
  },
  // 确定底部Footer的状态
  setFooterStatus(state,status){
    state.footerStatus = status;
  },
  // 确定文章详情页内容
  setArticleDetail(state,data){
    state.acticleDeatil = data;
  },
  //
  setMessage(state,data){
    state.messages = data;
  },
  setUserInfo(state,data){
    state.userInfo = data;
  },
  setCreateArticleData(state,data){
    state.createArticleData = data;
  }
} 