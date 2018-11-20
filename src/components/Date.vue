<template>
  <div class="header">
      <div class="dateTime" >
        {{ date }} 
        {{ hour }}
      </div>
  </div>  
</template>

<script>
  export default {
    name: 'Date',
    data: function() {
       return {
           hour: '',
           date: '',
           refresh: ''
       }
    },
    methods : {
      getDate(){
        var fulldate = new Date;
        var y = fulldate.getFullYear();
        var m = fulldate.getMonth();
        var d = fulldate.getDate();
        var DateComplete = d + "/" + m + "/" + y;
        this.date = DateComplete;
        return DateComplete;
      },
      getTime(){
        var fulltime = new Date;
        var h = fulltime.getHours();
        var m = '0'+fulltime.getMinutes();
        m = m.slice(-2);
        var s = '0'+fulltime.getSeconds();
        s = s.slice(-2);   
        var HeureComplete = h + ":" + m + ":" + s;
        this.hour = HeureComplete;
        return HeureComplete;
      }
    },
    created () {
      this.$options.interval = setInterval(this.getTime, 1000)
      this.getDate();
      this.getTime();
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    div.header{
        margin-bottom:5%;
    }
</style>
