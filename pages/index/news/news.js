// pages/news/news.js
Page({
  data: {
  },
  onLoad: function (options) {
    var news = null;
    var news_id = options.id;
    var that = this;
    wx: wx.request({
      url: 'https://windytrees.cn/GetNotice.php',
      data: {
        id: news_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        news = res.data.data[0];
      },
      fail: function (res) { },
      complete: function (res) {
        that.setData({
          news: news,
        })
      },
    })
  },
  onReachBottom: function () {
      console.log("jiazaigenduo");
  },
})