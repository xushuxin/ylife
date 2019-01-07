/******************************无缝滚动轮播组件*********************************/
// 轮播图片的父元素类名img
// 左右按钮的类名arrow-left/arrow-right
// 小圆点的父元素类名index
//el元素的选择器;num图片数量;显示窗口中的图片数量;width每次滚动的距离(图片宽度+magin/padding后传入)无单位;transition间隔时间ms,设为0即不滚动;ease时间曲线（linear/ease）;isAuto是否自动轮播;autoInterval自动轮播时间间隔时间;isCircle是否是无缝
function myCarousel({el,num,showNum,width,transitionInterval,ease,isAuto,autoInterval,isCircle}){
  if(transitionInterval==undefined)transitionInterval=500;//默认切换一张图片的过渡时间为0.5s
  if(ease==undefined)ease="linear";//默认运动时间曲线linear
  if(isAuto==undefined)isAuto=true;//默认自动轮播
  if(autoInterval==undefined)autoInterval=5000;//默认5s自动切换一次图片
  if(showNum==undefined)showNum=1;//默认显示一张图片
  if(isCircle==undefined)isCircle=true;//默认图片循环
  if(!isCircle){//如果图片不循环设置变量控制ul是否可以移动
    var canPrev=false;//右移
    var canNext=false;//左移
  }
  var el=document.querySelector(el);//按选择器查找该元素，传入选择器即可
   //获得左右按钮、移动的ul、小圆点的集合
  var ul=el.getElementsByClassName("img")[0];//移动的ul
  var lis=ul.children;//所有的图片li集合
  var arrowLeft=el.getElementsByClassName("arrow-left")[0];//左箭头
  var arrowRight=el.getElementsByClassName("arrow-right")[0];//右箭头
  var discs=el.querySelectorAll(".index>div");//小圆点集合
  // console.log(discs);
  discs=Array.prototype.slice.call(discs);//将类数组对象转为数组
  // console.log(discs);
  // console.log(Array.isArray(discs));
  var i=0; //创建i保存指示器
  var clickTime=0;//点击时间
  var timer=null;//定时器
  if(isCircle){
    //ul的宽度设为增加图片后的宽度
    ul.style.width=(lis.length+showNum)*width+"px";
    //根据显示的图片数量，创建对应数量的li
    for(var a=0;a<showNum;a++){
      var li=document.createElement("LI");//创建空的li元素
      li.innerHTML=lis[a].innerHTML;//内容和第一个li一样
      ul.appendChild(li);//添加到ul尾部
    }
  }
  console.log(i);
  if(arrowLeft&&arrowRight){//如果有箭头
    arrowLeft.onclick=function(){
      if(new Date() - clickTime>transitionInterval){
        clickTime=new Date();
        if(isCircle){//如果图片无缝循环
          if(i==0){
            i=num;
            ul.style.transition="none";//取消transition属性
            ul.style.marginLeft=`${-num*width}px`;//直接移到第三张图
          }
        }
        if(!isCircle){//如果不是无缝对i做判断，i不等于零并且窗口显示的图片数量小于图片的总数量时ul才可以右移
          if(i!=0&&showNum<num){
            canPrev=true;
          }else{
            canPrev=false;
          }
        }
        if(!isCircle&&canPrev || isCircle){//两种情况下执行：①不循环且canPrev为true②循环
          i--;
          var marginLeft=parseInt(getComputedStyle(ul).marginLeft);
          ul.style.transition=`margin-left ${transitionInterval}ms ${ease}`;//设置transition属性
          if(discs.length!=0){
            for(var disc of discs){
              disc.className=disc.className.replace("active","");//清除所有小圆点的类名
            }
            discs[i].className+=" active";//当前小圆点添加active类名
          }
          ul.style.marginLeft=marginLeft+width+"px";
        }
      }
      isAuto&&auto();//如果isAuto==false,auto()不执行
    }
    arrowRight.onclick=function(){
      if(new Date()-clickTime>transitionInterval){
        clickTime=new Date();
        if (isCircle){
          if(i==num){//如果图片无缝循环
            i=0;
            ul.style.transition="none";//取消transition属性
            ul.style.marginLeft="0";//直接移到第一张图
          }
        }
        if (!isCircle){//如果不是无缝对i做判断，i(0代表第一张在最左边)小于总图片数量减去显示窗口图片数量时
          if(i<num-showNum){
            canNext=true;
          }else{
            canNext=false;
          }
        }
        if(!isCircle&&canNext || isCircle){
          i++;
          var marginLeft=parseInt(getComputedStyle(ul).marginLeft);//获得当前计算后的marginLeft并去掉px
          ul.style.transition=`margin-left ${transitionInterval}ms ${ease}`;//设置transition属性
          if(discs.length!=0){
            for(var disc of discs){
              disc.className=disc.className.replace("active","");//清除所有小圆点的类名
            }
            discs[i%num].className+=" active";//当前小圆点添加active类名(i=num时第一个小圆点变色)
          }
          ul.style.marginLeft=marginLeft-width+"px";
        }
      }
      isAuto&&auto();//如果isAuto==false,auto()不执行
    }
  }
  if(discs.length!=0){//如果有小圆点
    // index.addEventListener("click",function(e){
    //   if(e.target.className.indexOf("index")==-1){
        // var disc=e.target;
      discs.forEach((el,index,arr) => {//对每个元素执行相同操作
        el.onclick=function(){
          var disc=this;
          if(disc.className.indexOf("active")==-1){//如果当前小圆点类名中没有active
            for(var item of discs){//对每个元素查找类名active,查找到就替换为""
              item.className=item.className.replace("active","");
            }
            disc.className+=" active";//当前小圆点添加类名active
            ul.style.transition=`margin-left ${transitionInterval}ms ${ease}`;//设置transition属性
            ul.style.marginLeft=-index*width+"px";//改变ul的margin-left
            i=index;//改变i为当前小圆点的下标（小圆点下标与每张图片下标对应）
          }
          isAuto&&auto();//如果isAuto==false,auto()不执行
        }
      });
    // })
  }
  //自动轮播
  function auto(){
    clearInterval(timer);//每次设置定时器先清除;
    timer=setInterval(function(){
      if(i==num){
        i=0;
        ul.style.transition="none";//取消transition属性
        ul.style.marginLeft="0";//直接移到第一张图
      }
      i++; 
      var marginLeft=parseInt(getComputedStyle(ul).marginLeft);//获得计算后的marginLeft并去掉px
      ul.style.transition=`margin-left ${transitionInterval}ms ${ease}`;//设置transition属性
      if(discs.length!=0){
        for(var item of discs){
          item.className=item.className.replace("active","");//清除所有小圆点的active类名
        }
        discs[i%num].className+=" active";//当前小圆点添加active类名（i==num第一个小圆点添加类名）
      }
      ul.style.marginLeft=marginLeft-width+"px";
    },autoInterval)
  }
  if(isAuto){//如果设置自动轮播
    auto();
    //给图片绑定鼠标移入移出事件
    ul.onmouseenter=(e)=>{
      clearInterval(timer);
    }
    ul.onmouseleave=(e)=>{
      auto();
    }
  }  
}