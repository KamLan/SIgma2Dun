<template>
  <div class="home">
    <h4>Selection de l'entrepôt</h4>
    <div class="entrepot">
      <p>Sélectionner un entrepôt pour commencer:</p>
      <select class="custom-select" id="entrepotValeur">
        <option value="entrepot1">Entrepôt 1</option>
        <option value="entrepot2">Entrepôt 2</option>
        <option value="entrepot3">Entrepôt 3</option>
        <option value="entrepot4">Entrepôt 4</option>
      </select>
      <br>
      <button href class="btn btn-success" @click="setEntrepot">
        <img src=".././assets/checked.png" alt>
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
export default {
  name: "Home",
  methods: {
    //method to write in the file
    writeFile(str) {
      if (!logOb) return;
      var log = str + " [" + new Date() + "]\n";
      console.log("going to log " + log);
      logOb.createWriter(function(fileWriter) {
        fileWriter.seek(fileWriter.length);

        var blob = new Blob([log], { type: "text/plain" });
        fileWriter.write(blob);
        console.log("ok, in theory i worked");
      }, fail);
    },
    //method grouping creation, writing and checking the file
    FileInitiation: function() {
      document.addEventListener("deviceready", onDeviceReady, false);

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
              var str = "coucou";
              var log = str + "; [" + new Date() + "]\n";
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
    //Save the entrepot state
    setEntrepot: function() {
      var e = document.getElementById("entrepotValeur");
      var entrepot = e.options[e.selectedIndex].value;
      this.$store.commit("SET_ENTREPOT", entrepot);
      this.FileInitiation();
      this.$router.push({ path: "/sigma" });
    },
    saveGeoloc() {
      return this.$store.commit("SET_GEOLOC", geoloc);
    },
    getGeolocValue() {
      return this.$store.getters.GEOLOC;
    }
  },
  created() {
    //Get geolocation
    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
      if (!navigator.geolocation) {
        console.log("plugin not working");
        alert("Error: Plugin not working!");
      } else {
        console.log("plugin working");
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
          timeout: 1000
        });
      }

      function onSuccess(position) {
        console.log("position", position);
        var geoloc =
          "latitude: " +
          position.latitude +
          ", longitude: " +
          position.longitude;
        this.saveGeoloc();
        console.log("stored Geoloc: ", this.getGeolocValue());
      }

      function onError(error) {
        alert(
          "code: " + error.code + "\n" + "message: " + error.message + "\n"
        );
      }
    }
  },
  computed: {
    //Display saved entrepot state
    showEntrepot: function() {
      return this.$store.getters.ENTREPOT;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.home {
  margin-top: 10%;
}
h3 {
  margin: 40px 0 0;
}
select {
  width: 90%;
  height: 100px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
button {
  margin-top: 5%;
  padding-top: 10px;
  padding-bottom: 10px;
}
button img {
  width: 60px;
}
</style>
