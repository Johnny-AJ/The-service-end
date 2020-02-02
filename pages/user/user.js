// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: '',

  },
  handurl(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
  },
  scango() {
    let that = this;
    wx.scanCode({
      success: (res) => {
        var result = res.result;
        let str = result.slice(0, 4);

        if (str == 'http') {
          console.log('555555')
        } else {
          console.log(result, 'str')
          wx.navigateTo({
            url: '/pages/associated/associated?code=' + result,
          })


        }
       
      }
    })
  }
})