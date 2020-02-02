// pages/stores/stores.js

let http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ["门店信息", "展品管理"],
    currentIndex: '0',
    storeId: 26,
    currPage: 1,
    getStoreInfo: {}, //门店详细
    getWaresList: [], //可选商品列表
    hasNext: true, //
    loading: false, // 是否显示loading
    hasNext: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      storeId: options.storeId
    },()=>{
      this.getStoreInfo();
      this.getWaresList();
    })
   
  },

  onReachBottom: function() { //下拉触发
    var self = this;
    if (self.data.currentIndex == 1) {//判断是点击展品管理
      if (!self.data.hasMore) return;
      self.setData({
        currPage: self.data.currPage + 1,
        loading: true
      }, () => {
        self.getWaresList()
      })
    }

  },
  handTab(e) {
    // console.log(e)
    this.setData({
      currentIndex: e.currentTarget.dataset.aa
    })
  },
  getStoreInfo() {//门店详细
    let self = this;
    http.getRequest('/api/provider/store/getStoreInfo', {
      storeId: self.data.storeId
    }, function(res) {
      self.setData({
        getStoreInfo: res.data
      })

    })
  },
  getWaresList() {//请求可选商品列表
    let self = this;
    let prams = {
      currPage: self.data.currPage,
      pageSize: 4,
      storeId: self.data.storeId
    }
    http.getRequest('/api/provider/store/getWaresList', prams, function(res) {
      let getWaresList = self.data.getWaresList;
      let arr = [];
        arr = res.data.list;
      getWaresList = [...getWaresList, ...arr];

      for (var i = 0; i < getWaresList.length;i++){
        getWaresList[i].text="正常使用";
        if (getWaresList[i].status==1){
          getWaresList[i].text = "保修中";
        }
      }
      self.setData({
        getWaresList,
        loading: false,
        hasMore: res.data.data.list.length == 4,
        hasNext: res.data.data.hasNext
      })

    })
  },
  goto(e){
    wx.navigateTo({
      url: '/pages/details/details?waresId' + e.currentTarget.dataset.id
    })
  },
  add(e){
    wx.navigateTo({
      url: '/pages/Sample_editor1/Sample_editor1?storeId' + e.currentTarget.dataset.storeid
    })
  }
})