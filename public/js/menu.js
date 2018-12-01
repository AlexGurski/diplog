
async function getElementMenu(){
    let responseMenu = await fetch('/allMenu')
    let products = await responseMenu.json();
    await   create(products);
    console.log(products)
    for (let i = 0; i < document.getElementsByClassName('headerItemMenu').length;i++ ){
        document.getElementsByClassName('headerItemMenu')[i].onclick = ()=>{
        let idClassName = document.getElementsByClassName('headerItemMenu')[i].id

            for (let i=0;i < products.length;i++){
              if (products[i]._id === idClassName){
                document.getElementById('enterKind').innerHTML = products[i].name.toUpperCase()
              }
            }
            filter(document.getElementsByClassName('headerItemMenu')[i].id , products[i].type);
          }
    }
    return products;
 }

function filter (name,kind){
      for (let i = 0; i < document.getElementsByClassName('ItemsCenter').length;i++ ){
        document.getElementsByClassName('ItemsCenter')[i].style.display='none';
      }
      for (let i = 0; i < document.getElementsByClassName('menuItemWith').length;i++ ){
      document.getElementsByClassName('menuItemWith')[i].style.display='none';
    }
    if (kind !==undefined){
          for (let i = 0; i < document.getElementsByClassName(name).length;i++ ){
          document.getElementById('centerMain').style.transform='scale(0.1)';
              setTimeout(()=>{
              document.getElementsByClassName(name)[i].style.display='block';
              document.getElementById('centerMain').style.transform='scale(1)';
               },300)
            }
    }

    else {  for (let i = 0; i < document.getElementsByClassName(name).length;i++ ){
     document.getElementById('centerMain').style.opacity=0;
     setTimeout(()=>{
        document.getElementsByClassName(name)[i].style.display='flex';
       document.getElementById('centerMain').style.opacity=1;
     },500)
    }}

}

async function getMenuWith(){
    let responseMenu = await fetch('/menuWith');
    let responseMenuWithout = await fetch('/menuWithout');
    let productsWithout = await responseMenuWithout.json();
    let products = await responseMenu.json();
    await   createMenuPretty(products);
    await   createMenuPrettyWithout(productsWithout);
var addCartWithout = await document.getElementsByClassName('  menuItemWithDiscriptionText');

  for(var i=0; i < addCartWithout.length; i++){
    addCartWithout[i].onclick =  addWithout
  }
    var   addCart = await document.getElementsByClassName('addCart');
    //console.log(addCart)
        for(var i=0; i < addCart.length; i++){
          addCart[i].onclick = add
        }
    let items = products.concat(productsWithout);
    return items;
};
getElementMenu();
var itemsAfterPromise = Promise.resolve(getMenuWith());

function addWithout() {
    itemsAfterPromise.then((value)=>{
  //  console.log(this.id.replace('discriptionText', ''));
  //  console.log(value[0]._id)
        for (let i=0;i < value.length;i++){
            if (this.id.replace('discriptionText', '') === value[i]._id){
            // console.log(value[i])
              return value[i];
            }
        }
      })
      .then((rezult)=>{
        console.log(rezult);
        rezult.counter = 1;
        rezult.ip = document.getElementById('ip').innerHTML;
        rezult.price = rezult.price.replace(' ','').replace('р','.').replace('к','');
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/submitMenu', false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(rezult));
        return xhr.responseText;

    }).then((response)=>{
      console.log(response);
      if (response === 'ACCEPT'){
        document.getElementById('poppupAdd').innerText = " добавлен(а) в заказ"
        document.getElementById('poppupAdd').style.opacity = '0.9'
        document.getElementById('poppupAdd').style.top = event.clientY - document.getElementById('poppupAdd').offsetHeight/2 +'px';
        document.getElementById('poppupAdd').style.left = event.clientX - document.getElementById('poppupAdd').offsetWidth/2 +'px';
        setTimeout(()=>{
          document.getElementById('poppupAdd').style.opacity = '0'
          setTimeout(()=>{
              document.getElementById('poppupAdd').style.top = '-400px'
          },1000)
        },3000)
      }
    })
};


function add () {
      itemsAfterPromise.then((value)=>{
    //    console.log(this.id);
      //  console.log(value[0]._id)
        for (let i=0;i < value.length;i++){
            if (this.id===value[i]._id){
            //  console.log(value[i])
              return value[i];
            }
        }
      }).then((rezult)=>{console.log(rezult);
        rezult.counter = 1;
        rezult.ip = document.getElementById('ip').innerHTML;
        rezult.price = rezult.price.replace(' ','').replace('р','.').replace('к','');
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/submitMenu', false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(rezult));
        return xhr.responseText;

    }).then((response)=>{
      console.log(response);
      if (response === 'ACCEPT'){
        document.getElementById('poppupAdd').innerText = " добавлен(а) в заказ"
        document.getElementById('poppupAdd').style.opacity = '0.9'
        document.getElementById('poppupAdd').style.top = event.clientY - document.getElementById('poppupAdd').offsetHeight/2 +'px';
        document.getElementById('poppupAdd').style.left = event.clientX - document.getElementById('poppupAdd').offsetWidth/2 +'px';
        setTimeout(()=>{
          document.getElementById('poppupAdd').style.opacity = '0'
          setTimeout(()=>{
              document.getElementById('poppupAdd').style.top = '-400px'
          },1000)
        },3000)
      }
    })
};

/*
async function searchMenu(){
  let discriptionForSearch = [];
  let responseMenu =  await fetch('/menuWith');
  let items = await  responseMenu.json();
  for (let i=0;i < items.length; i++){
    if((items[i].discription!==undefined) && (items[i].discription.includes(document.getElementById('searchTextMenu').value)))
   {
      discriptionForSearch.push(items[i]);
    }
}

 filterOne(discriptionForSearch);
}
/*
function filterOne(item){
        console.log(item);
        for (let i = 0; i < document.getElementsByClassName('ItemsCenter').length;i++ ){
          document.getElementsByClassName('ItemsCenter')[i].style.display='none';
        }
        for (let i = 0; i < document.getElementsByClassName('menuItemWith').length;i++ ){
        document.getElementsByClassName('menuItemWith')[i].style.display='none';
      }
       for (let i=0;i<item.length;i++){
         document.getElementById('00'+item[i]._id).style.display='block';
       }
}
*/




function create(items){
  console.log(items);
    for (var i=0; i<items.length; i++){
            const  div = document.createElement("div");
             div.className = 'headerItemMenu';
             div.id = items[i]._id;
             document.getElementById('centerMainHeader').appendChild(div);

             const  img = document.createElement("img");
             img.className = 'headerItemMenuImage';
             img.src = "../public/image/allMenu/"+items[i]._id+'.jpg';
             document.getElementById(div.id).appendChild(img);

             const  text = document.createElement("div");
             text.className = 'headerItemMenuDiscription';
             text.innerHTML = items[i].name;
             document.getElementById(div.id).appendChild(text );
    }
//  console.log('createheader')
}
function arrayUnique(massivKind){
    return massivKind.filter((e,i,a)=>a.indexOf(e)==i)
};

function createMenuPrettyWithout(items){

let massivKind = [];
for (let i=0;i<items.length;i++){
  massivKind[i] =  items[i].kind;
}
massivKind = arrayUnique(massivKind);
//console.log(massivKind);

for (let i=0;i<massivKind.length;i++){
  const  div = document.createElement("div");
  div.className = 'menuItemWith '+massivKind[i];
  div.id = '00'+massivKind[i];
  div.style.display = 'none'
  document.getElementById('centerMain').appendChild(div);

  const  img = document.createElement("div");
  img.className = 'menuItemWithPhoto ';
  //img.src  = "public/image/"+massivKind[i]+".jpg";
  img.style.backgroundImage = "url(public/image/menuPhoto/"+massivKind[i]+".jpg)";
  document.getElementById(div.id).appendChild(img);


  var  discription = document.createElement("div");
  discription.className = 'menuItemWithDiscription ';
  discription.id = 'discription'+massivKind[i];
  document.getElementById(div.id).appendChild(discription);
}
        for (var i=0; i<items.length; i++){
          const  text = document.createElement("div");
          text.className = 'menuItemWithDiscriptionText';
          text.id = 'discriptionText'+items[i]._id.split(' ').join('');
          document.getElementById('discription'+items[i].kind).appendChild(text);

            const  name = document.createElement("div");
            name.className = 'menuItemWithDiscriptionTextName';
            name.innerHTML = items[i].name;
            document.getElementById('discriptionText'+items[i]._id.split(' ').join('')).appendChild(name);

            const  gram = document.createElement("div");
            gram.className = 'menuItemWithDiscriptionTextGram';
            gram.innerHTML = items[i].gram;
            document.getElementById('discriptionText'+items[i]._id.split(' ').join('')).appendChild(gram);
            if (items[i].other!=undefined){
              const  other = document.createElement("div");
                other.className = 'menuItemWithDiscriptionTextOther';
                other.innerHTML = items[i].other;
                document.getElementById('discriptionText'+items[i]._id.split(' ').join('')).appendChild(other);
              }

            const  price = document.createElement("div");
            price.className = 'menuItemWithDiscriptionTextPrice';
            price.innerHTML = items[i].price;
            document.getElementById('discriptionText'+items[i]._id.split(' ').join('')).appendChild(price);
        }

}

function createMenuPretty(items){

  for (var i=0; i<items.length; i++){
      const  div = document.createElement("div");
       div.className = 'ItemsCenter '+items[i].kind;
       div.id = '00'+items[i]._id;
       div.discription = items[i].discription;
       document.getElementById('centerMain').appendChild(div);

//ТУТ БУДЕТ ТРЕШАК!!!!

    const  img = document.createElement("div");
     img.className = 'imageMenu';
     img.id = i + items[i]._id;
     document.getElementById(div.id).appendChild(img);

        const conteiner = document.createElement("div");
        conteiner.className = 'container';
        conteiner.id = items[i]._id + i;
        document.getElementById(img.id).appendChild(conteiner);

          const front = document.createElement("div");
          front.className = 'front';
          front.id = '123'+ items[i]._id;
          front.style.backgroundImage = "url(public/image/menuPhoto/"+items[i]._id+".jpg)";
          document.getElementById(conteiner.id).appendChild(front);



          const back = document.createElement("div");
          back.className = 'back';
          back.id = i + items[i]._id + i;
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
     addCart.id = items[i]._id;
     document.getElementById(div.id).appendChild(addCart);

     const weight = document.createElement("div");
       weight.className = 'weight';
         weight.innerHTML =  items[i].gram;
       document.getElementById(addCart.id).appendChild(weight);

     const pPrice = document.createElement("div");
       pPrice.className = 'pPrice';
       pPrice.innerHTML =  items[i].price
     document.getElementById(addCart.id).appendChild(pPrice);
//console.log(items[i]);

////////////////////////////////////////ЗАКОММЕНТИТЬ ПЕРЕД ЗАЩИТОЙ!/////////////////////////////////////!!
/*
        if (items[i].gram1!==undefined){
           const addCart = document.createElement("div");
           addCart.className = 'addCart';
           addCart.id = items[i]._id + items[i].gram1;
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
         */
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }

}
