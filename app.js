//app.js
App({
  onLaunch: function () {  //x
    // 展示本地存储能力
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    wx.login({  //登录
      success: function (res) {
        wx.request({
          url: 'https://windytrees.cn/getOpenid.php?code=' + res.code,
          data: {
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res1) {
            var openid = res1.data;
            wx.setStorageSync('openid', openid);
            wx.request({     //检测是否绑定
              url: 'https://windytrees.cn/tied.php?uid=' + openid,
              data: {
              },
              header: {
                'content-type': 'application/json'
              },
              success: function (res2) {
                if (res2.data.code == 1) {  //已绑定
                  var username = res2.data.username;
                  wx.setStorageSync('username', username);
                }
              }
            });
          }
        })
      }
    })

    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        if (res.networkType == "none") {
          wx.setStorageSync('network', false);
        }
        else {
          wx.setStorageSync('network', true);
        }
      },
      fail: function (err) {

      },//请求失败
      complete: function () {

      }//请求完成后执行的函数
    })

    wx.getSetting({  //获取用户信息
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function (res) {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        else {
          wx.authorize({    //授权
            scope: 'scope.userInfo',
            success() {
              wx.getUserInfo({
                success: function (res) {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })
  },
  onShow: function () {
    // Do something when show.
  },
  onHide: function () {
    // Do something when hide.
  },
  onError: function (msg) {
    console.log(msg)
  },
  globalData: {
    BGColor: [
      "#B56F79",
      "#99a8bf",
      "#91b8b3",
      "#8ab1ce",
      "#c9b68b",
      "#babcbb",
    ],
    userInfo: null
  }
})