<template>
  <div class="dun">
    <h4>Scan du code Dun</h4>
    <div class="entrepot">
      <input
        class="form-control form-dis"
        type="text"
        v-model="showEntrepot"
        value="Entrepôt 2 - Libellé"
        disabled
      >
    </div>
    <div class="article">
      <input
        class="form-control form-dis"
        type="number"
        v-model="showArticle"
        value="Article - BBBBB BBB 0000000000000000"
        disabled
      >
      <input
        class="form-control form-dis"
        type="number"
        v-model="showVL"
        value="EAN - BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
        disabled
      >
    </div>
    <div class="div-dun">
      <input
        class="form-control"
        type="number"
        onclick="this.select()"
        v-model="showDUN"
        placeholder="DUN"
        id="valeurDUN"
      >
    </div>
    <div class="col-md-12 buttons">
      <!-- <div>
          <button class="btn btn-success" v-on:click="validateDUN">Vérification</button>
      </div>-->
      <div>
        <button class="btn btn-success" v-on:click="setDUN">
          <img src=".././assets/checked.png" alt>
        </button>
      </div>
      <div class="button-margin">
        <button
          href="/#/dun"
          id="scanButton"
          class="btn btn-success"
          @mousedown="scan"
          @mouseleave="stopScan"
          @mouseup="stopScan"
          @touchstart="scan"
          @touchend="stopScan"
          @touchcancel="stopScan"
        >
          <img src=".././assets/barcode.png" alt>
        </button>
      </div>
      <div class="button-margin">
        <button href class="btn btn-success">
          <router-link to="/sigma">
            <img src=".././assets/undo-button.png" alt>
          </router-link>
        </button>
      </div>
    </div>

    <!-- <a href="" class="btn btn-success button-margin" v-on:click="clearState" > <router-link to="/sigma">Nouvelle association</router-link> <br></a> -->
  </div>
</template>

<script>
 /* eslint-disable */
import zebra from "./../scripts/zebra.js";
var Barcoder = require("barcoder");
export default {
  name: "Dun",
  data() {
    return {
      Entrepot: this.$store.getters.ENTREPOT,
      Article : this.$store.getters.ARTICLE,
      Vl: this.$store.getters.VL,
    };
  },
  methods: {
    //start scanner
    scan: function() {
      zebra.app.initialize();
      zebra.startSoftTrigger();
    },
    //stop scanner
    stopScan: function() {
      zebra.stopSoftTrigger();
    },
    //Check if DUN code is valid
    validateDUN: function(dun) {
      this.testBarcode = Barcoder.validate(dun);
      //console.log("barcode: ", Barcoder.validate(this.$store.getters.DUN));
      if (this.testBarcode == false) {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Erreur",
          text: "Le code barre n'est pas valide"
        });
        return false;
      } else {
        this.$notify({
          group: "foo",
          type: "success",
          title: "Success",
          text: "Le code barre est valide"
        });
        this.$notify({
          group: "foo",
          type: "success",
          title: "Success",
          text: "L'association est réalisée"
        });
        this.$router.push({ path: "/sigma" });
        return true;
      }
    },
    //Save DUN in the store
    setDUN: function() {
      var dun = document.getElementById("valeurDUN").value;
      if (dun == "") {
        this.$notify({
          group: "foo",
          type: "error",
          title: "Erreur",
          text: "Le code DUN ne peut être pas vide"
        });
        this.$router.push({ path: "/dun" });
      } else {
        this.$store.commit("SET_DUN", dun);
        var DunVaild = this.validateDUN(dun);
        if(DunVaild == true){
          var Article = this.$store.getters.ARTICLE;
          var Dun = this.$store.getters.DUN;
          var Vl = this.$store.getters.VL;
          this.writeFileAssociation(Article, Dun, Vl);
          this.clearState();
        }
        else{
          
        }
      }  
    },
    //Write association in the log file
    writeFileAssociation: function(article, dun, vl) {
      document.addEventListener("deviceready", onDeviceReady, false);
      console.log("in dat function", article, dun, vl)
      function onDeviceReady() {
        console.log("External directory ", cordova.file.externalDataDirectory);
        window.resolveLocalFileSystemURL(
          cordova.file.externalDataDirectory,
          function(dir) {
            console.log("got maind dir ", dir.nativeURL);
            dir.getFile("log.csv", { create: true }, function(file) {
              console.log("got the file ", file);
              var logOb = file;
              if (!logOb) return;

              var str = "Article: " + article + ";" + "Dun: " + dun + ";" + "Vl: " + vl + ";";
              var log = str + " [" + new Date() + "]\n";
              console.log("going to log " + log);
              logOb.createWriter(function(fileWriter) {
                fileWriter.seek(fileWriter.length);

                var blob = new Blob([log], { type: "text/plain" });
                fileWriter.write(blob);
                console.log("ok, in theory i worked");
              });

              logOb.file(function(file) {
                var reader = new FileReader();

                reader.onloadend = function(e) {
                  console.log(this.result);
                };

                reader.readAsText(file);
              });
            });
          }
        );
      }
    },
    //Clean the store states for new association
    clearState: function() {
      this.$store.commit("SET_ARTICLE", "");
      this.$store.commit("SET_VL", "");
      this.$store.commit("SET_DUN", "");
    }
  },
  computed: {
    //Displpay saved entrepot state
    showEntrepot() {
      return this.$store.getters.ENTREPOT;
    },
    //Displpay saved article state
    showArticle() {
      return this.$store.getters.ARTICLE;
    },
    //Displpay saved VL state
    showVL() {
      return this.$store.getters.VL;
    },
    //Displpay saved DUN state
    showDUN() {
      return this.$store.getters.DUN;
    }
  },
  mounted() {
    document.getElementById("valeurDUN").focus();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.dun {
  margin-top: 10%;
}
h3 {
  margin: 40px 0 0;
}
input {
  width: 90%;
  height: 90px;
  margin-left: 5%;
}
input.form-dis {
  height: 60px;
}
button {
  padding-top: 10px;
  padding-bottom: 10px;
}
button img {
  width: 60px;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
  color: white;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
div.buttons {
  margin-top: 5%;
}
div.buttons div {
  display: inline-block;
}
div.button-margin,
a.button-margin {
  margin-left: 1%;
}
</style>
