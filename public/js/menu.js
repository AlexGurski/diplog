
async function getElementMenu(){
    let responseMenu = await fetch('/allMenu')
    let products = await responseMenu.json();
    await   console.log(products)
    await   new Promise((resolve, reject) => setTimeout(resolve, 0));
    items = products
    create(items);
    return items;
}

async function getMenuWith(){
    let responseMenu = await fetch('/menuWith')
    let products = await responseMenu.json();
    await   console.log(products)
    await   new Promise((resolve, reject) => setTimeout(resolve, 0));
    items = products
    createMenuPretty(items);
    return items;
}
window.onload = () => {
  let items = getElementMenu();
  let menuWith = getMenuWith();
  console.log(items);
  console.log(menuWith);
}

function create(items){
    for (var i=0; i<items.length; i++){
            const  div = document.createElement("div");
             div.className = 'headeritemMenu';
             div.id = items[i].id;
             document.getElementById('centerMainHeader').appendChild(div);

             const  img = document.createElement("img");
             img.className = 'headeritemMenuImage';
             img.src = "../public/image/allMenu/"+items[i].id+'.jpg';
             document.getElementById(div.id).appendChild(img);

             const  text = document.createElement("div");
             text.className = 'headeritemMenuDiscription';
             text.innerHTML = items[i].name;
             document.getElementById(div.id).appendChild(text );
    }
}
function createMenuPretty(items){

  for (var i=0; i<items.length; i++){

      const  div = document.createElement("div");
       div.className = 'ItemsCenter';
       div.id = '00'+items[i].id;
       document.getElementById('centerMain').appendChild(div);

//ТУТ БУДЕТ ТРЕШАК!!!!

    const  img = document.createElement("div");
     img.className = 'imageMenu';
     img.id = i + items[i].id;
     document.getElementById(div.id).appendChild(img);

        const conteiner = document.createElement("div");
        conteiner.className = 'container';
        conteiner.id = items[i].id + i;
        document.getElementById(img.id).appendChild(conteiner);

          const front = document.createElement("div");
          front.className = 'front';
          front.id = '123'+ items[i].id;
          front.style.backgroundImage = "url(public/image/menuPhoto/"+items[i].id+".jpg)";
          document.getElementById(conteiner.id).appendChild(front);



          const back = document.createElement("div");
          back.className = 'back';
          back.id = i + items[i].id + i;
          document.getElementById(conteiner.id).appendChild(back);

                     const pDisc = document.createElement("p");
                      pDisc.className = 'inner';
                      pDisc.innerHTML =  items[i].discription;
                     document.getElementById(back.id).appendChild(pDisc);

     ///////////////////////////
     const  pName = document.createElement("p");
       pName.className = 'pName';
       pName.innerHTML =  items[i].name;
     document.getElementById(div.id).appendChild(pName);

     const addCart = document.createElement("div");
     addCart.className = 'addCart';
     addCart.id = items[i].id;
     document.getElementById(div.id).appendChild(addCart);

     const weight = document.createElement("div");
       weight.className = 'weight';
         weight.innerHTML =  items[i].gram + ' гр.';
       document.getElementById(addCart.id).appendChild(weight);

     const pPrice = document.createElement("p");
       pPrice.className = 'pPrice';
       pPrice.innerHTML =  items[i].price
     document.getElementById(addCart.id).appendChild(pPrice);

if (items[i].gram1!==undefined){


   const addCart = document.createElement("div");
   addCart.className = 'addCart';
   addCart.id = items[i].id + items[i].gram1;
   document.getElementById(div.id).appendChild(addCart);

   const weight = document.createElement("div");
     weight.className = 'weight';
       weight.innerHTML =  items[i].gram1 + ' гр.';
     document.getElementById(addCart.id).appendChild(weight);

   const pPrice = document.createElement("p");
     pPrice.className = 'pPrice';
     pPrice.innerHTML =  items[i].price1
   document.getElementById(addCart.id).appendChild(pPrice);

 }
 }

}
