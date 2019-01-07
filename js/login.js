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
      axios.defaults.withCredentials=true;
      axios.post("http://127.0.0.1:80/user/login","uname="+uname+"&upwd="+upwd).then(res=>{
        console.log(res);
        if(res.data.code=="200"){
          msg1.hide();
          msg2.hide();
          alert(res.data.msg);
          var user_name=res.data.user_name;
          var uid=res.data.uid;
          if(user_name){//如果用户姓名不为空，保存用户姓名
            sessionStorage.setItem("name",user_name);
          }else{//否则保存用户名
            sessionStorage.setItem("name",uname);
          }
          sessionStorage.setItem("uid",uid);//保存用户id
          location.href="index.html";
        }else{
          msg1.hide();
          msg2.show()
              .html("密码和账户不匹配，请重新输入");
        }
      })
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




