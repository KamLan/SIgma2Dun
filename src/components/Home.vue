<template>
  <div class="home">
    <h4>Selection de l'entrepôt</h4>
    <div class="entrepot">
      <p>
        Sélectionner un entrepôt pour commencer:
      </p>
      <select class="custom-select" id="entrepotValeur">
        <option value="entrepot1">Entrepôt 1</option>
        <option value="entrepot2">Entrepôt 2</option>
        <option value="entrepot3">Entrepôt 3</option>
        <option value="entrepot4">Entrepôt 4</option>
      </select> <br>
      <a href="" class="btn btn-success" @click="setEntrepot"> <router-link to="/sigma">Valider</router-link></a>
      <!-- <a href="" class="btn btn-success"> <router-link to="/zebra">test</router-link> <br></a> -->
    </div>
  </div>
    
</template>

<script>
  export default {
    name: 'Home',
    methods:{
      setEntrepot: function(){
        var e = document.getElementById('entrepotValeur');
        var entrepot = e.options[e.selectedIndex].value;
        this.$store.commit('SET_ENTREPOT', entrepot);
      }
    },
    computed:{
      showEntrepot: function() {
        return this.$store.getters.ENTREPOT;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
select{
  width:80%;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a{
  margin-top:10%;
  color:white;
  text-decoration: none
}
a:hover{
  text-decoration:none;
  color:white;
}
</style>
