/******************************滚动轮播组件*********************************/
// 轮播图片的父元素类名img
// 左右按钮的父元素类名arrow
// 小圆点的父元素类名index
function myCarousel(el,num,width,interval,ease){//元素，图片数量，图片宽度无单位，间隔时间ms，时间曲线（linear/ease）
  //获得左右按钮、移动的ul、小圆点的集合
  var ul=el.getElementsByClassName("img")[0];
  var arrowLeft=el.getElementsByClassName("arrow")[0].firstElementChild;
  var arrowRight=el.getElementsByClassName("arrow")[0].lastElementChild;
  var discs=el.querySelectorAll(".index>div");//小圆点
  var i=0; //创建i保存指示器
  var clickTime=0;//点击时间
  var timer=null;//定时器
  var li=document.createElement("LI");//创建空的li元素
  li.innerHTML=ul.firstElementChild.innerHTML;//内容和第一个li一样
  ul.appendChild(li);//添加到父元素上
  
  arrowLeft.onclick=function(){
    clearInterval(timer);
    if(new Date() - clickTime>interval){
      clickTime=new Date();
      if(i==0){
        i=num;
        ul.style.transition="none";//取消transition属性
        ul.style.marginLeft=`${-num*width}px`;//直接移到第三张图
      }
      i--;
      var marginLeft=parseInt(getComputedStyle(ul).marginLeft);
      ul.style.transition=`all ${interval}ms ${ease}`;//设置transition属性
      for(var item of discs){
        item.className="";//清除所有小圆点的类名
      }
      discs[i].className="active";//当前小圆点添加active类名
      ul.style.marginLeft=marginLeft+width+"px";
    }
    auto();
  }
  arrowRight.onclick=function(){
    clearInterval(timer);
    if(new Date()-clickTime>interval){
      clickTime=new Date();
      if(i==num){
        i=0;
        ul.style.transition="none";//取消transition属性
        ul.style.marginLeft="0";//直接移到第一张图
      } 
      i++;
      var marginLeft=parseInt(getComputedStyle(ul).marginLeft);//获得计算后的marginLeft并去掉px
      ul.style.transition=`all ${interval}ms ${ease}`;//设置transition属性
      for(var item of discs){
        item.className="";//清除所有小圆点的类名
      }
      discs[i%2].className="active";//当前小圆点添加active类名(i=2时，直接变为0)
      ul.style.marginLeft=marginLeft-width+"px";
    }
    auto();
  }
  //给图片绑定鼠标移入移出事件
  ul.onmouseenter=(e)=>{
    clearInterval(timer);
  }
  ul.onmouseleave=(e)=>{
    auto();
  }
  //自动轮播
  function auto(){
    timer=setInterval(function(){
      if(i==num){
        i=0;
        ul.style.transition="none";//取消transition属性
        ul.style.marginLeft="0";//直接移到第一张图
      } 
      i++;
      var marginLeft=parseInt(getComputedStyle(ul).marginLeft);//获得计算后的marginLeft并去掉px
      ul.style.transition=`all ${interval}ms ${ease}`;//设置transition属性
      for(var item of discs){
        item.className="";//清除所有小圆点的类名
      }
      discs[i%2].className="active";//当前小圆点添加active类名(i=2时，直接变为0)
      ul.style.marginLeft=marginLeft-width+"px";
    },5000)
  }
  auto();
}