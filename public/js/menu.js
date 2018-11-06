async function getElementMenu(){
    let responseMenu = await fetch('/allMenu')
    let products = await responseMenu.json();
    await   console.log(products)
    await   new Promise((resolve, reject) => setTimeout(resolve, 0));
    await   create(products);
    for (let i = 0; i < document.getElementsByClassName('headerItemMenu').length;i++ ){
      document.getElementsByClassName('headerItemMenu')[i].onclick = ()=>{
    let idClassName = document.getElementsByClassName('headerItemMenu')[i].id

    for (let i=0;i < products.length;i++){
      if (products[i].id === idClassName){
        document.getElementById('enterKind').innerHTML = products[i].name.toUpperCase()
      }
    }
        filter(document.getElementsByClassName('headerItemMenu')[i].id , products[i].type);
      }
    }
    return products;
}
function filter (name,kind){
  //вот тут искать with если с ним то так, иначе что-то придумать
  console.log(name, kind);
  for (let i = 0; i < document.getElementsByClassName('ItemsCenter').length;i++ ){
    document.getElementsByClassName('ItemsCenter')[i].style.display='none';
  }
  for (let i = 0; i < document.getElementsByClassName('menuItemWith').length;i++ ){
  document.getElementsByClassName('menuItemWith')[i].style.display='none';
}
if (kind !==undefined){
      for (let i = 0; i < document.getElementsByClassName(name).length;i++ ){
      document.getElementsByClassName(name)[i].style.display='block';
  }
} else {  for (let i = 0; i < document.getElementsByClassName(name).length;i++ ){
 document.getElementsByClassName(name)[i].style.display='flex';
}}



}

async function getMenuWith(){
    let responseMenu = await fetch('/menuWith');
    let responseMenuWithout = await fetch('/menuWithout');
    let productsWithout = await responseMenuWithout.json();
    let products = await responseMenu.json();
    console.log(products);
    console.log(productsWithout);
    await   new Promise((resolve, reject) => setTimeout(resolve, 0));
    await   createMenuPretty(products);
    await   createMenuPrettyWithout(productsWithout);
    let items = products.concat(productsWithout)
    await   console.log(items);
    return items;
}

window.onload = () => {
  let items = getElementMenu();
  let menuWith = getMenuWith();
}

function create(items){
    for (var i=0; i<items.length; i++){
            const  div = document.createElement("div");
             div.className = 'headerItemMenu';
             div.id = items[i].id;
             document.getElementById('centerMainHeader').appendChild(div);

             const  img = document.createElement("img");
             img.className = 'headerItemMenuImage';
             img.src = "../public/image/allMenu/"+items[i].id+'.jpg';
             document.getElementById(div.id).appendChild(img);

             const  text = document.createElement("div");
             text.className = 'headerItemMenuDiscription';
             text.innerHTML = items[i].name;
             document.getElementById(div.id).appendChild(text );
    }
  console.log('createheader')
}
function arrayUnique(massivKind){
    return massivKind.filter((e,i,a)=>a.indexOf(e)==i)
};

function createMenuPrettyWithout(items){
  console.log(items);

let massivKind = [];
for (let i=0;i<items.length;i++){
  massivKind[i] =  items[i].kind;
}

console.log(massivKind);
massivKind = arrayUnique(massivKind);
console.log(massivKind);

for (let i=0;i<massivKind.length;i++){
  const  div = document.createElement("div");
  div.className = 'menuItemWith '+massivKind[i];
  div.id = '00'+massivKind[i];
  div.style.display = 'none'
  document.getElementById('centerMain').appendChild(div);

  const  img = document.createElement("div");
  img.className = 'menuItemWithPhoto ';
  //img.src  = "public/image/"+massivKind[i]+".jpg";
  img.style.backgroundImage = "url(public/image/"+massivKind[i]+".jpg)";
  document.getElementById(div.id).appendChild(img);


  var  discription = document.createElement("div");
  discription.className = 'menuItemWithDiscription ';
  discription.id = 'discription'+massivKind[i];
  document.getElementById(div.id).appendChild(discription);
}
        for (var i=0; i<items.length; i++){
          const  text = document.createElement("div");
          text.className = 'menuItemWithDiscriptionText';
          text.id = 'discriptionText'+items[i].kind;
          document.getElementById('discription'+items[i].kind).appendChild(text);

            const  name = document.createElement("div");
            name.className = 'menuItemWithDiscriptionTextGram';
            name.innerHTML = items[i].name;
            document.getElementById('discription'+items[i].kind).appendChild(name);

            const  gram = document.createElement("div");
            gram.className = 'menuItemWithDiscriptionTextGram';
            gram.innerHTML = items[i].gram;
            document.getElementById('discription'+items[i].kind).appendChild(gram);

            const  price = document.createElement("div");
            price.className = 'menuItemWithDiscriptionTextGram';
            price.innerHTML = items[i].price;
            document.getElementById('discription'+items[i].kind).appendChild(price);
        }

}

function createMenuPretty(items){

  for (var i=0; i<items.length; i++){
      const  div = document.createElement("div");
       div.className = 'ItemsCenter '+items[i].kind;
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
         weight.innerHTML =  items[i].gram;
       document.getElementById(addCart.id).appendChild(weight);

     const pPrice = document.createElement("div");
       pPrice.className = 'pPrice';
       pPrice.innerHTML =  items[i].price
     document.getElementById(addCart.id).appendChild(pPrice);
console.log(items[i]);
if (items[i].gram1!==undefined){

   const addCart = document.createElement("div");
   addCart.className = 'addCart';
   addCart.id = items[i].id + items[i].gram1;
   document.getElementById(div.id).appendChild(addCart);

   const weight = document.createElement("div");
     weight.className = 'weight';
       weight.innerHTML =  items[i].gram1 ;
     document.getElementById(addCart.id).appendChild(weight);

   const pPrice = document.createElement("div");
     pPrice.className = 'pPrice';
     pPrice.innerHTML =  items[i].price1
   document.getElementById(addCart.id).appendChild(pPrice);

 }
 }

}
