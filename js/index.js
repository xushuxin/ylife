new Vue({
  el:"#section>.carousel",/*忘记写了*/
  data(){
    return{
      carousel_list:[],
    }
  },
  methods:{
    getcarousel(){
      axios.get("http://127.0.0.1:80/carousel").then(res=>{
        this.carousel_list=res.data.list;
        console.log(this.carousel_list[0].src)
      })
    }
  },
  created(){
    this.getcarousel();
  }
})

