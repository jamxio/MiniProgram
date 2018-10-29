//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  redirect:function(e){
    //console.log(e.currentTarget.dataset.url);
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: "../"+url
    });
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  ditu:function(){
    wx.chooseLocation({
      success:function(res){
        console.log("位置：" + res.name+"\r\n  详细地址"+res.address);
      }
    })
  }
})
