// pages/Sample_editor/Sample_editor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  handleImg(e) { //图片点击事件
    // console.log(e)
    // this.isshow =!this.isshow; 
    this.setData({
      isshow: !this.data.isshow
    })
    // this.$apply();
    // console.log(this.data.isshow)
  },
})