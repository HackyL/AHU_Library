var result = require('../../template/result/result.js')
const app = getApp()

Page({
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    var that = this;
    var openid = wx.getStorageSync('openid');
    wx.showLoading({
      title: '收藏加载中',
      mask: true,
    })
    wx.request({     //检测是否绑定
      url: 'https://windytrees.cn/tied.php?uid=' + openid,
      data: {
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res1) {
        if (res1.data.code == 1) {  //已绑定
          wx.request({  //查询当前已收藏的书籍
            url: 'https://windytrees.cn/GetFavorite.php',
            data: {
              username: res1.data.username
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res2) {  //输出显示当前已收藏书籍
              wx.hideLoading();
              if (res2.data.code == 1) { //有收藏书籍
                var temData = res2.data.data;
                for (var i = 0; i < temData.length; i++) {
                  temData[i].bookid = i;
                  temData[i].flag = 'collect_on';
                  temData[i].name = temData[i].name.replace(/&nbsp;/g, " ");
                  temData[i].author = temData[i].author.replace(/&nbsp;/g, " ");
                  temData[i].publisher = temData[i].publisher.replace(/&nbsp;/g, " ");
                  temData[i].publishdate = temData[i].publishdate.replace(/&nbsp;/g, " ");
                  temData[i].claim = temData[i].claim.replace(/\r\n/g, " ");
                  temData[i].claim = temData[i].claim.replace(/&nbsp;/g, " ");
                }
                that.setData({
                  flag2: 2,
                  array: temData
                });
              }
              else {
                that.setData({
                  flag2: 1,
                });
              }
            }
          })
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
  },
  data: {
    isErr: false,
    flag2: 0,       //我的收藏开关
    array: [],      //我的收藏数据
    hacky: false,   //个人信息开关
    userInfo: {},   //用户微信信息
    BGColor: app.globalData.BGColor
  },
  onLoad: function () {   //初始加载
    var that = this;
    var openid = wx.getStorageSync('openid');
    wx.showLoading({
      title: '收藏加载中',
      mask: true,
    })
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        if (res.networkType == "none") {
          wx.hideLoading();
          that.setData({
            flag2: 3,
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
                wx.request({  //查询当前已收藏的书籍
                  url: 'https://windytrees.cn/GetFavorite.php',
                  data: {
                    username: res1.data.username
                  },
                  method: 'POST',
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res2) {  //输出显示当前已收藏书籍
                    wx.hideLoading();
                    if (res2.data.code == 1) { //有收藏书籍
                      var temData = res2.data.data;
                      for (var i = 0; i < temData.length; i++) {
                        temData[i].bookid = i;
                        temData[i].flag = 'collect_on';
                        temData[i].name = temData[i].name.replace(/&nbsp;/g, " ");
                        temData[i].author = temData[i].author.replace(/&nbsp;/g, " ");
                        temData[i].publisher = temData[i].publisher.replace(/&nbsp;/g, " ");
                        temData[i].publishdate = temData[i].publishdate.replace(/&nbsp;/g, " ");
                        temData[i].claim = temData[i].claim.replace(/\r\n/g, " ");
                        temData[i].claim = temData[i].claim.replace(/&nbsp;/g, " ");
                      }
                      that.setData({
                        flag2: 2,
                        array: temData
                      });
                    }
                    else {
                      that.setData({
                        flag2: 1,
                      });
                    }
                  }
                })
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
  change: function (event) {
    var that = this;
    var idx = event.currentTarget.dataset.id;
    var username = wx.getStorageSync('username');
    if (that.data.array[idx].flag == 'collect_on') {   //取消收藏
      wx.request({
        url: 'https://windytrees.cn/DeleteFavorite.php',
        data: {
          username: username,    //图书馆账号用户名
          nurl: that.data.array[idx].nurl,
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1000
          })
        }
      });
      var temData = that.data.array;
      temData[idx].flag = 'collect_off';
      that.setData({
        array: temData
      });
    }
    else if (that.data.array[idx].flag == 'collect_off') {  //添加收藏
      wx.request({
        url: 'https://windytrees.cn/AddFavorite.php',
        data: {
          username: username,
          name: that.data.array[idx].name,
          author: that.data.array[idx].author,
          claim: that.data.array[idx].claim,
          publishdate: that.data.array[idx].publishdate,
          publisher: that.data.array[idx].publisher,
          nurl: that.data.array[idx].nurl,
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
      var temData = that.data.array;
      temData[idx].flag = 'collect_on';
      that.setData({
        array: temData
      });
    }
  },
  toDetail:function(event) {
    console.log(event);
    var that = this;
    var id = event.currentTarget.dataset.id;
    var book = this.data.array[id];
    book.color = that.data.BGColor[id%6];
    var temData = JSON.stringify(book);
    temData = temData.replace('?', "<");
    temData = temData.replace('=', ">");
    temData = temData.replace('&', "");
    wx.navigateTo({
      url: "/pages/index/detail/detail?book=" + temData,
    })
  }
})