var tmpList = require('../../common/list.js')
Page({
    data: {
        showResultList:[],
        alwaysList: ['水果', '蔬菜', '键盘', '面膜', '电池', '纸巾', '猫砂', '头发', '衣服', '剩菜剩饭','饮料瓶','火锅渣','尿不湿','快递包装袋'],
        keyName:'',
    },
    onLoad:function(options){
        if (options.keyWord){
            this.setData({
                keyName: options.keyWord
            })
            this.getDataFn(options.keyWord)
        }
    },
    getMsgFn: function (e) {
        var name = ''
        var type = e.currentTarget.dataset.type
        if(type == 1){
            name = e.detail.value
        } else if (type == 2){
            name = e.currentTarget.dataset.name
        }
        this.setData({
            keyName:name
        })
        this.getDataFn(name)
    },
    getDataFn:function(name){
        if (name.length > 0) {
            var tmpSHowList = []
            for (var i = 0; i < tmpList.length; i++) {
                if (tmpList[i].name.indexOf(name) != -1) {
                    tmpSHowList.push(tmpList[i])
                }
            }
            if (tmpSHowList.length > 0) {
                this.setData({
                    showResultList: tmpSHowList,
                    keyName: name
                })
            }
        } else {
            this.setData({
                showResultList: []
            })
        }
    },
    clearKeyname:function(){
        var _this = this
        setTimeout(function () {
            _this.setData({
                keyName: '',
                showResultList: [],
            })
        }, 100)
    },
    onShareAppMessage(res) {
        return {
            title: '垃圾应该怎么分类？来查一下吧。',
            path: '/pages/index/index',
            imageUrl: '/images/share.png'
        }
    }
})