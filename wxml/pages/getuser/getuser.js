// pages/getuser/getuser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'未获取'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.login({
      success:function(res){
        var code = res.code
        var url = "https://api.weixin.qq.com/sns/jscode2session?appid=wx92762695161250d6&secret=454b568a5d7dcb81bf61ceef65d20293&js_code="+code+"&grant_type=authorization_code";
        wx.request({
          url:url,
          success:function(res){
            that.setData({
              openid:res.data.openid
            })
            console.log(res);
          }
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})