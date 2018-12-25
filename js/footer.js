// 将头部当做js文件引入的方法，使用vue，必须在请求html文件后再监听
var head=document.getElementsByTagName("HEAD")[0];
var link=document.createElement("LINK");
link.rel="stylesheet";
link.href="css/footer.css";
head.appendChild(link);
axios.get("footer.html").then(res=>{
  document.querySelector("footer").innerHTML=res.data;
})