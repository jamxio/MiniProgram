let recordVoiceTimer;
const recorderManager = wx.getRecorderManager();
let reqHandler;
Page({
	data:{
    recording:false,
    reqing:false,
    restSecond:15,
    voicePath:null,
    voiceResult:''
  },
  onLoad(){
  },
  recordVoice(e){
    this.setData({
      voicePath: null,
      recording: true,
    });
    recorderManager.start({ format: 'mp3', sampleRate: 16000});
    recorderManager.onStop((res) => {
      console.log(res);
      this.setData({
        voicePath: res.tempFilePath
      });
      this.uploadVoice();
    });
    recordVoiceTimer = setInterval(() => {
      this.setData({ restSecond: this.data.restSecond - 0.01 });
      if (this.data.restSecond <= 0) {
        clearInterval(recordVoiceTimer);
        recorderManager.stop();
      }
    }, 10);
  },
  endRecord(e) {
    clearInterval(recordVoiceTimer);
    if (!this.data.recording) {
      return false;
    }
    recorderManager.stop();
  },
  uploadVoice() {
    this.setData({ recording: false, restSecond: 15});
    if(!this.data.voicePath){
      wx.showModal({
        content: '对不起，录音失败',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return false;
    }
    //如果准备好了就可以上传录音
    this.setData({ reqing:true,voiceResult:null});
    reqHandler = wx.uploadFile({
      url: 'https://c.jamxio.com//speech/speech/recognize',
      filePath: this.data.voicePath,
      name: 'voice',
      success:(res)=>{
        console.log(res);
        let result = JSON.parse(res.data);
        this.setData({voiceResult:result.result});
      },
      fail:(res)=>{
        this.setData({voiceResult:'识别出错'});
      },
      complete: (res) => {
        console.log(res);
        this.setData({ reqing: false });
      },
    });
    let reqSecond = 0;
    let reqingCron = setInterval(() => {

      if (!this.data.reqing) {
        clearInterval(reqingCron);
        return false;
      }
      if (++reqSecond > 12) {
        clearInterval(reqingCron);
        reqHandler.abort();
        this.setData({ reqing: false });
        wx.showModal({
          content: '对不起，识别失败',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      }
    },1000);
  }
});