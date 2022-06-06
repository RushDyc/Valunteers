//同时发送异步代码
// let ajaxTimes=0;
export const request=(params)=>{
    // ajaxTimes++;
    //显示加载效果
    wx.showLoading({
        title: "加载中",
        mask: true
    });

    //定义公共的url
    const baseUrl = "http://localhost:3000";
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            url:baseUrl+params.url,
            header: {'content-type': 'application/json'},
            success:(result)=>{
                resolve(result.data);
                wx.hideLoading();
            },
            fail:(err)=>{
                reject(err);
                wx.hideLoading();
            },
            // compelete:()=>{
            //     ajaxTimes--;
            //     if(ajaxTimes===0) {
            //         //关闭正在等待的图标
            //         wx.hideLoading();
            //     }
            // }
            
        }) 
        })
    }
