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
      <button href="" class="btn btn-success" @click="setEntrepot"> 
          <img src=".././assets/checked.png" alt="">
      </button>
    </div>
  </div>
    
</template>

<script>
  export default {
    name: 'Home',
    methods:{
       writeFile(fileEntry, dataObj) {
          // Create a FileWriter object for our FileEntry (log.txt).
          fileEntry.createWriter(function (fileWriter) {

              fileWriter.onwriteend = function() {
                 // eslint-disable-next-line
                  console.log("Successful file read...");
                  readFile(fileEntry);
              };

              fileWriter.onerror = function (e) {
                 // eslint-disable-next-line
                  console.log("Failed file read: " + e.toString());
              };

              // If we are appending data to file, go to the end of the file.
              if (isAppend) {
                  try {
                      fileWriter.seek(fileWriter.length);
                  }
                  catch (e) {
                     // eslint-disable-next-line
                      console.log("file doesn't exist!");
                  }
              }
              fileWriter.write(dataObj);
          });
      },
      FileInitiation: function(){
        var path = "file///sdcard/Download/Sigma2DUN/files/"
        var fileName = "test.csv"
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
           // eslint-disable-next-line
          console.log("External directory ",cordova.file.externalDataDirectory)
          window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function(dir) {
            console.log("got maind dir ", dir)
            dir.getFile("zog.txt", {create:true}, function(file){
              console.log("got the file ", file);
            })
          })
        }
      },
      createFile: function(dirEntry, fileName){
        dirEntry.getFile(fileName, {create: true, exclusive:false}, function(fileEntry){
          this.writeFile(fileEntry, null)
        })
      },
       //Save the entrepot state
      setEntrepot: function(){
        var e = document.getElementById('entrepotValeur');
        var entrepot = e.options[e.selectedIndex].value;
        this.$store.commit('SET_ENTREPOT', entrepot);
        this.FileInitiation()
        this.$router.push({path:'/sigma'});
      }
    },
    computed:{
      //Displpay saved entrepot state
      showEntrepot: function() {
        return this.$store.getters.ENTREPOT;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.home{
  margin-top:10%;
}
h3 {
  margin: 40px 0 0;
}
select{
  width:90%;
  height:100px;
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
  margin-top:5%;
  padding-top:10px;
  padding-bottom:10px;
}
button img{
  width:60px;
}
</style>
