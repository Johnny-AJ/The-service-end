// pages/login/login.js

let http = require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '', //手机号
    password: '', //密码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  phoneInput: function(e) { //失去焦点时获取手机号码
    let phone = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    if (phone.test(e.detail.value)) {
      this.setData({
        phone: e.detail.value
      })
    } else {
      wx.showToast({
        title: '输入手机号有误',
        icon: 'none', //当icon：'none'时，没有图标 只有文字
        duration: 2000
      })
    }


  },
  pswInput: function(e) {

    let str = e.detail.value.replace(/ /g, '') //排空
    if (str) {
      this.setData({
        password: str
      })
    } else {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none', //当icon：'none'时，没有图标 只有文字
        duration: 2000
      })
    }
  },
  goto() {

    let phone = this.data.phone;
    let psw = this.data.password;
    if (phone && psw) {

      http.postRequest('/api/provider/login', {
        password: psw,
        phone: phone
      }, function(res) {
        console.log(res)

        if(res.code==500){
          wx.showToast({
            title: res.msg,
            icon: 'none', //当icon：'none'时，没有图标 只有文字
            duration: 2000
          })
        }else{
          wx.setStorageSync('token', res.msg)
          wx.reLaunch({
            url: '/pages/home/home',
          })
        }
        
      },function(eorr){
     
      })

    } else {
      wx.showToast({
        title: '验证码和手机号都不能为空',
        icon: 'none', //当icon：'none'时，没有图标 只有文字
        duration: 2000
      })
    }
  }

})