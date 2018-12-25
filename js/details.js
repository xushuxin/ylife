new Vue({
  el:"#section",
  data(){
    return{
      list:[],
      isAtten:false,
      bgStyle:{backgroundImage:`url("http://127.0.0.1:80/images/s-love.png")`}
    }
  },
  methods:{
    changeRed(){
      var isAtten=this.isAtten;
      if(isAtten){
        this.bgStyle.backgroundImage=`url("http://127.0.0.1:80/images/s-love.png")`;
        this.isAtten=false;
      }else{
        this.bgStyle.backgroundImage=`url("http://127.0.0.1:80/images/sd-love.png")`;
        this.isAtten=true;
      }
    }
  },
  mounted(){
    (function(){
      myCarousel({el:".sImg",num:6,showNum:5,width:62,isAuto:false,isCircle:false});
    })();
  }
})

