var app = getApp()

Page({
    data: {
        showNum:[],
        phoneBook:[
         [
            {
                name: "网络服务中心",
                phone: "0551-63861118"
            }, {
                name: "一卡通办公室",
                phone: "0551-63861077"
            }, {
                name: "报警电话",
                phone: "0551-63861110"
            }, {
                name: "校医院24小时值班电话",
                phone: "0551-63861120"
            }, {
                name: "物业办公室",
                phone: "0551-63861044"
            }, {
                name: "物业修缮服务室",
                phone: "0551-63861114"
            }, {
                name: "考试考务中心",
                phone: "0551-63861053"
            }, {
                name: "学生资助管理中心",
                phone: "0551-63861008"
            }, {
                name: "大学生勤俭中心",
                phone: "0551-63861181"
            }, {
                name: "图书馆",
                phone: "0511-63861109"
            }
        ],
        [
            {
                name: "综合办公室",
                phone: "0551-63861005"
            }, {
                name: "考试考务中心",
                phone: "0551-63861053"
            }, {
                name: "教学质量科",
                phone: "0551-63861235"
            }, {
                name: "教学运行中心",
                phone: "0551-63861203"
            }, {
                name: "学籍管理科",
                phone: "0551-63961202"
            }
        ],
        [
            {
                name: "团委办公室",
                phone: "0551-63861121"
            }, {
                name: "创服中心",
                phone: "0551-63861550"
            }, {
                name: "社团联合员会",
                phone: "0551-63861182"
            }, {
                name: "大学生勤俭中心",
                phone: "0551-63861181"
            }, {
                name: "团学宣传中心",
                phone: "0551-63861662"
            }
        ],
        [
            {
                name: "学生思想教育科",
                phone: "0551-63861054"
            }, {
                name: "学生管理科",
                phone: "0551-63861900"
            }, {
                name: "学生资助管理中心",
                phone: "0551-63861008"
            }, {
                name: "就业指导中心",
                phone: "0551-63861355"
            }
        ],
        [
            {
                name: "办公室",
                phone: "0551-63861569"
            }, {
                name: "收费管理课",
                phone: "0551-63861561"
            }
        ],
        [
            {
                name: "办公室",
                phone: "0551-63861224"
            }, {
                name: "户籍室",
                phone: "0551-63861184"
            }, {
                name: "报警电话",
                phone: "0551-63861110"
            }
        ],
        [
            {
                name: "桃园",
                phone: "0551-63861034"
            }, {
                name: "李园",
                phone: "0551-63861037"
            }, {
                name: "桔园",
                phone: "0551-63861036"
            }, {
                name: "枣园",
                phone: "0551-63861218"
            }, {
                name: "榴园",
                phone: "0551-63861217"
            }, {
                name: "杏园",
                phone: "0551-63861219"
            }, {
                name: "松园",
                phone: "0551-63861160"
            }, {
                name: "竹园",
                phone: "0551-63861115"
            }, {
                name: "梅园",
                phone: "0551-63861113"
            }, {
                name: "桂园",
                phone: "0551-63861097"
            }, {
                name: "枫园",
                phone: "0551-63861096"
            }, {
                name: "槐园",
                phone: "0551-63861081"
            }
        ],
        [
            {
                name: "办公室",
                phone: "0551-63861044"
            }, {
                name: "修缮服务室",
                phone: "0551-63861114"
            }
        ],
        [
            {
                name: "24小时值班电话",
                phone: "0551-63861120"
            }, {
                name: "校医疗保障委员会办公室",
                phone: "0551-65108781"
            }
        ]
],
        contentColor:[],
        detailColor:"",
        setWhite:[],
        BGColor: app.globalData.BGColor
    },
    onShow:function(){
        this.setData({
            showNum: this.data.phoneBook[0],
            contentColor:["#B56F79"],
            detailColor:"#B56F79",
            setWhite:["white"]
        })
    },
    makePhoneCall:function(e){
        var detail = e.target.id;
        wx.makePhoneCall({
            phoneNumber: this.data.showNum[detail].phone
        });
        var randomColor = Math.ceil(Math.random() * 5);
    },
    showDetail:function(e) {
        var num = e.target.id.substring(1,2);
        var getColor = this.data.BGColor[Math.ceil(Math.random() * 5)];
        var setWhite = new Array();
        setWhite[num] = "white";
        var contentColor = new Array();
        contentColor[num] = getColor;
        this.setData({
            showNum: this.data.phoneBook[num],
            setWhite:setWhite,
            contentColor:contentColor,
            detailColor:getColor
        })
    }
})