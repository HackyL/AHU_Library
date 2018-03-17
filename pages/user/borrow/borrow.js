const app = getApp()

Page({
  data: {
    flag1: 0,   //借阅信息开关
    idx: Math.round(Math.random() * 5),
    text: [],       //借阅信息数据 
    hacky: false,   //个人信息开关
    delay: [],
    BGColor: app.globalData.BGColor
  },
  onLoad: function () {   //初始加载
    var that = this;
    var openid = wx.getStorageSync('openid');
    wx.showLoading({
      title: '借阅加载中',
      mask: true,
    })
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        if (res.networkType == "none") {
          wx.hideLoading();
          that.setData({
            flag1: 3,
            isErr: true
          })
        }
        else {
          wx.request({     //检测是否绑定
            url: 'https://windytrees.cn/tied.php?uid=' + openid,
            data: {
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res1) {
              if (res1.data.code == 1) {  //已绑定
                that.setData({
                  hacky: true
                });
                wx.request({  //查询当前已借阅的书籍
                  url: 'https://windytrees.cn/currentBook.php?uid=' + openid,
                  data: {
                  },
                  header: {
                    'content-type': 'application/json'
                  },
                  success: function (res2) {  //输出显示当前已借阅书籍
                    wx.hideLoading();
                    var temData = res2.data.data;
                    for (var i = 0; i < temData.length; i++) {
                      temData[i].name = temData[i].name.replace(/&nbsp;/g, "");
                    }
                    if (res2.data.code == 1) { //有借阅书籍
                      that.setData({
                        flag1: 2,
                        text: temData
                      });
                    }
                    else {
                      that.setData({
                        flag1: 1,
                      });
                    }
                  }
                });
              }
              else {  //未绑定
                wx.showModal({
                  title: '提示',
                  showCancel: false,
                  content: '您尚未绑定图书馆账号，请尽快绑定（密码默认是学号哦）',
                  success: function (res) {
                    if (res.confirm)
                      console.log('用户点击确定')
                  }
                })
              }
            }
          });
        }
      },
      fail: function (err) {

      },//请求失败
      complete: function () {

      }//请求完成后执行的函数
    })
  },
  xujie: function () {   //一键续借
    var that = this;
    var openid = wx.getStorageSync('openid');
    var delay = [];
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: '所有图书续借成功\n（已续借的不能再续借）',
      success: function (res) {
        if (res.confirm)
          console.log('用户点击确定')
      }
    })
    for(var i=0 ;i<that.data.text.length ;i++) {
      delay.push(that.data.text[i].delay);
    }
    for (var i = that.data.text.length; i < 5; i++) {
      delay.push(0);
    }
    wx.request({ 
      url: 'https://windytrees.cn/xujie.php',
      data: {
        openid: openid,
        A: 'http://210.45.210.6' + delay[0],
        B: 'http://210.45.210.6' + delay[1],
        C: 'http://210.45.210.6' + delay[2],
        D: 'http://210.45.210.6' + delay[3],
        E: 'http://210.45.210.6' + delay[4]
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res2) {
      }
    })
  }
})