//定义变量设置初始值flase,验证通过改为true，所有为true验证通过
(function(){
	var ischeckUname=false;
	var ischeckUpwd=false;
	var ischeckUcpwd=false;
	var ischeckEmail=false;
	//查找触发事件的元素
	var uname=$("uname");
	var upwd=$("upwd");
	var cpwd=$("cpwd");
	var email=$("email");
	var cnumber=$("cnumber");
	var reg_btn=$("reg_btn");
	//要修改样式的元素
	var showUname=$("showUname");
	var showUpwd=$("showUpwd");
	var showCpwd=$("showCpwd");
	var showEmail=$("showEmail");
	//绑定获得焦点事件
	uname.addEventListener("focus",function(){
		true_style(showUname,uname,"请填写手机号");
	});
	upwd.addEventListener("focus",function(){
		true_style(showUpwd,upwd,"请填写密码");
	});
	cpwd.addEventListener("focus",function(){
		true_style(showCpwd,cpwd,"请再次填写密码");
	});
	email.addEventListener("focus",function(){
		true_style(showEmail,email,"请填写邮箱");
	});
	var showCnumber=document.getElementsByClassName("showCnumber")[0];
	cnumber.addEventListener("focus",function(){
		true_style(showCnumber,cnumber,"请填写右图中显示的验证码");
	});
	//绑定失去焦点事件,失去焦点执行函数
	uname.addEventListener("blur",checkUname);
	upwd.addEventListener("blur",checkUpwd);
	cpwd.addEventListener("blur",confirmUpwd);
	email.addEventListener("blur",checkEmail);
	cnumber.addEventListener("blur",function(){
		true_style(showCnumber,cnumber,"");
	});
	//注册按钮绑定点击事件
	reg_btn.addEventListener("click",check_reg);
	//验证正确和错误时改变span和input的部分样式
	function true_style(span,input,text){
		span.style="display:block;background-position-y:top";
		span.innerHTML=text;
		input.style="border-color:#000";
	}
	function false_style({span,input,text}){
		span.style="display:block";
		span.innerHTML=text;
		input.style="border-color:#f00";
	}

	//失去焦点事件
	//1.异步检测手机号	
	function checkUname(){
		var xhr=createXhr();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				var res=xhr.responseText;
				if(res==1){
					//检测手机号格式
					var reg=/^1[3-8]\d{9}$/;
					if(reg.test(uname.value)){
						true_style(showUname,uname,"手机号可用");
						ischeckUname=true;
					}else{
						false_style({span:showUname,input:uname,text:"请输入正确格式的手机号"});
						ischeckUname=false;
					}
				}else if(res==0){
					false_style({span:showUname,input:uname,text:"手机号已被占用"});
					ischeckUname=false;
				}else{
					//异步请求的结果是undefined
					false_style({span:showUname,input:uname,text:"手机号不能为空"});
					ischeckUname=false;
				}
			}
		}
		xhr.open("get","http://127.0.0.1:80/user/checkUname?uname="+uname.value,true);
		xhr.send(null);
	}
	//2.检测用户是否填写密码
	function checkUpwd(){
		var reg=/^\w{6,20}$/;
		if(reg.test(upwd.value)){
			true_style(showUpwd,upwd,"");
			ischeckUpwd=true;
		}else{
			false_style({span:showUpwd,input:upwd,text:"密码必须是6~20位字母、数字或下划线"});
			ischeckUpwd=false;
		}
		//当失去焦点时如果cpwd不为空,验证两次密码是否一致
		if(cpwd.value!==""){
			confirmUpwd();
		}
	}
	//3.验证两次密码是否一致
	function confirmUpwd(){
		var reg=/^\w{6,20}$/;
		if(!reg.test(cpwd.value)){
			false_style({span:showCpwd,input:cpwd,text:"密码必须是6~20位字母、数字或下划线"});
			ischeckUcpwd=false;
		}else if(upwd.value==cpwd.value){
			true_style(showCpwd,cpwd,"两次密码一致");
			ischeckUcpwd=true;
		}else{
			false_style({span:showCpwd,input:cpwd,text:"两次填写的密码必须一致"});
			ischeckUcpwd=false;
		}
	}
	//4.异步验证邮箱是否可用
	function checkEmail(){
		var xhr=createXhr();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				var res=xhr.responseText;
				if(res=="1"){
					//如果数据库中未查到，验证邮箱格式
					var reg=/\w+@[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)+/;
					if(reg.test(email.value)){
						true_style(showEmail,email,"邮箱可用");
						ischeckEmail=true;
					}else{
						false_style({span:showEmail,input:email,text:"请输入正确格式的邮箱"});
						ischeckEmail=false;
					}
				}else if(res=="0"){
					false_style({span:showEmail,input:email,text:"邮箱已被占用"});
					ischeckEmail=false;
				}else{
					false_style({span:showEmail,input:email,text:"邮箱不能为空"});
					ischeckEmail=false;
				}
			}
		}
		xhr.open("get","http://127.0.0.1:80/user/checkEmail?email="+email.value,true);
		xhr.send(null);
	}
	//点击按钮时判断是否可以注册，注册成功后跳转登录页面
	function check_reg(){
		if(ischeckUname==true && ischeckUpwd==true&&ischeckUcpwd==true&&ischeckEmail==true){
			var xhr=createXhr();
			xhr.onreadystatechange=function(){
				if(xhr.readyState==4&&xhr.status==200){
					var res=xhr.responseText;
					if(res=="1"){
						alert("注册成功");
						location.href="http://127.0.0.1:80/user_login.html";
					}
				}
			}
			xhr.open("post","http://127.0.0.1:80/user/register",true);
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			var formdata="uname="+uname.value+"&upwd="+upwd.value+"&email="+email.value;
			xhr.send(formdata);
		}else{
			checkUname();
			checkUpwd();
			confirmUpwd();
			checkEmail();
		}
	}
})()