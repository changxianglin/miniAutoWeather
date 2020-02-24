//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    src: '999',
    locTime: '',
    weather: '',
    province: '',
    city: '',
    location: '',
    loc: '',
    tmp_max: '',
    tmp_min: '',
    wind_spd: '',
    wind_sc: '',
    sr: '',
    ss: '',
    txt: '',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getLifestyle: function() {
    let that = this 
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/lifestyle?',
      data: {
        location: that.data.loc,
        key: 'c5819110ad6d4bc2884405f493fdc801'
      },
      success: function(res) {
        that.setData({
          txt: res.data.HeWeather6[0].lifestyle[0].txt
        })
      }
    })
  },
  getWeather: function() {
    let that = this 
    console.log(that.data.loc)
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/forecast?',
      data: {
        location: that.data.loc,
        key: 'c5819110ad6d4bc2884405f493fdc801'
      },
      success: function(res) {
        console.log(res)
        that.setData({
          province: res.data.HeWeather6[0].basic.admin_area,
          city: res.data.HeWeather6[0].basic.parent_city,
          location: res.data.HeWeather6[0].basic.location,
          locTime: res.data.HeWeather6[0].update.loc,
          weather: res.data.HeWeather6[0].daily_forecast[0].cond_txt_n,
          tmp_max: res.data.HeWeather6[0].daily_forecast[0].tmp_max,
          tmp_min: res.data.HeWeather6[0].daily_forecast[0].tmp_min,
          sr: res.data.HeWeather6[0].daily_forecast[0].sr,
          ss: res.data.HeWeather6[0].daily_forecast[0].ss,
          wind_spd: res.data.HeWeather6[0].daily_forecast[0].wind_spd,
          wind_sc: res.data.HeWeather6[0].daily_forecast[0].wind_sc,
          src: res.data.HeWeather6[0].daily_forecast[0].cond_code_d
        })
      }
    })
  },  
  onLoad: function () {
    let that = this 
    wx.getLocation({
      success: function(res) {
        console.log(res.latitude, res.longitude)
        let locat = res.latitude.toString() + ',' + res.longitude.toString()
        console.log(locat)
        that.data.loc = locat
        that.getWeather()
        that.getLifestyle()
      },
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
