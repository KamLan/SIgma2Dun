<template>
  <div class="sigma">
    <h4>Scan du code Sigma</h4>
    <div class="entrepot">
      <input class="form-control" type="text" v-model="showEntrepot" value="Entrepôt 2 - Libellé" disabled>
    </div>
    <div class="article">
      <input class="form-control" type="number" onclick="this.select()" v-model="showArticle" placeholder="Selection Article" id="chk_ean13">
      <input type="number"  class="form-control" onclick="this.select()" v-model="showVL" placeholder="Selection VL" id="valeurVL"> 
    </div>
    <div class="col-md-12 buttons">
        <div>
          <button href="#" class="btn btn-success" @click='setArticleAndVL'>
            <font-awesome-icon icon="coffee"/>
            <img src=".././assets/checked.png" alt="">
          </button>
        </div>
        <div class="button-margin">
          <button href="/#/sigma" id="scanButton" class="btn btn-success" @mousedown="scan" @mouseleave="stopScan" @mouseup="stopScan" 
          @touchstart="scan" @touchend="stopScan" @touchcancel="stopScan">
            <img src=".././assets/barcode.png" alt="">
          </button>
        </div>
        <div class="button-margin">
          <button href="" class="btn btn-success"> 
            <router-link to="/">
             <img src=".././assets/undo-button.png" alt="">
            </router-link>
          </button>
        </div>
    </div>
  </div>
</template>

<script> 
import zebra from './../scripts/zebra.js'
  export default {
    name: 'Sigma',
    data(){
      return {
        Entrepot: this.$store.getters.ENTREPOT
      }
    },
    methods:{
      //Start scan
      scan: function(){
        zebra.startSoftTrigger();
      },
      //Stop scan
      stopScan: function(){
        zebra.stopSoftTrigger();
      },
      //Save the article and VL states + check if inputs are empty
      setArticleAndVL: function(){
        var article = document.getElementById('chk_ean13').value;
        var vl = document.getElementById('valeurVL').value;
        if(article==''){
          //this.$router.push({path:'/sigma'});
          this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Erreur',
          text: 'Le code Sigma ne peut être vide',
          classes: 'notif'
          })
        }
        else if(vl==''){
          //this.$router.push({path:'/sigma'});
          this.$notify({
          group: 'foo',
          type: 'error',
          title: 'Erreur',
          text: 'Le code VL ne peut être vide',
          })
        }
        else{
          this.$store.commit('SET_ARTICLE', article);
          this.$store.commit('SET_VL', vl);
          this.$router.push({path:'/dun'});
        } 
      }
    },
    created(){
    
    },
    computed:{
      //initialize device for scan
      initializeScan(){
        zebra.app.initialize();
        zebra.app.onDeviceReady();
        return "ok";
      },
      //Displpay saved entrepot state
      showEntrepot() {
        return this.$store.getters.ENTREPOT;
      },
      //Displpay saved article state
      showArticle(){
        return this.$store.getters.ARTICLE; 
      },
      //Displpay saved VL state 
      showVL(){
        return this.$store.getters.VL;
      },
      //Displpay saved DUN state
      showDUN(){
        return this.$store.getters.DUN;
      } 
    }
  }
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.sigma{
   margin-top:10%;
}
h3 {
  margin: 40px 0 0;
}
input{
    margin-left:5%;
    width:90%;
    height:90px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
button{
  padding-top:10px;
  padding-bottom:10px;
  color:white;
  text-decoration: none
}
img{
  width: 60px;
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
.vue-notification{
  font-size:20px!important;
}
</style>
