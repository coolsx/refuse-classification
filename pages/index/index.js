var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
Page({
    data: {
        first10List: [],
        showResultList: [],
        showTypeIndex: 0,
        showTypeList: [{
                'img': '/images/l2.png',
                'defin': ['可回收垃圾', '指废纸张、废塑料、废玻璃制品、废金属、废织物等适宜回收、可循环利用的生活废弃物。'],
                'require':[
                    '分类投放可回收物时，应尽量保持清洁干燥，避免污染。',
                    '废纸应保持平整；立体包装物应清空内容物，清洁后压扁投放。',
                    '废玻璃制品应轻投轻放，有尖锐边角的应包裹后投放。'
                ],
                'types': [
                    '废纸张',
                    '废塑料',
                    '废玻璃制品',
                    '废金属',
                    '废织物'
                ]
            },
            {
                'img': '/images/l1.png',
                'defin': ['有害垃圾', '指废电池、废灯管、废药品、废油漆及其容器等对人体健康或者自然环境造成直接或者潜在危害的生活废弃物。'],       
                'require':[
                    '分类投放有害垃圾时，应注意轻放。',
                    '废灯管等易破损的有害垃圾应连带包装或包裹后投放。',
                    '废弃药品宜连带包装一并投放。',
                    '杀虫剂等压力罐装容器，应排空内容物后投放。',
                    '在公共场所产生有害垃圾且未发现对应收集容器时，应携带至有害垃圾投放点妥善投放。'
                ],
                'types': [
                    '废镍镉电池和废氧化汞电池',
                    '废荧光灯管',
                    '废药品及其包装物',
                    '废油漆和溶剂及其包装物',
                    '废矿物油及其包装物',
                    '废含汞温度计、废含汞血压计',
                    '废杀虫剂、消毒剂及其包装物',
                    '废胶片及废相纸'
                ]
            },
            {
                'img': '/images/l3.png',
                'defin': ['湿垃圾', '即易腐垃圾，厨余垃圾，指食材废料、剩菜剩饭、过期食品、瓜皮果核、花卉绿植、中药药渣等易腐的生物质生活废弃物。'],
                'require':[
                    '湿垃圾应从产生时就与其他品种垃圾分开收集，投放前尽量沥干水分。',
                    '有包装物的湿垃圾应将包装物去除后分类投放，包装物应投放到对应的可回收物或干垃圾收集容器。',
                    '盛放湿垃圾的容器，如塑料袋等，在投放时应予去除。'
                ],
                'types': [
                    '食材废料',
                    '剩菜剩饭',
                    '过期食品',
                    '瓜皮果核',
                    '花卉绿植',
                    '中药药渣'
                ]
            },
            {
                'img': '/images/l4.png',
                'defin': ['干垃圾', '即其他垃圾，指除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物。'],
                'require': ['干垃圾应投入干垃圾收集容器，并保持周边环境整洁。'],
                'types': [
                    '除其他三类外的垃圾，类别分辨不清的垃圾。'
                ]
            }
        ],
        ifShowAudio: true,
        timer:'',
        sec:10,
        ifShowFooter: true
    },
    onLoad:function(){
        manager.onStop = function (res) {
            var keyWord = res.result.split('。')[0]
            if (keyWord.length > 0){
                wx.navigateTo({
                    url: '/pages/search/search?keyWord=' + keyWord,
                })
            }else{
                wx.showToast({
                    title: '语音不清晰，请重新输入',
                    icon: 'none'
                })
            }
        }
        manager.onError = function (res) {
            if (res.retcode == 40001) {
                wx.showToast({
                    title: '用户太积极，今日语音次数已达上限了，请手动输入',
                    icon: 'none',
                    duration: 3000
                })
            }
        }
    },
    navToSearchPage: function() {
        wx.navigateTo({
            url: '/pages/search/search',
        })
    },
    showPic() {
        wx.previewImage({
            urls: ['http://files.quandashi.com/avatar/2019/09/12/df37da97-e1d4-46a8-ae0a-085af07abbee.o6zAJs3MyB_GLSlNKw7iOG8BQrwQ.ZNq8FDrgSNuSfef764566f519f3caca5e09ec62a5958.jpg'],
            current: 'http://files.quandashi.com/avatar/2019/09/12/df37da97-e1d4-46a8-ae0a-085af07abbee.o6zAJs3MyB_GLSlNKw7iOG8BQrwQ.ZNq8FDrgSNuSfef764566f519f3caca5e09ec62a5958.jpg'
        })
    },
    startFn:function(){
        var _this = this
        manager.start({ duration: 10000, lang: "zh_CN" })
        this.setData({
            ifShowAudio: false
        })
        wx.vibrateShort()
        this.data.timer = setInterval(function () {
            if (_this.data.sec == 0) {
                clearInterval(_this.data.timer)
                _this.setData({
                    sec: 10
                })
            }
            _this.setData({
                sec: _this.data.sec - 1
            })
        }, 1000)
    },
    endFn:function(){
        clearInterval(this.data.timer)
        this.setData({
            sec: 10
        })
        manager.stop()
        this.setData({
            ifShowAudio: true
        })
    },
    onPageScroll: function () {
        var _this = this
        this.setData({
            ifShowFooter: false
        })
        clearTimeout(time)
        var time = setTimeout(function () {
            _this.setData({
                ifShowFooter: true
            })
        }, 2000)
    },
    onShareAppMessage(res) {
        return {
            title: '垃圾应该怎么分类？来查一下吧。',
            path: '/pages/index/index',
            imageUrl:'/images/share.png'
        }
    }
})