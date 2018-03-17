//获取图书列表
function showResult(that) {
  wx.showLoading({
    title: '图书加载中',
    mask: true,
  })
  wx.getNetworkType({
    success: function (res) {
      if (res.networkType == "none") {
        wx.hideLoading();
        that.setData({
          hothisShow: false,
          resultShow: false,
          isErr: true,
        })
      }
      else {
        wx.request({
          url: 'https://windytrees.cn/postSearch.php',
          data: {
            keyword: that.data.searchValue,
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: "POST",
          success: function (res) {
            //console.log(res);
            if (res.data.data == null) {
              wx.hideLoading();
              that.setData({
                hothisShow: false,
                resultShow: false,
                isErr: false,
                isNull: true
              })
            }
            else {
              var temData = that.data.resultData;
              var len = res.data.data.length;
              var randColor = [];
              for (var i = 0; i < len; i++) {
                randColor[i] = Math.ceil(Math.random() * 5);
                res.data.data[i].author = formatStr(res.data.data[i].author);
                res.data.data[i].claim = formatStr(res.data.data[i].claim);
                res.data.data[i].name = formatStr(res.data.data[i].name);
                res.data.data[i].publishdate = formatStr(res.data.data[i].publishdate);
                res.data.data[i].publisher = formatStr(res.data.data[i].publisher);
              }
              //res.data.data = res.data.data.slice(0, 10);
              temData.bookList = res.data.data;
              temData.randColor = randColor;
              temData.nomore = false;
              wx.hideLoading();
              that.setData({
                hothisShow: false,
                resultShow: true,
                resultData: temData,
              })
            }

          },
          fail: function (err) {

          },//请求失败
          complete: function () { }//请求完成后执行的函数
        })
      }
    },
    fail: function (err) {

    },//请求失败
    complete: function () {

    }//请求完成后执行的函数
  })
  /*
  var network = wx.getStorageSync('network');
  if(network){
    wx.request({
      url: 'https://windytrees.cn/postSearch.php',
      data: {
        keyword: that.data.searchValue,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: "POST",
      success: function (res) {
        console.log(res);
        var temData = that.data.resultData;
        var len = res.data.data.length;
        var randColor = [];
        for (var i = 0; i < len; i++) {
          randColor[i] = Math.ceil(Math.random() * 5);
          res.data.data[i].author = formatStr(res.data.data[i].author);
          res.data.data[i].claim = formatStr(res.data.data[i].claim);
          res.data.data[i].name = formatStr(res.data.data[i].name);
          res.data.data[i].publishdate = formatStr(res.data.data[i].publishdate);
          res.data.data[i].publisher = formatStr(res.data.data[i].publisher);
        }
        //res.data.data = res.data.data.slice(0, 10);
        temData.bookList = res.data.data;
        temData.randColor = randColor;
        temData.nomore = false;
        wx.hideLoading();
        that.setData({
          hothisShow: false,
          resultShow: true,
          resultData: temData,
        })
      },
      fail: function (err) {

      },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  }
  else{
    wx.hideLoading();
    that.setData({
      hothisShow: false,
      resultShow: false,
      isErr: true,
    })
  }
  */
}

//获取图书详情
function toDetail(event, that) {

  var book_id = event.currentTarget.dataset.id;
  var a = that.data.resultData.bookList[book_id];
  a.color = that.data.resultData.BGColor[book_id];
  var temData = JSON.stringify(a);

  //注意，传参时？和=会有特别处理，为了数据不改变，临时替换掉？和=

  temData = temData.replace('?', "<");
  temData = temData.replace('=', ">");
  temData = temData.replace('&', "");

  wx.navigateTo({
    url: '/pages/index/detail/detail?book=' + temData,
  })
}

//格式化输出
function formatStr(str) {
  str = str.replace(/;/g, " ");
  str = str.replace(/&nbsp/g, " ");
  str = str.replace(/&nbsp;/g, " ");
  str = str.replace(/<br>/g, " ");
  str = str.replace(/\r\n/g, " ");
  str = str.replace(/&#183;/g, "·");
  str = str.replace(/&#183/g, "·");
  str = str.replace(/&nb/g, "·");
  return str
}

module.exports = {
  toDetail: toDetail,
  showResult: showResult
}