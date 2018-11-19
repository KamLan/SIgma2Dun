<template>
  <div class="sigma">
    <h4>Scan du code Sigma</h4>
    <div class="entrepot">
      <input class="form-control" type="text" v-model="showEntrepot" value="Entrepôt 2 - Libellé" disabled>
    </div> <br>
    <div class="article">
      <input class="form-control" type="text" placeholder="Selection Article" id="chk_ean13"> <br>
      <input type="text"  class="form-control" placeholder="Selection VL" id="valeurVL"> <br>
    </div>
    <div class="col-md-12 buttons">
        <div>
          <a href="#" class="btn btn-success" @click='setArticleAndVL'>Valider</a>
        </div>
        <div class="button-margin">
          <button href="/#/sigma" id="scanButton" class="btn btn-success" @mousedown="scan" @mouseleave="stopScan" @mouseup="stopScan" 
          @touchstart="scan" @touchend="stopScan" @touchcancel="stopScan">Scanner</button>
        </div>
        <div class="button-margin">
          <a href="" class="btn btn-success"> <router-link to="/">retour</router-link> <br></a>
        </div>
    </div>
  </div>
</template>

<script> 
import zebra from './../scripts/zebra.js'
import router from './../router'
  export default {
    name: 'Sigma',
    data(){
      return {
        Entrepot: this.$store.getters.ENTREPOT
      }
    },
    methods:{
      scan: function(){
        zebra.startSoftTrigger();
      },
      stopScan: function(){
        zebra.stopSoftTrigger();
      },
      setArticleAndVL: function(){
        var article = document.getElementById('chk_ean13').value;
        var vl = document.getElementById('valeurVL').value;
        if(article==''){
          alert("Le code Sigma ne peut être vide")
          this.$router.push({path:'/sigma'})
        }
        else if(vl==''){
          alert("Le code VL ne peut être vide")
          this.$router.push({path:'/sigma'})
        }
        else{
          this.$store.commit('SET_ARTICLE', article);
          this.$store.commit('SET_VL', vl);
          console.log('article', article)
          this.$router.push({path:'/dun'})
        } 
      }
    },
    created(){
    
    },
    computed:{
      initializeScan(){
        zebra.app.initialize();
        zebra.app.onDeviceReady();
        return "ok";
      },
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
    margin-left:10%;
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
  color:white;
  text-decoration: none
}
a:hover{
  text-decoration:none;
  color:white;
}
div.buttons{
  margin-top:5%;
}
div.buttons div{
  display:inline-block;
}
div.button-margin{
  margin-left:1%;
}
</style>
