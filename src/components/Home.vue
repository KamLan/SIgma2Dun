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
       writeFile: function(fileEntry, dataObj) {
          // Create a FileWriter object for our FileEntry (log.txt).
          fileEntry.createWriter(function (fileWriter) {

              fileWriter.onwriteend = function() {
                  console.log("Successful file write...");
                  readFile(fileEntry);
              };

              fileWriter.onerror = function (e) {
                  console.log("Failed file write: " + e.toString());
              };

              // If data object is not passed in,
              // create a new Blob instead.
              if (!dataObj) {
                  dataObj = new Blob(['some file data'], { type: 'text/plain' });
              }

              fileWriter.write(dataObj);
          });
      },
      createCSVFile: function(){
        var path = "/sdcard/Download/Sigma2DUN/files/"
        var fileName = "test.csv"
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
          console.log('file system open: ' + fs.name);
          fs.root.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
              console.log("fileEntry is file?" + fileEntry.isFile.toString());
              fileEntry.name == fileName
              fileEntry.fullPath == path
              this.writeFile(fileEntry, 'coucou');
          });
        });
      },
       //Save the entrepot state
      setEntrepot: function(){
        var e = document.getElementById('entrepotValeur');
        var entrepot = e.options[e.selectedIndex].value;
        this.$store.commit('SET_ENTREPOT', entrepot);
        this.createCSVFile()
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
