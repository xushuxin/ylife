new Vue({
  el:"#section>.sift",
  data(){
    return {}
  },
  methods:{
    changeStyle(e){
      // console.log(this.$el);//this.$el获得当前监听元素
      // console.log(e.currentTarget);//e.currentTaget获得当前元素，e.target获得触发事件元素
      var lis=document.querySelectorAll("#section>.sift>ul>li");
      var spread=e.currentTarget;
      if(spread.firstElementChild.innerHTML=="展开"){
        for(var i=0;i<lis.length;i++){
          if(i==3){//改变第四个li的下边框
            lis[i].style.borderBottom="1px solid #EEEEEE";
          }
          if(i==lis.length-1){//改变最后一个li的下边框
            lis[i].style.borderBottom="0";
          }
          if(i>3){//显示后面的边框
            lis[i].style.display="block";
          }
          spread.firstElementChild.innerHTML="收起";
          spread.lastElementChild.style.backgroundImage="url(http://127.0.0.1:80/images/filter_up.gif)";
        }
      }else{
        for(var i=0;i<lis.length;i++){//慎用var key in arr 遍历出来有其他属性
          spread.firstElementChild.innerHTML="展开";
          spread.lastElementChild.style.backgroundImage="url(http://127.0.0.1:80/images/filter_down.gif)";
          if(i==3){//改变第四个li的下边框
            lis[i].style.borderBottom="0";
          }
          if(i>3){
            lis[i].style.display="none";
          }
        }
      }
    }
  },
  mounted(){
    //加载后就获得所有li,把第四个li后面的隐藏
    var lis=document.querySelectorAll("#section>.sift>ul>li");
    // console.log(lis);
    for(var i=0;i<lis.length;i++){
      if(i>3){
        lis[i].style.display="none";
      }
    }
  }
})


new Vue({
  el:"#section>.products",
  data(){
    return{
      list:[],  
      pno:1,  //当前页码
      pageSize:16,//每页商品条数
      pageCount:0,//总页数
      count:0,//总商品条数
      string:"",//地址栏查询字符串
      kwords:""//关键词
    }
  },
  methods:{
    getProductlist(no=1){//加载页面时
      if(this.string.indexOf("kwords=")!=-1){
        this.pno=no;
        var kwords=this.kwords;
        axios.get("http://127.0.0.1:80/product/getProductlist?kwords="+kwords+"&pno="+this.pno).then(res=>{
          this.list=res.data.products;
          this.pageCount=res.data.pageCount;
          this.count=res.data.count;
        })
      }  
    },
    contrast(e){//对比
      var img=e.currentTarget.firstElementChild;
      // console.log(img.src.indexOf("checked")!=-1);//不可直接把获得的src与字符串相比较
      if(img.src.indexOf("checked")==-1){//未查找到checked
        img.src="http://127.0.0.1:80/images/checked.jpg";
      }else{
        img.src="http://127.0.0.1:80/images/no-check.jpg";
      }
    },
    prevPage(){//上一页
      if(this.pno>1){
        var pno=--this.pno;
        this.getProductlist(pno);
      }
    },
    nextPage(){//下一页
      if(this.pno<this.pageCount){
        var pno=++this.pno;
        // console.log(pno);
        this.getProductlist(pno);
      }
    },
    change(e){//点击对应的数字按钮
      if(e.target.getAttribute("class").indexOf("active")==-1){//没有active的才能触发
        // console.log(e.target.dataset.pno)
        var pno=this.pno=e.target.dataset.pno;
        this.getProductlist(pno);
      }
    },
    attention(e){//关注
      var img=e.currentTarget.firstElementChild;
      // console.log(img.src.indexOf("checked")!=-1);//不可直接把获得的src与字符串相比较
      if(img.src.indexOf("g-love")==-1){
        img.src="http://127.0.0.1:80/images/g-love.png";
      }else{
        img.src="http://127.0.0.1:80/images/r-love.png";
      }
    },
    add(){

    }
  },
  created(){
    this.string=location.search;
    if(this.string!=-1){
      this.kwords=decodeURIComponent(this.string.split("=")[1]);//decodeURIComponent解码数字、字母汉字,decodeURI只解码空格
      console.log(this.kwords);
    }
    this.getProductlist();
  },
  directives:{//局部自定义命令v-color,
    color:{
      inserted:(el)=>{//inserted在插入元素之后进行操作，el为绑定v-color的元素
        var title=el.dataset.title;//通过el.dataset.title获得自定义data-title属性值
        var kwords=el.dataset.kwords;//利用自定义属性data-kwords绑定kwords
        kwords=kwords.split(" ")//关键词用空格分割为数组
        for(var kw of kwords){//遍历关键词数组
          var reg=new RegExp(kw,"g");//创建正则表达式
          title=title.replace(reg,`<font style='color:#f00;'>${kw}</font>`)//替换title中关键词的内容
        }
        el.innerHTML=title;
      }
    } 
  }
})
// Vue.directive("color",{//全局自定义指令v-color，父元素被监听即可使用
//   inserted(el){
//   }
// })
// new Vue({
//   el:"#header",
//   data(){
//     return{
//       kwords:"",
//       string:"",
//     }
//   },
//   watch:{
//     string(val){//监听data中的的值得变化，val既是值
//     if(location.search.indexOf(this.kwords)!=-1){
//       this.kwords=decodeURIComponent(val.split("=")[1]);//decodeURIComponent解码数字以及字母汉字，decodeURI只解码空格
//       // console.log(this.kwords)
//       }
//     }
//   },
//   mounted(){
//     this.string=location.search;   
//   },
// })


