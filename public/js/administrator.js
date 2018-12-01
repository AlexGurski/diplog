(async function getGaleryFolber(){
    let responseMenu = await fetch('/galeryFolber')
    let products = await responseMenu.json();
    console.log(products);
    for (var i=0; i<products.length; i++){
            const  div = document.createElement("div");
             div.className = 'folberName';
             div.id = products[i];
             div.innerHTML = products[i];
             document.getElementsByClassName('galeryList')[0].appendChild(div);

             const  div1 = document.createElement("div");
              div1.className = 'folberName folberName1';
              div1.id = products[i];
              div1.innerHTML = products[i];
              document.getElementsByClassName('galeryList')[1].appendChild(div1);

    }

    var   addCart = await document.getElementsByClassName('folberName');
  var   addCart1 = await document.getElementsByClassName('folberName1');

      for(var i=0; i < addCart.length; i++){
        addCart[i].onclick = function(){
          document.getElementById('folberText').value= this.id;
        };
      }

      for(var i=0; i < addCart1.length; i++){
        addCart1[i].onclick = function(){
          document.getElementById('deleteTextInput').value= this.id;
        };
      }
 })()
