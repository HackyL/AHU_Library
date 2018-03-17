// 定义数据格式

/***
 * hothisData:{
 *   hotKeys:[],
 *   hisKeys:[],
 * }
 * "wxSearchData":{
 *  configconfig:{
 *    style: "wxSearchNormal"
 *  },
 *  view:{
 *    hidden: true,
 *    searchbarHeght: 20
 *  }
 *  keys:[],//自定义热门搜索
 *  his:[]//历史搜索关键字
 *  value
 * }
 * 
 */
function init(that, hotKeys) {
  var temData = {};
  temData.hotKeys = hotKeys;;
  try {
    var hisValue = [];
    hisValue = wx.getStorageSync('hisKeys')
    if (hisValue) {
      // Do something with return value
      temData.hisKeys = hisValue;
    }
  } catch (e) {
    // Do something when catch error
  }
  that.setData({
    hothisData: temData
  });
}

function addHisKeys(that) {
  console.log("addd");
  var text = that.data.searchValue;
  if (typeof (text) == "undefined" || text.length == 0) { return; }
  var hisValue = wx.getStorageSync('hisKeys');
  if (hisValue) {
    if (hisValue.indexOf(text) < 0) {
      hisValue.unshift(text);
    }
  }
  else {
    var hisValue = [];
    hisValue.push(text);
  }
  wx.setStorage({
    key: "hisKeys",
    data: hisValue,
    success: function () {
      var temData = that.data.hothisData;
      temData.hisKeys = hisValue;
      that.setData({
        hothisData: temData
      })
    }
  })
}

function clearAll(that) {
  wx.showModal({
    title: '提示',
    content: '确定删除全部历史记录？',
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        wx.removeStorage({
          key: 'hisKeys',
          success: function (res) {
            var value = [];
            var temData = that.data.hothisData;
            temData.hisKeys = [];
            that.setData({
              hothisData: temData
            });
          }
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

function deleteKey(event, that) {
  var text = event.target.dataset.key;
  var hisValue = wx.getStorageSync('hisKeys');
  var id = hisValue.indexOf(text);
  hisValue.splice(id, 1);
  wx.setStorage({
    key: "hisKeys",
    data: hisValue,
    success: function () {
      var temData = that.data.hothisData;
      temData.hisKeys = hisValue;
      that.setData({
        hothisData: temData
      })
    }
  })
}

function onKeyTap(e, that, callBack) {
  //回调
  var value = e.target.dataset.key;
  that.setData({
    searchValue: value,
  });
  if (typeof (callBack) == "function") {
    callBack();
  }
}

module.exports = {
  init: init,
  addHisKeys: addHisKeys,
  clearAll: clearAll,
  deleteKey: deleteKey,
  onKeyTap: onKeyTap
}