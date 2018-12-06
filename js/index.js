var vm=new Vue({
  el:"#section",/*忘记写了*/
  data(){
    return{
      carousel_list:[],
      index_id:1,
      today_list:[
        {id:1,img_url:"http://127.0.0.1:80/images/tody_rec1.jpg",href:""},
        {id:2,img_url:"http://127.0.0.1:80/images/tody_rec2.jpg",href:""},
        {id:3,img_url:"http://127.0.0.1:80/images/tody_rec3.jpg",href:""},
        {id:4,img_url:"http://127.0.0.1:80/images/tody_rec4.jpg",href:""},
        {id:5,img_url:"http://127.0.0.1:80/images/tody_rec5.jpg",href:""},
        {id:6,img_url:"http://127.0.0.1:80/images/tody_rec6.jpg",href:""},
        {id:7,img_url:"http://127.0.0.1:80/images/tody_rec7.jpg",href:""},
        {id:8,img_url:"http://127.0.0.1:80/images/tody_rec8.jpg",href:""},
      ],
      // todayStyle:{marginLeft:"0px"},
      hot_list:[
        {id:1,title:"乐扣乐扣收纳箱",price:79.00,img_url:"http://127.0.0.1:80/images/hot1.jpg",href:""},
        {id:2,title:"优生活 专属奶牛萌萌杯 送勺",price:15.00,img_url:"http://127.0.0.1:80/images/hot2.jpg",href:""},
        {id:3,title:"HAPPYCALL 多用途双面气压锅",price:870.00,img_url:"http://127.0.0.1:80/images/hot3.jpg",href:""},
        {id:4,title:"龙的微电脑电饭煲 LD-FS420",price:698.00,img_url:"http://127.0.0.1:80/images/hot4.jpg",href:""},
        {id:5,title:"光明5800吹风机",price:110.00,img_url:"http://127.0.0.1:80/images/hot5.jpg",href:""},
        {id:6,title:"新榜样韩式炒锅 A9-23",price:135.00,img_url:"http://127.0.0.1:80/images/hot6.jpg",href:""},
        {id:7,title:"乐扣乐扣迷你马克单杯200ml(红色)",price:89.00,img_url:"http://127.0.0.1:80/images/hot7.jpg",href:""},
        {id:8,title:"龙的巧趣系列电烤箱红外加热大容量 LD-KX12A",price:228.00,img_url:"http://127.0.0.1:80/images/hot8.jpg",href:""},
        {id:9,title:"OLYMPIA 拉杆箱 HE5000 29寸",price:1698.00,img_url:"http://127.0.0.1:80/images/hot9.jpg",href:""},
        {id:10,title:"公牛 新国标系列插座GN-S1220(以实物为准)",price:58.00,img_url:"http://127.0.0.1:80/images/hot10.jpg",href:""},
        {id:11,title:"百安思不锈钢双层保温杯BMH-12-4835(金色)",price:175.00,img_url:"http://127.0.0.1:80/images/hot11.jpg",href:""},
        {id:12,title:"龙的派乐系列电子饭盒LD-FH15C",price:138.00,img_url:"http://127.0.0.1:80/images/hot12.jpg",href:""},
      ]
    }
  },
  methods:{
    getcarousel(){
      axios.get("http://127.0.0.1:80/carousel").then(res=>{//使用axios模块发送ajax异步请求
        this.carousel_list=res.data.list;//res.data->{code:1,list:[{id:1,src:...},...]}
        console.log(this.carousel_list[0].src);
      })
    },
    changeimg(index_id){
      this.index_id=index_id;//把前台点击事件获得的id赋值给vm实例对象的index_id
      clearInterval(timer);//点击小圆点时，重新设置定时器
      timer=setInterval(fun,3000);
      console.log(index_id);
    },
    prev(){
      // var left=this.todayStyle.marginLeft.slice(0,-2);
      // left=parseInt(left);
      // console.log(left);
      this.today_list.unshift(this.today_list[7]);
      this.today_list.pop(this.today_list[8]);
    },
    next(){
      // var left=this.todayStyle.marginLeft.slice(0,-2);
      // left=parseInt(left);
      this.today_list.push(this.today_list[0]);
      this.today_list.shift(this.today_list[0]);
    },
  },  
  created(){
    this.getcarousel();
  },
})
//定时器，鼠标进入img清除，离开时重新添加
var fun=function(){
  if(vm.index_id==5){
    vm.index_id=0;
  }
  vm.index_id+=1;
}
var timer=setInterval(fun,3000);
var car_img=document.getElementsByClassName("car_img")[0];
console.log(car_img);
car_img.onmouseenter=function(e){
  clearInterval(timer);
}
car_img.onmouseleave=function(e){
    timer=setInterval(fun,3000);
}
