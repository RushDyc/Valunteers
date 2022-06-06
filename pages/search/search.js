import{ request }from "../../request/index.js";
import regeneratorRuntime from "../../libs/runtime/runtime";

Page({
    data: {
        activity:[],
        isFocus:false,
        inpValue:""
    },
    TimeId:-1,

    handleInput(e){
        const {value} = e.detail;
        //检测合法性
        if(!value.trim()) {
            this.setData({
                activity:[],
                isFocus:false
            })
            //值不合法
            return;
        }
        this.setData({
            isFocus:true
        })
        clearTimeout(this.TimeId);
        this.TimeId=setTimeout(()=>{
        this.qsearch(value);
    },1000);
    },

    async qsearch(query) {
        const res = await request({url:"/activity",data:{query}});
        // console.log(res);
        this.setData({
            activity:res
        })
    },

    handleCancel() {
        this.setData({
            inpValue:"",
            isFocus:false,
            activity:[]
        })
    }
    
})