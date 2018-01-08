// search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    percent : 30,
    hop:0,
    showMap: false,
    run: false,
    inputIP: "",
    IP_table: [],
    lng: 116.324520,
    lat: 39.099994,
    markers: [],
    polyline: [{
      points: [],
      color: "#5c956eff",
      width: 10,
      dottedLine: false
    }],
    router_table: []
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },

  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  add: function (e) {
    //console.log(e.detail.value)
    this.setData({
      inputIP: e.detail.value
    })
  },

  search: function () {
      
    wx.showToast({
      title: '正在找寻路由',
      icon: 'success',
      duration: 2000
    });

    var that = this
    that.setData({
      showMap: false,
      run: false,
      hop:0,
      percent : 30
    })

    wx.request({
      url: 'https://118.89.39.140/IP/router?hostname=' + that.data.inputIP,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          IP_table: res.data
        })
        that.makeMap()
        that.setData({
          showMap: true,
          percent: 100
        })
      }
    }) 

    that.setData({
      run: true,
      percent: 60
    })


  },

  makeMap: function () {
    var that = this
    var marker = [{
      latitude: 39.125596,
      longitude: 117.190182
    }]
    var point = []
    var table = [{
      latitude: 39.125596,
      longitude: 117.190182,
      IP: "118.89.39.140",
      region: "天津"
    }]
    for (var i = 0; i < that.data.IP_table.length; i++) {
      var element = that.data.IP_table[i]
        marker.push({
          latitude: element.Geo.showapi_res_body.lat,
          longitude: element.Geo.showapi_res_body.lnt
        })
        point = marker
        table.push({
          latitude: element.Geo.showapi_res_body.lat,
          longitude: element.Geo.showapi_res_body.lnt,
          IP: element.IP,
          region: element.Geo.showapi_res_body.region
        })
      
    }
    that.setData({
      markers: marker,
      polyline: [{
        points: point,
        color: "#5c956eff",
        width: 10,
        dottedLine: false
      }],
      lng: 117.190182,
      lat: 39.125596,
      router_table: table
    })
  },

  MapCenterChange: function (event) {
    var id = event.currentTarget.dataset.alphaId
    var that = this
    that.setData({
      lng: that.data.router_table[id].longitude,
      lat: that.data.router_table[id].latitude
    })
  },

  nestHop: function(){
    var that = this
    that.setData({
      hop: (that.data.hop + 1) % (that.data.markers.length),
      lng: that.data.markers[that.data.hop].longitude,
      lat: that.data.markers[that.data.hop].latitude,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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