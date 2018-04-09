const app = getApp();

Page({
    data:{
        touchStartTime: 0,
        touchEndTime: 0,
        lastTapTime: 0,
        lastTapTimeoutFunc: null,
        frontColor:"white",
        rearColor:"white"
    },
    onShow:function () {
        var that = this;
        var dd = new Date();
        var todayDayShow = "日一二三四五六".charAt(dd.getDay());
        var m = dd.getMonth()+1;
        var todayDateShow = dd.getFullYear() + "-" + m + "-" + dd.getDate();
        dd.setDate(dd.getDate()+1);
        var tomorrowDayShow = "日一二三四五六".charAt(dd.getDay());
        m = dd.getMonth()+1;
        var tomorrowDateShow = dd.getFullYear() + "-" + m + "-" + dd.getDate();
        that.setData({
            todayDay:todayDayShow,
            todayDate:todayDateShow,
            tomorrowDay:tomorrowDayShow,
            tomorrowDate:tomorrowDateShow
        });
        var currentTime = Date.now();
        var targetTime = (new Date(2012, 8, 1, 0, 0, 0)).getTime();//2012-9-1
        var offsetTime = currentTime - targetTime;
        var offsetDays = Math.floor(offsetTime / (3600 * 24 * 1e3));
        var bathFlag = offsetDays % 2;
        this.bathFlag = bathFlag;
        if(bathFlag){
            that.setData({
                front:"男生",
                rear:"女生"
            })
        }else{
            that.setData({
                front:"女生",
                rear:"男生"
            });
        }
        var sex = wx.getStorageSync('gender');
        if(sex == 1){
            if(bathFlag){
                that.setData({
                    frontColor:"#ee1375",
                    rearColor:"white"
                })
            }
            else{
                that.setData({
                    frontColor:"white",
                    rearColor:"#ee1375"
                })
            }
        }
        else if(sex == 2){
            if(!bathFlag){
                that.setData({
                    frontColor:"#ee1375",
                    rearColor:"white"
                })
            }
            else{
                that.setData({
                    frontColor:"white",
                    rearColor:"#ee1375"
                })
            }
        }
        else{
            that.setData({
                frontColor:"white",
                rearColor:"white"
            })
        }
    },
    touchStart: function(e) {
        this.touchStartTime = e.timeStamp
    },
    touchEnd: function(e) {
        this.touchEndTime = e.timeStamp
    },
    onTap: function(e) {
        var that = this;
        // 控制点击事件在350ms内触发，加这层判断是为了防止长按时会触发点击事件
        if (that.touchEndTime - that.touchStartTime < 350) {
            // 当前点击的时间
            var currentTime = e.timeStamp;
            var lastTapTime = that.lastTapTime;
            // 更新最后一次点击时间
            that.lastTapTime = currentTime;

            // 如果两次点击时间在300毫秒内，则认为是双击事件
            if (currentTime - lastTapTime < 300) {
                console.log("double tap");
                clearTimeout(that.lastTapTimeoutFunc);
                if(app.globalData.userInfo.gender != null){
                    var sex = wx.getStorageSync('gender');
                    var judge = wx.getStorageInfoSync();
                    if(judge.keys.indexOf('gender') == -1){
                        sex = 0;
                        wx.showModal({
                            title: '哎呀！被你发现了',
                            content: '双击开启/关闭所在浴室高亮 \n 如果不对，请长按设置',
                            showCancel: false
                        })
                    }
                    if(sex == 0){
                        sex = app.globalData.userInfo.gender;
                        wx.setStorageSync('gender',sex);
                        if(sex == 1){
                            if(that.bathFlag){
                                that.setData({
                                    frontColor:"#ee1375",
                                    rearColor:"white"
                                })
                            }
                            else{
                                that.setData({
                                    frontColor:"white",
                                    rearColor:"#ee1375"
                                })
                            }
                        }
                        else if(sex == 2){
                            if(!that.bathFlag){
                                that.setData({
                                    frontColor:"#ee1375",
                                    rearColor:"white"
                                })
                            }
                            else{
                                that.setData({
                                    frontColor:"white",
                                    rearColor:"#ee1375"
                                })
                            }
                        }
                        else{
                            that.setData({
                                frontColor:"white",
                                rearColor:"white"
                            })
                        }
                        wx.showToast({
                            title: '高亮显示开启',
                            icon: 'success',
                            duration: 1200
                        })
                    }
                    else{
                        wx.setStorageSync('gender',0);
                        that.setData({
                            frontColor:"white",
                            rearColor:"white"
                        });
                        wx.showToast({
                            title: '高亮显示关闭',
                            icon: 'success',
                            duration: 1200
                        })
                    }
                }
            }
        }
    },
    longTap: function(e) {
        var that = this;
        if(wx.getStorageSync('gender')){
            wx.showActionSheet({
                itemList: ['我是小哥哥', '我是小姐姐'],
                success: function(res) {
                    var sex = res.tapIndex + 1;
                    wx.setStorageSync('gender', sex);
                    if(sex == 1){
                        if(that.bathFlag){
                            that.setData({
                                frontColor:"#ee1375",
                                rearColor:"white"
                            })
                        }
                        else{
                            that.setData({
                                frontColor:"white",
                                rearColor:"#ee1375"
                            })
                        }
                    }
                    else if(sex == 2){
                        if(!that.bathFlag){
                            that.setData({
                                frontColor:"#ee1375",
                                rearColor:"white"
                            })
                        }
                        else{
                            that.setData({
                                frontColor:"white",
                                rearColor:"#ee1375"
                            })
                        }
                    }
                },
                fail: function(res) {
                    console.log(res.errMsg)
                }
            })
        }
    }
})