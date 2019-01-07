

//轮播图
var vm1=new Vue({
  el:"#section>.carousel",/*忘记写了*/
  data(){
    return{
      carousel_list:[],//轮播图列表
      index_id:0,//轮播图小圆点的下标
      timer:null,//轮播图定时器
    }
  },
  methods:{
    getcarousel(){
      axios.get("http://127.0.0.1:80/index/carousel").then(res=>{//使用axios模块发送ajax异步请求
        this.carousel_list=res.data.data;//res.data->{code:1,list:[{id:1,src:...},...]}
        console.log(this.carousel_list[0].src);
      })
    },
    changeimg(e){
      this.index_id=e.target.dataset.id;//把前台点击事件获得的id赋值给vm实例对象的index_id
      this.carouselauto();//自动轮播
    },
    carouselauto(){//轮播图定时器
      clearInterval(this.timer);
      this.timer=setInterval(()=>{
        this.index_id++;
        this.index_id=this.index_id%5;
      },3000);
    },
  }, 
  created(){
    this.getcarousel();
  },
  mounted(){
    //获得轮播图主体，鼠标进入清除，离开时重新添加
    this.$nextTick(function(){
      var car_img=document.getElementsByClassName("car_img")[0];
      car_img.onmouseenter=(e)=>{
        clearInterval(this.timer);
      }
      car_img.onmouseleave=(e)=>{
        this.carouselauto();
      }
      this.carouselauto();
    })
  }
})

//今日推荐
var vm2=new Vue({
  el:"#section>.today_rec",
  data(){
    return{
      today_list:[],//今日推荐列表
      transition:"none",
      marginLeft:0,
      index:0,//今日推荐指示器
      clickTime:0,//点击时间，控制点击频率
      timer:null,//今日推荐定时器
    }
  },
  methods:{
    gettodayrec(){
      axios.get("http://127.0.0.1:80/index/todayrec").then(res=>{
        this.today_list=res.data.data;
        this.today_list=this.today_list.concat(this.today_list.slice(0,4));//要实现无缝滚动，至少要多四张图
        console.log(this.today_list);
      })
    },
    prev(){
      if(new Date() - this.clickTime>500){
        this.clickTime=new Date();
        var ul=document.querySelector("#section>.today_rec>.scroll_box>.today_img");
        if(this.index==0){
          ul.style.transition="none";
          ul.style.marginLeft=-280*8+"px";
          this.index=8;
        }
        this.index--;
        var marginLeft=parseInt(getComputedStyle(ul).marginLeft);
        ul.style.transition="margin-left 0.5s ease-out";
        this.marginLeft=marginLeft+280;
      }
    },
    next(){
      // console.log(new Date() -this.clickTime);
      if( new Date() - this.clickTime >500){//第一次点击时this.clickTime是0,一定执行
        this.clickTime=new Date();//点击后this.clickTime转为当前时间，下次点击时，两次时间差需要大于500ms
        var ul=document.querySelector("#section>.today_rec>.scroll_box>.today_img");
        if(this.index==8){
          ul.style.transition="none";
          ul.style.marginLeft=0;
          this.index=0;
        }
        this.index++;
        var marginLeft=parseInt(getComputedStyle(ul).marginLeft);
        ul.style.transition="margin-left 0.5s ease-out";
        this.marginLeft=marginLeft-280;
      }
    },
    
  },
  created(){
    this.gettodayrec();
  },
  mounted(){
    //今日推荐鼠标移入移出
    var today_img=document.getElementsByClassName("today_img")[0];
    today_img.onmouseenter=(e)=>{
      clearInterval(this.timer);
    }
    today_img.onmouseleave=(e)=>{
      this.timer=setInterval(this.next,3000);
    }
    //加载后就调用轮播
    this.timer=setInterval(this.next,3000);
    //窗口是否打开
    // window.onfocus=()=>{
    //   clearInterval(this.timer);
    //   this.todayrecauto();
    // }
    // window.onblur=()=>{
    //   clearInterval(this.timer);
    // }
  },
  destroyed(){
    clearInterval(this.timer);
  }
})

//热门推荐
var vm3=new Vue({
  el:"#section>.hot_rec",/*忘记写了*/
  data(){
    return{
      hot_list:[],//热门推荐列表
    }
  },
  methods:{
    gethotrec(){
      axios.get("http://127.0.0.1:80/index/hotrec").then(res=>{
        this.hot_list=res.data.data;
      })
    },
    changeAnother(){//热门推荐切换显示的商品列表
      var arr1=this.hot_list.slice(0,6);
      var arr2=this.hot_list.slice(6);
      this.hot_list=arr2.concat(arr1); 
    },
  },
  created(){
    this.gethotrec();
  }
})

//首页主体1,2,3,4楼
var vm4=new Vue({
  el:"#section>.floor",
  data(){
    return {
      list:[],
    }
  },
  methods:{
    getFloorIMages(){
      // axios.get()
    }
  },
  create(){

  },
  mounted(){
    //2F轮播
    (function(){
      myCarousel({el:"#section>.floor>.floor2>.box>.right>ul>li:first-child",num:2,width:440});//元素，图片张数，图片宽度，轮播间隔时间，时间曲线
    })();
    //3F轮播
    (function(){
      myCarousel({el:"#section .floor3 .right .my_carousel",num:2,width:396});
    })();
    
  }
})






  