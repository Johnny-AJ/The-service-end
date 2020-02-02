// pages/details/details.js

let http =require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    waresId:26,
    getWaresInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let self =this;
    this.setData({
      waresId: options.waresId
    },()=>{
      self.getWaresInfo()
    })
  },
  getWaresInfo(){
    let self =this;
    http.getRequest('/api/provider/store/getWaresInfo', { waresId:self.data.waresId},function(res){
      self.setData({
        getWaresInfo:res.data
      })
    })
  },
  change(e){
    wx.navigateTo({
      url: '/pages/Sample_editor/Sample_editor?storeId' + e.currentTarget.dataset.storeid
    })
  },
  del(e){
    
  }
 
})