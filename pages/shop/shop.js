// pages/shop/shop.js


let http =require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    currPage: 1,
    hasNext: true, //
    loading: false, // 是否显示loading
    hasNext: true,
    getStoreList:[],//门店关管理列表
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getStoreList()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
  },

  onReachBottom: function () { //下拉触发

    var self = this;
    if (!self.data.hasMore) return;
    self.setData({
      currPage: self.data.currPage + 1,
      loading: true
    }, () => {
      self.getStoreList()
    })

  },
  getStoreList() {
    let self = this;
    let prams = {
      currPage: self.data.currPage,
      pageSize: 6
    }
    http.getRequest('/api/provider/store/getStoreList',prams,function(res){

      console.log(res)
      var getStoreList = self.data.getStoreList;
      var productlist1 = [];
      productlist1 = res.data.list,
        getStoreList = [...getStoreList, ...productlist1]

      self.setData({
        loading: false,
        getStoreList,
        hasMore: res.data.list.length == 6,
        hasNext: res.data.hasNext
      })
    })
  },
  handurl(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url + '?storeId=' + e.currentTarget.dataset.storeid
    })
  },

})