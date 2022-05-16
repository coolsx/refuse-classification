let interstitialAd = null
Page({
    data: {
        showTypeIndex: 0,
        showTypeList: [{
            'img': '/images/l2.png',
            'defin': ['可回收垃圾', '指废纸张、废塑料、废玻璃制品、废金属、废织物等适宜回收、可循环利用的生活废弃物。'],
            'require': [
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
            'require': [
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
            'require': [
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
        ]
    },
    
    onLoad: function(options) {
        if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
                adUnitId: 'adunit-3d59f5befb370585'
            })
            interstitialAd.onLoad(() => { })
            interstitialAd.onError((err) => { })
            interstitialAd.onClose(() => { })
        }
    },
    onShow:function(){
        if (interstitialAd) {
            interstitialAd.show().catch((err) => {
                console.error(err)
            })
        }
    },
    clickTypeFn: function (e) {
        var index = e.currentTarget.dataset.index
        this.setData({
            showTypeIndex: index
        })
    },
    onShareAppMessage(res) {
        return {
            title: '垃圾应该怎么分类？来查一下吧。',
            path: '/pages/index/index',
            imageUrl: '/images/share.png'
        }
    }
})