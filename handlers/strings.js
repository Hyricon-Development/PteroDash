module.exports = {
    
    makeid(length) {

         var id = "";
         var gen = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
         var GenLength = gen.length;
         for (var i = 0; i < length; i++) { 
             id += gen.charAt(Math.floor(Math.random() * GenLength));
         }
         return id;
     }
  }