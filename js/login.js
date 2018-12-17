$(function(){
  // 点击切换登陆方式
  $("a.wx_login").click(function(){
    var $a=$(this);
    $a.removeClass("font_gray1").addClass("font_bold font_orange1")
      .prev().removeClass("font_bold font_orange1").addClass("font_gray1")  
    $a.parent().next().children(":first-child").hide()
                            .next().show(); 
  });
  $("a.normal_login").click(function(){
    var $a=$(this);
    $a.removeClass("font_gray1").addClass("font_bold font_orange1")
      .next().removeClass("font_bold font_orange1").addClass("font_gray1") 
    $a.parent().next().children(":last-child").hide()
                            .prev().show(); 
  });
  //查找触发事件的元素
  $("form")
  //绑定事件处理函数
  .submit(function(e){
    e.preventDefault();
    var uname=$("[name=uname]").val();
    var upwd=$("[name=upwd]").val();
    var msg1=$("[name=uname]").next();
    var msg2=$("[name=upwd]").next();
    var reg=/^\w{6,20}$/;
    //如果用户名符合要求并且密码不为空时发送异步请求
    if(reg.test(uname)&&upwd!=""){
      $.ajax({
        url:"http://127.0.0.1:80/user/login",
        type:"get",
        data:{uname,upwd},
        dataType:"json",
        success:function(res){
          if(res.code=="200"){
            msg1.hide();
            msg2.hide();
            alert("登录成功");
            sessionStorage.setItem("uname",uname);
            location.href="index.html";
          }else{
            msg1.hide();
            msg2.show()
                .html("密码和账户不匹配，请重新输入");
          }
        }
      })
      // .then(res=>{
        
      // })
    //否则单独判断每个输入框的内容并改变对应样式
    }else{
      if(!reg.test(uname)){
        msg1.show();
        msg1.html("请输入6-20位数字、字母或下划线组成的用户名");
      }else{
        msg1.hide();
      }
      if(upwd==""){
        msg2.show();
        msg2.html("请输入密码");
      }else{
        msg2.hide();
      }
    }
  })

})




