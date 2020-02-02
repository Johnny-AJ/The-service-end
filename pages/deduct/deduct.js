// pages/deduct/deduct.js
let http =require('../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: ["提成明细", "待结算提成", "提现记录"],
    currentIndex: '0',
    profile:[],//提成明细、
    record: [],//待结算提成
    hasNext: true, //下拉是否还有数据
    loading: false, // 是否显示loading
    currPage: 1,//页码
    hasMore: false,//返回来的数据是否为5
    hasNext1: true, //下拉是否还有数据
    loading1: false, // 是否显示loading
    currPage1: 1,//页码
    hasMore1: false,//返回来的数据是否为5
    balance:''
  },
  handTab(e) {//切换tabs栏

    let self =this;
    if (self.data.currentIndex == e.currentTarget.dataset.aa) return;//点击tbs栏市如果重复点击相同的时候就退出
    this.setData({
      currentIndex: e.currentTarget.dataset.aa
    })
   
   
    switch (e.currentTarget.dataset.aa){
      case 0 :
      self.profile()
      break;
      case 1:
        self.record()
     break;
    }
   
    self.setData({  //重置数据
      profile: [],//提成明细、
      record: [],//待结算提成
      hasNext: true, //下拉是否还有数据
      loading: false, // 是否显示loading
      currPage: 1,//页码
      hasMore: false,//返回来的数据是否为5
      hasNext1: true, //下拉是否还有数据
      loading1: false, // 是否显示loading
      currPage1: 1,//页码
      hasMore1: false//返回来的数据是否为5
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.profile();
    this.findBalance();
  },
  profile() {//已结算订单
    let self =this;
    let prams={
      currPage:self.data.currPage,
      pageSiz:5

    }
    http.getRequest('/api/server/detail/payEarningList',prams,function(res){
      let arr =[];
      let profile = self.data.profile;
      arr = res.data.data.list;
      profile = [...arr,...profile]
        self.setData({
          profile,
          loading: false,
          hasMore: res.data.data.list.length == 5,
          hasNext: res.data.data.hasNext
        })

    })
  },
  record() {//待结算订单
    let self = this;
    let prams = {
      currPage: self.data.currPage1,
      pageSiz: 5

    }
    http.getRequest('/api/server/detail/waitEarningList', prams, function (res) {
    
      let arr = [];
      let record = self.data.record;
      arr = res.data.data.list;
      record = [...arr, ...record]
      self.setData({
        record,
        loading1: false,
        hasMore1: res.data.data.list.length == 5,
        hasNext1: res.data.data.hasNext
      })

    })
  },
  findBalance(){
    let self =this;
    http.getRequest('/api/server/detail/findBalance',{},function(res){
      
      self.setData({
        balance: res.data.data.balance
      })
    })
  },
  onReachBottom: function () {//滚动加载
    var self = this;

    if (self.data.currentIndex == 0){//判断是否为
      if (!self.data.hasMore) return;
      self.setData({
        currPage: self.data.currPage + 1,
        loading: true
      }, () => {
        self.profile()
      })
    } else if (self.data.currentIndex == 1){
      if (!self.data.hasMore1) return;
      self.setData({
        currPage1: self.data.currPage1 + 1,
        loading1: true
      }, () => {
        self.record()
      })
    }
    
  },




})