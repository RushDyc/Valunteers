import{ request }from "../../request/index.js";
import regeneratorRuntime from "../../libs/runtime/runtime";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activityList:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getActivityList();
    },

    //获取活动列表数据
    async getActivityList(){
        const res = await request({url:"/activity"});
        
        this.setData({
            activityList:res 
        })
        // console.log(res);
        //关闭下拉刷新窗口
        wx.stopPullDownRefresh();
    }
})