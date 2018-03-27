Page({
    data:{

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
        if(bathFlag){
            that.setData({
                front:"男生",
                rear:"女生"
            })
        }else{
            that.setData({
                front:"女生",
                rear:"男生"
            })
        }
    }
})