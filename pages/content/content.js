var app = getApp()
Page({
    data: {
        word:null,
        message: null,
        request_fail: false,
        image_url:null
    },
    onLoad: function(options) {
        console.log(options)
        this.setData({
            word:options.word
        })
        var that = this;
        // 动态设置标题栏。。。无效
        wx.setNavigationBarTitle({
            title: options.word,
            fail: function() {
                console.log("更改标题失败");
            },
            success: function() {
                console.log("更改标题成功");
            }
        });

        //get请求
        wx.request({
            url: "https://cn.bing.com/dict/search",
            data: {
                q: options.word,
            },
            success: function(res) {
                that.setData({
                    message: that.html_encode(res.data)
                });
            },
            fail: function(error) {
                that.setData({
                    request_fail: true
                })
            }
        })

        wx.request({
            url: "https://cn.bing.com/image/search",
            data: {
                q: options.word,
            },
            success: function(res) {
                that.setData({
                    image_url: that.html_encode_image(res.data)
                });
            },
            fail: function(error) {
                that.setData({
                    request_fail: true
                })
            }
        })
    },
    html_encode: function(str) {
        var re = new RegExp("<span class=\"def\"><span>([\u0391-\uFFE5]+)</span>","g");
        var str=str.match(re);
        console.log(str);
        str = str[0].replace(/<\/?[^>]*>/g, '');
        return str;
    },
    html_encode_image: function(str) {
        var re = new RegExp("&quot;http://(.*?)&quot","g");
        var str1=str.match(re);
        console.log(str1[1]);
        str1 = str1[1].replace(/&quot/g, '');
        console.log(str1);
        //str1 = str1[1].replace(/&amp/g, '');
        //console.log(str1);
        str1 = str1.replace(/\;/g, '');
        console.log(str1);
        return str1;
    }
})
