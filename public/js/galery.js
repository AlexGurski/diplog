(async function getGaleryFolber(){
    let responseMenu = await fetch('/galeryFolber')
    let products = await responseMenu.json();
    console.log(products);

    for (var i=0; i<products.length; i++){
            const  div = document.createElement("div");
             div.className = 'folberName';
             div.id = products[i];
             div.innerHTML = products[i];
             document.getElementsByClassName('extraItems')[0].appendChild(div);
    }
    console.log(document.getElementsByClassName('folberName'));
    var   addCart = await document.getElementsByClassName('folberName');

      for(var i=0; i < addCart.length; i++){
        addCart[i].onclick = addPhoto;
      }
 })()


 function addPhoto(){
   console.log(this.id);
   var xhr = new XMLHttpRequest();
   let body = 'name='+encodeURIComponent(this.id);
   xhr.open("POST", '/getFilesInFolber', false);
   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   xhr.send(body);
   //return xhr.responseText;


   while (document.getElementsByClassName("delAfter").length > 0){
       document.getElementsByClassName("delAfter")[delCount=document.getElementsByClassName("delAfter").length-1].remove();
  }

   setTimeout(()=>{
    let image = JSON.parse(xhr.responseText);
      for (let i=0;i<image.length;i++){
        const img = document.createElement("img");
        img.className = 'delAfter';
        img.src="./public/image/galery/"+this.id+"/"+image[i];
        img.setAttribute('tabindex', '0');
        document.getElementsByClassName("photo-grid")[0].appendChild(img);
      }
  },10)
}
