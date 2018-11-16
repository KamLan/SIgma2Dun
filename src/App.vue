<template>
  <div id="app">
    <app-header></app-header>
    <app-date></app-date>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import DateVue from './components/Date.vue';
  export default {
    name: 'app',
    methods:{
        
    },
    components: {
      appHeader: Header,
      appDate: DateVue
    }
  }
</script>

<style>
img{
  width:30%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
div.header div{
  display:inline-block;
}
</style>
