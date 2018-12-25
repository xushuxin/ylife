// 将头部当做js文件引入的方法，使用vue，必须在请求html文件后再监听
 var head=document.getElementsByTagName("HEAD")[0];
 var link=document.createElement("LINK");
 link.rel="stylesheet";
 link.href="css/header.css";
 head.appendChild(link);
 axios.get("header.html").then(res=>{
   document.body.firstElementChild.innerHTML=res.data;
   //动态请求的html添加成功后才可监听
   new Vue({
    el:"#header",
    data(){
      return{
        //头部导航栏下拉菜单
        nav_list:[
          {id:0,path:"http://127.0.0.1:80/images/category-pic-1.jpg", txt:"厨房用具",title:["家用电器"],index:["电饭煲","电磁炉","多功能锅","汤锅/奶锅","炒锅","锅具套装","瓜果刀/刨"],rec_brand:[{title:"HAPPYCALL",img:"http://127.0.0.1:80/images/happycall.jpg"},{title:"龙的",img:"http://127.0.0.1:80/images/longde.jpg"},{title:"伯尔尼斯",img:"http://127.0.0.1:80/images/brnc.jpg"}]},     
          {id:1,path:"http://127.0.0.1:80/images/category-pic-2.jpg", txt:"餐具茶具",title:["餐饮厨具"],index:["陶瓷杯","保温杯/壶","焖烧罐","玻璃杯","勺筷/刀叉","餐具套装"],rec_brand:[{title:"膳魔师",img:"http://127.0.0.1:80/images/shanmoshi.jpg"},{title:"乐扣乐扣",img:"http://127.0.0.1:80/images/lekou.jpg"},{title:"百安思",img:"http://127.0.0.1:80/images/bans.jpg"},{title:"申福",img:"http://127.0.0.1:80/images/shenfu.jpg"},{title:"大润窑",img:"http://127.0.0.1:80/images/darunyao.jpg"}]},  
          {id:2,path:"http://127.0.0.1:80/images/category-pic-3.jpg", txt:"生活电器",title:["家用电器"],index:["净化器","台灯","电风扇","加湿器 ","电吹风","剃须刀 ","理发器","煮蛋器","酸奶机","电水壶"],rec_brand:[{title:"宜阁",img:"http://127.0.0.1:80/images/yige.jpg"},{title:"公牛",img:"http://127.0.0.1:80/images/gongniu.jpg"}]},
          {id:3,path:"http://127.0.0.1:80/images/category-pic-4.jpg", txt:"毛巾洗浴",title:["家纺用品","居家生活","个护健康"],index:["肥皂","运动毛巾","浴巾","童巾"],rec_brand:[{title:"金号",img:"http://127.0.0.1:80/images/jinhao.jpg"}]},
          {id:4,path:"http://127.0.0.1:80/images/category-pic-5.jpg", txt:"家纺用品",title:["精品家纺","居家生活"],index:["床品套件","藤席系列","坐垫","冰垫" ],rec_brand:[{title:"天琴",img:"http://127.0.0.1:80/images/tianqin.jpg"}]},
          {id:5,path:"http://127.0.0.1:80/images/category-pic-6.jpg", txt:"居家收纳",title:["居家生活","精品家纺"],index:["衣架","居家小物件","收纳盒"],rec_brand:[{title:"好太太",img:"http://127.0.0.1:80/images/haotaitai.jpg"}]},
          {id:6,path:"http://127.0.0.1:80/images/category-pic-7.jpg", txt:"功能箱包",title:["居家生活"],index:["拉杆箱","双肩包"],rec_brand:[{title:"OLYMPIA",img:"http://127.0.0.1:80/images/olympia.jpg"}]}
        ],
        name:"",
        isLogin:false,
        kwords:"",
        string:""//用于保存地址栏的查询字符串?kwords=...
      } 
    },
    methods:{
      loginStatus(){// 登录状态
        //获取sessionStorage用户名
        this.name=sessionStorage.getItem("name");
        //如果有用户名
        if(this.name) this.isLogin=true;
      },
      logout(){
        if(this.name){
          sessionStorage.removeItem("name");
          this.isLogin=false;
        }
      },
      search(){
        if(this.kwords.trim()!==""){//如果关键词不为空
          location.href="products.html?kwords="+this.kwords;
        }
      }
    },
    mounted(){
      this.loginStatus();
      this.string=location.search;
    },
    watch:{
      string(val){//监听data中的string的值得变化，val既是值
        if(val.indexOf("kwords=")!=-1){
          this.kwords=decodeURIComponent(val.split("=")[1]);//decodeURIComponent解码数字以及字母汉字，decodeURI只解码空格
          // console.log(this.kwords)
        }
      }
    }
   })
 })
 Vue.directive("focus",{//添加全局自定义指令，让输入框获得焦点
  inserted(el){
    el.focus();
  }
 })

