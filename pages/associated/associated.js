// pages/associated/associated.js

let http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    res: {},
    code:''
  },

  // 省/市/区

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      code: options.code
    },()=>{
      this.findCodeInfo(options.code)
    })
   

  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  findCodeInfo(code) {

    let self = this;
    http.getRequest('/api/store/binding/findCodeInfo', {
      code
    }, function(res) {
      self.setData({
        res: res.data
      })
    })
  },
  // 确认关联
  handleBtn(e) {
    if (e) {

      http.getRequest('/api/store/binding/updateBinding', {
        code: e.currentTarget.dataset.code
      }, function(res) {
        console.log(res)
          if(res.code==0){
            wx.showToast({
              title: '绑定成功',
              icon: 'none',
              duration: 1500,
              success:function(){
                  wx.navigateBack({
                    delta: 1
                  })
              }
            })
          } else if (res.code == 500){
            wx.showToast({
              title: res.msg,
              icon: 'none',
              duration: 1500
            })
          }
      })
    }

  },
})