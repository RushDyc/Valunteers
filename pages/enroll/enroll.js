Page({
    data: {
        enroll:[]
    },
    onShow() {
        const enroll = wx.getStorageSync("enr")||[];
        this.setData({
            enroll
        });
    }
})