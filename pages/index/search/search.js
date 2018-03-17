var hothis = require('../../template/hothis/hothis.js')
var result = require('../../template/result/result.js')
var app = getApp() //获得全局变量

Page({
  //页面的初始数据
  data: {
  },

  onLoad: function () {
    var that = this;
    hothis.init(that, ['红楼梦', 'Java', '挪威的森林', '平凡的世界', '了不起的盖茨比', '穆斯林的葬礼']); //初始化热搜和历史数据
    var color = app.globalData.BGColor;
    var temData = {
      BGColor: color
    }
    this.setData({
      hothisShow: true,
      resultShow: false,
      focused: true,
      resultData: temData,
      nomore:false,
      isErr:false,
    })
  },

  onInput: function (event) {
    var text = event.detail.value;
    if (typeof (text) == "undefined" || text.length == 0) {
      this.setData({
        hothisShow: true,
        resultShow: false,
        isErr:false,
      })
    }
    this.setData({
      searchValue: text,
    });
  },

  onCancel: function (event) {
    this.setData({
      searchValue: "",
      focused: true,
      hothisShow: true,
      resultShow: false,
      isErr:false,
    });
  },

  toResult: function (event) {
    var that = this;
    console.log("search");
    result.showResult(that);
    hothis.addHisKeys(that);
  },

  clearAll: function (event) {
    var that = this;
    hothis.clearAll(that);
  },

  deleteKey: function (event) {
    var that = this;
    hothis.deleteKey(event, that);
  },

  onKeyTap: function (event) {
    var that = this;
    hothis.onKeyTap(event, that);
    result.showResult(that);
    hothis.addHisKeys(that);
  },

  toDetail: function (event) {
    var that = this
    result.toDetail(event, that);
  }, 
  onReachBottom: function () {  //页面上拉触底事件的处理函数
      var temData = this.data.resultData;
      temData.nomore = true;
      this.setData({
        resultData:temData,
      })
  },
})