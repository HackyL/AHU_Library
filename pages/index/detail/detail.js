var app = getApp() //获得全局变量

Page({
  data: {
    flag0: false,
    idx: Math.round(Math.random() * 5),
    BGColor: app.globalData.BGColor
  },
  onLoad: function (options) {
    console.log(options)
    var openid = wx.getStorageSync('openid');
    wx.showLoading({
      title: '详情加载中',
      mask: true,
    })
    var that = this;
    var a = options.book;
    a = a.replace("<", "?");
    a = a.replace('>', "=");
    var temData = JSON.parse(a);
    console.log(temData);
    this.setData({
      a:temData,
    })
    wx.setNavigationBarTitle({
      title: temData.name,
    })

    wx.request({
      url: 'https://windytrees.cn/postInfo.php?uid='+openid+'&nurl=' + temData.nurl,
      data: {

      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        var temBorrow = res.data;
        for (var i = 0; i < temBorrow.length; i++) {
          temBorrow[i].place = temBorrow[i].place.replace(/&nbsp;/g, " ");
          temBorrow[i].status = temBorrow[i].status.replace(/&nbsp;/g, " ");
          temBorrow[i].place = temBorrow[i].place.replace(/\r\n/g, " ");
          temBorrow[i].status = temBorrow[i].status.replace(/\r\n/g, " ");
        }
        var list = temBorrow;
        var ReadyData = [];
        var flag = 0;
        var wdy = {
          title: '',
          sur_name: ''
        };
        for (var i = 0; i < list.length; i++) {
          var az = '';
          for (var j = 0; j < ReadyData.length; j++) {
            if (ReadyData[j].title == list[i]['place']) {
              flag = 1;
              az = j;
              break;
            }
          }
          if (flag == 1) {
            var ab = ReadyData[az];
            ab.sur_name.push(list[i]);
            flag = 0;
          } else if (flag == 0) {
            wdy = {};
            wdy.title = list[i]['place'];
            wdy.sur_name = new Array();
            wdy.sur_name.push(list[i]);
            ReadyData.push(wdy);
          }
        }
        temData.detailData = ReadyData;
        temData.detailNum = list.length;
        
        var username = wx.getStorageSync('username');
        temData.username = username;

        wx.request({
          url: 'https://windytrees.cn/checkFavorite.php',
          data: {
            // username: "E31614029",
            // nurl: "showmarc/table.asp?nTmpKzh=998513",
            username: username,
            nurl: temData.nurl,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          success: function (res3) {
            if (res3.data.message === "Yes") {
              //console.log("已收藏");
              temData.collected = true;
            }
            else {
              //console.log("未收藏");
              temData.collected = false;
            }
          },
          fail: function (res) { },
          complete: function (res) {
            that.setData({
              resultData: temData,
              flag0: true
            })
          },
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { 
        wx.hideLoading();
      }//请求完成后执行的函数
    })

  },

  changeCollect: function (event) {
    var temData = this.data.resultData;
    var username = wx.getStorageSync('username');
    var that = this;
    if (temData.collected === true) {
      console.log('yes');
      wx.request({
        url: 'https://windytrees.cn/DeleteFavorite.php',
        data: {
          username: username,
          nurl: temData.nurl,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          temData.collected=false;
          that.setData({
            resultData:temData,
          })
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1000
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    else {
      console.log("no");
      wx.request({
        url: 'https://windytrees.cn/AddFavorite.php',
        data: {
          //username:"E31614029",
          username: username,
          name: temData.name,
          author: temData.author,
          claim: temData.claim,
          publishdate: temData.publishdate,
          publisher: temData.publisher,
          //nurl: "showmarc/table.asp?nTmpKzh=998513",
          nurl: temData.nurl,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        success: function (res) {
          console.log(res)
          temData.collected = true;
          that.setData({
            resultData: temData,
          })
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 1000
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },
})