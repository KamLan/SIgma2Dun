<template>
  <div id="app">
    <app-header></app-header>
    <notifications group="foo" position='top center' max="3" width='100%' />
    <app-date></app-date>
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/Header.vue';
  import DateVue from './components/Date.vue';
  export default {
    name: 'app',
    components: {
      // eslint-disable-next-line
      appHeader: Header,
      // eslint-disable-next-line
      appDate: DateVue
    },
    methods:{
    }
  }
</script>

<style>
.vue-notification .notification-title, .vue-notification .notification-content {
    font-size:20px;
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
