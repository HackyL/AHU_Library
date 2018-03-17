var app = getApp() //获得全局变量
Page({
  //页面的初始数据
  data: {
  },

  onLoad: function () {
    console.log("jiazai");
    var newsImg = [];
    var newsAtl = [];
    var that = this;
    wx: wx.request({
      url: 'https://windytrees.cn/GetAllNotice.php',
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
        var temData = res.data.data;
        for (var i = 0; i < temData.length; i++) {
          var x = {};
          x.id = temData[i].id;
          if (temData[i].type == "1") {
            x.url = temData[i].picture;
            newsImg.push(x);
          }
          else {
            if (temData[i].title.length> 14) {
              x.title = temData[i].title.substr(0,14) + '...';
            }
            else{
              x.title = temData[i].title;
            }
            x.date = temData[i].date;
            if(x.title)
              newsAtl.push(x);
          }
        }
      },
      fail: function (res) { },
      complete: function (res) {
        that.setData({
          newsImg: newsImg,
          newsAtl: newsAtl,
        })
      },
    })

  },
  
  addnews:function(event){
    console.log("addnews");
    wx: wx.request({
      url: 'https://windytrees.cn/AddNotice.php',
      data: {
        title: "图书馆2018年寒假开放通知",
        date: "2018-01-09",
        picture: "",
        text: "根据学校《关于2018年元旦、寒假放假安排和做好期末及寒假期间有关工作的通知》，经研究决定，寒假期间（2018年1月15日—2月22日）图书馆在集中开展书刊整理、系统维护和文献清点等内部工作的同时保持部分阅览室对外开放（1月13日、14日双休日不开放）。各阅览室具体开放日期和时间安排如下：",
        type: 2,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) { },
      complete: function (res) {

      },
    })
  },

  deletenews:function(event){
    console.log("addnews");
    wx: wx.request({
      url: 'https://windytrees.cn/DeleteNotice.php',
      data: {
        id:4,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      success: function (res) {
        console.log(res);
      },
      fail: function (res) { },
      complete: function (res) {

      },
    })
  },

  toSearch: function (event) {
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  },

  toNews: function (event) {
    var news_id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/index/news/news?id=' + news_id +'&dd='+"dfd",
    })
  },
})