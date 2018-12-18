new Vue({
  el:"#section>.sift",
  data(){
    return {
      lis:[]
    }
  },
  methods:{
    change(e){
      // console.log(this.$el);//this.$el获得当前监听元素
      var lis=this.lis;
      var spread=this.$el.lastElementChild;
      if(spread.firstElementChild.innerHTML=="展开"){
        for(var key in lis){
          lis[key].style.display="block";
          spread.firstElementChild.innerHTML="收起";
          spread.lastElementChild.style.backgroundImage="url(http://127.0.0.1:80/images/filter_up.gif)";
          if(key==0){//改变第四个li的下边框
            lis[key].previousElementSibling.style.borderBottom="1px solid #EEEEEE";
          }
          if(key==lis.length-1){//改变最后一个li的下边框
            lis[key].style.borderBottom="0";
          }
        }
      }else{
        for(var key in lis){
          lis[key].style.display="none";
          spread.firstElementChild.innerHTML="展开";
          spread.lastElementChild.style.backgroundImage="url(http://127.0.0.1:80/images/filter_down.gif)";
        }
      }
    }
  },
  mounted(){
    //加载后就把除前四个以外的li放到数组中
    var li=this.$el.firstElementChild.children[3];//获得第四个li
    while(li.nextElementSibling){
      this.lis.push(li.nextElementSibling);
      li=li.nextElementSibling;
    }
    var lis=this.lis;
    for(var key in lis){
      lis[key].style.display="none";
    }
  }
})


new Vue({
  el:"#section>.products",
  data(){
    return{
      list:[],
    }
  },
  methods:{
    contrast(){
      var img=this.$el.querySelector(".main>.product_list div .operation>span:first-child>img");
      // console.log(img.src.indexOf("checked")!=-1);//不可直接把获得的src与字符串相比较
      if(img.src.indexOf("checked")==-1){//未查找到checked
        img.src="http://127.0.0.1:80/images/checked.jpg";
      }else{
        img.src="http://127.0.0.1:80/images/no-check.jpg";
      }
    },
    attention(){
      var img=this.$el.querySelector(".main>.product_list div .operation span:nth-child(2)>img");
      // console.log(img.src.indexOf("checked")!=-1);//不可直接把获得的src与字符串相比较
      if(img.src.indexOf("g-love")==-1){
        img.src="http://127.0.0.1:80/images/g-love.png";
      }else{
        img.src="http://127.0.0.1:80/images/r-love.png";
      }
    },
    add(){

    }
  }
})

