new Vue({
  el:"#nav>ul>li.drop_list",
  data(){
    return{
      nav_list:[
        {id:0,path:"image/category-pic-1.jpg", txt:"厨房用具",title:["家用电器"],index:["电饭煲","电磁炉","多功能锅","汤锅/奶锅","炒锅","锅具套装","瓜果刀/刨"],rec_brand:[{title:"HAPPYCALL",img:"image/happycall.jpg"},{title:"龙的",img:"image/longde.jpg"},{title:"伯尔尼斯",img:"image/brnc.jpg"}]},     
        {id:1,path:"image/category-pic-2.jpg", txt:"餐具茶具",title:["餐饮厨具"],index:["陶瓷杯","保温杯/壶","焖烧罐","玻璃杯","勺筷/刀叉","餐具套装"],rec_brand:[{title:"膳魔师",img:"image/shanmoshi.jpg"},{title:"乐扣乐扣",img:"image/lekou.jpg"},{title:"百安思",img:"image/bans.jpg"},{title:"申福",img:"image/shenfu.jpg"},{title:"大润窑",img:"image/darunyao.jpg"}]},  
        {id:2,path:"image/category-pic-3.jpg", txt:"生活电器",title:["家用电器"],index:["净化器","台灯","电风扇","加湿器 ","电吹风","剃须刀 ","理发器","煮蛋器","酸奶机","电水壶"],rec_brand:[{title:"宜阁",img:"image/yige.jpg"},{title:"公牛",img:"image/gongniu.jpg"}]},
        {id:3,path:"image/category-pic-4.jpg", txt:"毛巾洗浴",title:["家纺用品","居家生活","个护健康"],index:["肥皂","运动毛巾","浴巾","童巾"],rec_brand:[{title:"金号",img:"image/jinhao.jpg"}]},
        {id:4,path:"image/category-pic-5.jpg", txt:"家纺用品",title:["精品家纺","居家生活"],index:["床品套件","藤席系列","坐垫","冰垫" ],rec_brand:[{title:"天琴",img:"image/tianqin.jpg"}]},
        {id:5,path:"image/category-pic-6.jpg", txt:"居家收纳",title:["居家生活","精品家纺"],index:["衣架","居家小物件","收纳盒"],rec_brand:[{title:"好太太",img:"image/haotaitai.jpg"}]},
        {id:6,path:"image/category-pic-7.jpg", txt:"功能箱包",title:["居家生活"],index:["拉杆箱","双肩包"],rec_brand:[{title:"OLYMPIA",img:"image/olympia.jpg"}]}
      ]
    
    } 
  },
})