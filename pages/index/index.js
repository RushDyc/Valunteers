//Page Object
// const db = wx.cloud.database()
import{ request }from "../../request/index.js";
Page({
  data: {
    //轮播图数组
    swiperList:[],
    //导航数组
    catesList:[],
    //分页数组
    floorList:[],
    tabs:[
      {
          id:0,
          name:"青少年服务",
          isActive:true
      },
      {
          id:1,
          name:"敬老助残",
          isActive:false
      }, 
      {
          id:2,
          name:"扶贫帮困",
          isActive:false
      },
      {
          id:3,
          name:"环境保护",
          isActive:false
      }
  ],
  // tabs:""
  
  },
  Cates:[],

  //自定义事件 用来接收子组件传递的数据的
  hanldeItemChange(e){
    // console.log(e);
    //接收传递过来的参数
    const {index}=e.detail; 
     let {tabs}=this.data;
            tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
            // db.collection("tabs").doc("54ad1eea61d5b925036153c2344ddcb5").get(
            //   {
            //     success:res=>{
            //       console.log(res)
            //       this.setData({
            //         tabs:res.data
            //       })
            //     }
            //   }
            // )
            this.setData({
                tabs 
            })
  },

  //页面开始加载 就会触发
  onLoad: function(options) {
    /*
    0 web中的本地存储和 小程序中的区别
      1 写代码方式不同
        web：localStorage.setItem("key","value")localStorage.getItem("key")
      小程序中：wx.setStorageSync("key","value");vx.getStorageSync("key");
      2 存的时候 有没有做类型转换
        web：不管存入的是什么类型的数据，最终都会先调用以下 toString()，把数据变成了字符串 再存入进去
        小程序：不存在 类型转换的这个操作 存什么类型的数据进去，获取的就是什么类型
    1 先判断一下本地存储中有没有旧的数据
    2 没有旧数据 直接发送新请求
    3 有旧的数据 同时旧的数据也没有过期 就使用 本地存储中的旧数据即可
      */
    // 1 获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    // // 2 判断
    if(!Cates){
    //   //不存在 发送请求获取数据
      this.getFloorList();
    }else{ 
    //   //有旧数据 定义过期时间 10s 改成 5分钟
      if(Date.now()-Cates.time>1000*10){
    //     //重新发送请求
        this.getFloorList();
      }else{
    //     //可以使用旧的数据
        this.Cates=Cates.data;
    }
  }
      //把接口数据存入本地存储中
    //  wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});

    // 1 发送异步请求获取轮播图数据  优化手段可以通过Es6的 promise来解决这个问题
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     // console.log(result);
    //     this.setData({ 
    //       swiperList:result.data.message
    //     } 
    //     )
    //   }
    // });

    //获取轮播图数据  

  //   getSwiperList(){
  //     Request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
  //     .then(result => {
  //         swiperList:result.data.message
  //     })
  //   }
  // }
  // this.getSwiperList(); 
  // this.getCateList();
  this.getFloorList();
  
},

   //获取轮播图数据
  // getSwiperList(){
  //   request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"})
  //   .then(result=>{
  //             this.setData({ 
  //           swiperList:result.data.message
  //         })
  //   })
  // },

   //获取分类导航数据
/*    getCateList(){
    request({url:"https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"})
    .then(result=>{
              this.setData({ 
            catesList:result.data.message
          })
    })
  }, */

  // getFloorList(){
  //   wx.request({  
  //     url: 'http://localhost:3000/tabs',    
      // header: {  
      //   'content-type': 'application/json'  
      // },  
  //     success: function (res) {  
  //       console.log(res.data)  
  //     }  
  //   })
  // }
  getFloorList(){
    request({url:"/tabs"})
    
    .then(result=>{
      // console.log(result);
      wx.setStorageSync("cates", {time:Date.now(),data:result});    
          this.setData({ 
            floorList:result
          })   
    }) 
  },
  onPageScroll(e) {
      console.log(e)
  }
})


