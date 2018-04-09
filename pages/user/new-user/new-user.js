const app = getApp()

Page({
  data: {
    hacky: false,   //个人信息开关
    userInfo: {},   //用户微信信息
    hasUserInfo: false,   //微信登录开关
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onShow: function () {   //初始加载
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = function (res) {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: function (res) {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
  },
  getUserInfo: function (e) {  //获取用户信息
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      });
      wx.login({  //登录
        success: function (res) {
          console.log(res.errMsg);
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
                    wx.setStorageSync('openid', openid);
                    wx.setStorageSync('username', username);
                  }
                }
              });
            },

          })
        }
      })
    }
  },
  aboutus: function() {       //关于我们
    wx.showModal({
      title: '关于我们',
      content: "图书馆技术团队 \n 校园服务平台项目组",
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
        } 
      }
    })
  },
  joinus: function () {       //加入我们
    wx.showModal({
      title: '加入我们',
      content: "如果您对微信小程序开发怀有兴趣和学习热情，请联系QQ：741860506",
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
        }
      }
    })
  },
    onLib:function(){
        if (!wx.getStorageSync('openid')) {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '您尚未登录！',
                success: function (res) {
                    if (res.confirm)
                        console.log('用户点击确定')
                }
            });
        }
        else{
          wx.navigateTo({
            url: '/pages/user/binding/binding'
          })
        }
    }
})