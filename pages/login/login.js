
Page({
    getUserProfile(e){
        wx.getUserProfile({
            desc: '获取你的昵称、头像、地区及性别',
            success: (res) => {
                this.setData({
                    userInfo: res.userInfo
                })
                const {userInfo}=res;
                wx.setStorageSync("userinfo", userInfo);
              },
              
            });
        // const {userInfo}=userInfo;
        // wx.setStorageSync("userInfo", userInfo);
        wx.navigateBack({
            delta: 1
        });   
    },
})
