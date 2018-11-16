<template>
  <div class="dun">
    <h4>Scan du code Dun</h4>
    <div class="entrepot">
      <input  class="form-control" type="text" v-model="showEntrepot" value="Entrepôt 2 - Libellé" disabled>
    </div>
    <div class="article">
      <input  class="form-control" type="text" v-model="showArticle" value="Article - BBBBB BBB 0000000000000000" disabled>
      <input  class="form-control" type="text" v-model="showVL" value="EAN - BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB" disabled>
    </div> <br>
    <div class="div-dun">
      <input  class="form-control" type="text" placeholder="DUN" id="valeurDUN"> <br>
    </div>
    <div class="col-md-12 buttons">
        <div>
          <button class="btn btn-success" v-on:click="alert">Vérification</button>
        </div>
        <div class="button-margin">
          <button class="btn btn-success" v-on:click="setDUN">Valider</button>
        </div>
        <div class="button-margin">
          <button href="/#/dun" id="scanButton" class="btn btn-success" @mousedown="scan" @mouseleave="stopScan" @mouseup="stopScan" 
          @touchstart="scan" @touchend="stopScan" @touchcancel="stopScan">Scanner</button>
        </div>
    </div> <br>
       <a href="" class="btn btn-success"> <router-link to="/sigma">retour</router-link> <br></a>
       <a href="" class="btn btn-success button-margin"> <router-link to="/sigma">Nouvelle association</router-link> <br></a>
  </div>
</template>

<script>
import zebra from './../scripts/zebra.js'
export default {
  name: 'Dun',
  methods: {
    alert: function () {
      alert('Contrôle OK ')
    },
    scan: function(){
      zebra.app.initialize();
      zebra.startSoftTrigger();
    },
    stopScan: function(){
      zebra.stopSoftTrigger();
    },
    setDUN: function(){
      var dun = document.getElementById('valeurDUN').value;
      this.$store.commit('SET_DUN', dun);
    }
  },
  computed:{
      showEntrepot() {
        return this.$store.getters.ENTREPOT;
      },
      showArticle(){
        return this.$store.getters.ARTICLE; 
      }, 
      showVL(){
        return this.$store.getters.VL;
      }, 
      showDUN(){
        return this.$store.getters.DUN;
      } 
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
input{
  width: 80%;
  margin-left:10%;
}
a{
  color:white;
  text-decoration: none
}
a:hover{
  text-decoration:none;
  color:white;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
div.buttons{
  margin-top:5%;
}
div.buttons div{
  display:inline-block;
}
div.button-margin, a.button-margin{
  margin-left:1%;
}
</style>
