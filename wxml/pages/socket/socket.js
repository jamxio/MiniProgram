// pages/socket/socket.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    i:1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var socketOpen = false
    var socketMsgQueue = ['hello','hi','kkk']
    var sendSocketMessage = function () {
      var msg = socketMsgQueue[2];
      if (socketOpen) {
        wx.sendSocketMessage({
          data: msg
        })
      } else {
        socketMsgQueue.push(msg)
      }
    };
    var that = this;
    wx.connectSocket({
      url: 'wss://lu.jamxio.com',
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
      socketOpen = true
      wx.sendSocketMessage({data:'saf'});
      for (var i = 0; 0<1; i++) {
        setInterval(sendSocketMessage, 1000);
        if(i>1000){
          break;
        }
      }
      socketMsgQueue = []
    })
    wx.onSocketError(function (res) {
      console.log('WebSocket连接打开失败，请检查！')
    })
    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' );
      console.log(res);
      that.setData({i:that.data.i+1});
      console.log(that.data.i);
    })
  },

})
