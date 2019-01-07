Vue.filter("countConvert",function(val){//过滤器
  return val==1?"有货":"无货";
})
new Vue({
  el:"#section",
  data(){
    return{
      product:{price:0},
      id:null,
      specs1:[],
      specs2:[],
      pics:[],
      attenClass:{attended:false},//关注的爱心样式类名
      index:0,//指示器，当前第几张图片
      count:1,
    }
  },
  methods:{
    getGoodsInfo(){
      axios.get("http://127.0.0.1:80/details?id="+this.id).then(res=>{
        this.product=res.data.product;
        this.specs1=res.data.specs1;
        this.specs2=res.data.specs2;
        this.pics=res.data.pics;
        this.$nextTick(function(){//必须窗口加载后执行，否则获得的offsetTop是相对于当前组件最外层元素
          (function(){
            myCarousel({el:".sImg",num:6,showNum:5,width:62,isAuto:false,isCircle:false});
          })();
          var els=document.querySelectorAll("[data-toggle=fixed]");
          var btn=els[0];
          var div=els[1];
          var scrollTop;
          var divTop=div.offsetTop;//获得元素距离浏览器顶部的距离
          window.onscroll=function(){//滚动条滚动时
            scrollTop=document.documentElement.scrollTop || document.body.scrollTop;//获得页面滚动过的距离(兼容ie)
            if(scrollTop>divTop){
              while(div.className.indexOf("divFixed")==-1 && btn.className.indexOf("btnFixed")==-1){
                div.className+=" divFixed";
                btn.className+=" btnFixed";
                btn.style.left=div.offsetLeft+div.offsetWidth+"px";
              }
            }else{
              div.className=div.className.replace(" divFixed","");
              btn.className=btn.className.replace(" btnFixed","")
            }
          }
        })
        
      })
    },
    changeStyle(e){
      this.index=e.target.dataset.id;
    },
    toggleImg(){//添加/删除样式类名
      this.attenClass.attended=!this.attenClass.attended;
    },
    skip(e){//点击锚点跳转位置
      var id=e.target.dataset.id;
      document.getElementById(id).scrollIntoView();//视图与元素顶部对齐
    },
    tap(e){
      var btn=e.target;
      var btns=btn.parentNode.querySelectorAll("div");
      var id=btn.dataset.id;
      var content=document.getElementById(id);
      var contents=content.parentNode.querySelectorAll("div");
      btns.forEach(el => {
        el.className=el.className.replace(" active","");
      });
      btn.className+=" active";
      contents.forEach(el=>{
        el.style.zIndex="";
      })
      content.style.zIndex=10;
    },
    addCart(e){
      // 获得三个参数
      var uid=sessionStorage.uid;
      var pid=this.id;
      var count=parseInt(this.count);
      var url="http://127.0.0.1:80/shopcart/addCart";
      var params=`uid=${uid}&pid=${pid}&count=${count}`;
      axios.defaults.withCredentials = true;
      axios.post(url,params).then(res=>{
        alert(res.data.msg);
        sessionStorage.setItem("isAdd",true);
        console.log(sessionStorage);
      })
    },
    increment(){
      if(this.count<99){
        this.count++;
        this.count=this.count.toString();
      }
    },
    reduce(){
      if(this.count>1){
        this.count--;
        this.count=this.count.toString();//转为字符串类型，否则无法使用字符串的API
      }
    }
     
  },
  mounted(){
    this.id=location.search.split("=")[1];//加载页面时获得商品id
    this.getGoodsInfo();//获得商品详情信息
  },
  watch:{
    count(val){
      if(val.length==1){
        this.count=val.replace(/[^1-9]/g,'')//不是除1~9以外的转为空字符
      }else{
        this.count=val.replace(/\D/g,'')//非数字转为空字符
      }
      
    }
  }
})



