const app = getApp()

Page({
  data: {
    isErr: false,
    flag: 3,         //绑定信息开关
    user: '',       //图书馆账号用户名
    pw: ''         //图书馆账号密码
  },
  onLoad: function () {   //进入页面即加载
    var that = this;
    var tied = wx.getStorageSync('tied');
    var openid = wx.getStorageSync('openid');
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        if (res.networkType == "none") {
          wx.hideLoading();
          that.setData({
            flag: 3,
            isErr: true
          })
        }
        else{
          wx.showLoading({
              title: '正在为您检测认证信息',
              mask: true,
          });
          wx.request({     //检测是否绑定
            url: 'https://windytrees.cn/tied.php?uid=' + openid,
            data: {
            },
            header: {
              'content-type': 'application/json'
            },
            success: function (res1) {
              wx.hideLoading();
              if (res1.data.code == 1) {  //已绑定
                that.setData({
                  flag: 1
                });
                wx.redirectTo({
                  url: '../lib/lib',
                })
              }
              else {  //未绑定
                that.setData({
                  flag: 2
                });
                wx.showModal({
                  title: '',
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
    });
      wx.getSetting({  //获取用户信息
          success: function (res) {
              if (!res.authSetting['scope.userInfo']) {
                  wx.showModal({
                      title: '提示',
                      showCancel: false,
                      content: '您尚未登录',
                      success: function (res) {
                          if (res.confirm) {
                              wx.redirectTo({
                                  url: "../new-user/new-user"
                              })
                          }
                      }
                  })
              }
          }
      })
  },
  onReady:function(){

    },
  searchBox: function (e) {  //获取输入框中的用户名和密码
    var that = this;
    that.setData({
      user: e.detail.value.user,
      pw: e.detail.value.pw
    })
  },
  login: function () {  //图书馆账号绑定
    var that = this;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: 'https://windytrees.cn/bangding.php',
      data: {
        uid: openid,
        pw: that.data.pw,
        user: that.data.user
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code == 1) {   //绑定成功
          that.setData({
            flag: 1,
          })
        }
        else if(res.data.code == 0) {
          wx.showModal({
            title: '提示',
            showCancel: false,
            content: '您的账号密码输入有误，请重新输入!',
            success: function (res) {
              //
            }
          })
        }
      }
    });
  },
})