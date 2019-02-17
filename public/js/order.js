const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноявбрь", "Декабрь"
];
function getCookie(name) {
  var r = document.cookie.match("(^|;) ?" + name+ "=([^;]*)(;|$)");
  if (r) return r[2];
  else return "";
}
function deleteCookie(name) {
  var date = new Date(); // Берём текущую дату
  date.setTime(date.getTime() - 1); // Возвращаемся в "прошлое"
  document.cookie = name += "=; expires=" + date.toGMTString(); // Устанавливаем cookie пустое значение и срок действия до прошедшего уже времени
}
console.log(getCookie('skidka'))
document.getElementById('nameOrder').value = getCookie('imia');
document.getElementById('telephoneOrder').value = getCookie('phone');
document.getElementById('adressOrder').value = getCookie('adress');

var post = [];
var itemOrder = [];
let finalPrice = 0;
let dostavkaPrice = 0;
let postPrice = 0;
let postOrder = {};
var plusCounter =  document.getElementsByClassName('plusCounter');
var minusCounter = document.getElementsByClassName('minusCounter');
var colCounter = document.getElementsByClassName('colCounter');
var deleteItem = document.getElementsByClassName('deleteCart');

async function getElementMenu(){

    let responseMenu = await fetch('/orderItems')
    let products = await responseMenu.json();
    await  console.log(products)
    console.log(document.getElementById('ip').innerHTML)
    await new Promise((resolve, reject) => setTimeout(resolve, 0));
    products = products[document.getElementById('ip').innerHTML];

    if(products!==undefined ){
        console.log(document.getElementsByClassName('extraItems')[0]);
        document.getElementsByClassName('extraItems')[0].style.opacity = 1;
          document.getElementById('notNull').style.display = 'none';
    }else{
      document.getElementById('notNull').style.display = 'block';
      document.getElementsByClassName('extraItems')[0].style.opacity = 0;
    }

            if ( getCookie('skidka')>0){
            for (let i=0;i<products.length;i++){
             products[i].price = (products[i].price * getCookie('skidka')).toFixed(2);
            }
           }
    console.log(products);

    await renderOrder(products);
    var itemOrder = products;

    var deleteItem = await document.getElementsByClassName('deleteCart');
    var orderCost = document.getElementById('orderCost');
    for (let i=0; i<deleteItem.length;i++){

                         deleteItem[i].onclick = function(){
                           if (this.id.replace('delete','') === itemOrder[i]._id){
                               var xhr = new XMLHttpRequest();
                               xhr.open("POST", '/submitMenuDelete', true);
                               xhr.setRequestHeader('Content-Type', 'application/json');
                               xhr.send(JSON.stringify(itemOrder[i]));
                               window.location.reload();
                            }
                         }
      }

      for (let i=0; i<plusCounter.length;i++){

          plusCounter[i].onclick = function (){
            console.log(itemOrder);
              for (var i=0;i<itemOrder.length;i++){
                  if (this.id.replace('plus','')=== itemOrder[i]._id){
                  itemOrder[i].counter++;
                  finalPrice +=  Number(itemOrder[i].price);
                 orderCost.innerHTML = 'Стоимость заказа: ' + finalPrice.toFixed(2) + ' р.';
                  colCounter[i].innerHTML = itemOrder[i].counter;

                                  if ( ( finalPrice >= 10 ) || (document.getElementById('adressOrder').value === 'Кафе "Парк Авеню"') ) {

                                    dostavkaPrice = 0;
                                    postPrice = dostavkaPrice + finalPrice;
                                    document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                                    document.getElementById('deliveryCost').style.color = 'yellow';
                                    document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';

                                  } else {

                                    dostavkaPrice = 5;
                                    postPrice = dostavkaPrice + finalPrice;
                                    document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                                    document.getElementById('deliveryCost').style.color = 'red';
                                    document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';
                                  }

                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", '/submitMenu', true);
                    xhr.setRequestHeader('Content-Type', 'application/json');
                   xhr.send(JSON.stringify(itemOrder[i]));

                  }
             }
        }
          minusCounter[i].onclick = function(){
                for (var i=0;i<itemOrder.length;i++){

                    if ((this.id.replace('minus','') === itemOrder[i]._id) && (itemOrder[i].counter>1)){
                      itemOrder[i].counter--;
                      finalPrice -=  itemOrder[i].price;
                      orderCost.innerHTML = 'Стоимость заказа: ' + finalPrice.toFixed(2) + ' р.';
                        colCounter[i].innerHTML = itemOrder[i].counter;

                        if ( ( finalPrice >= 10 ) || (document.getElementById('adressOrder').value === 'Кафе "Парк Авеню"') ){
                          dostavkaPrice = 0;
                          postPrice = dostavkaPrice + finalPrice;
                          document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                          document.getElementById('deliveryCost').style.color = 'yellow';
                          document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';

                        } else {
                          dostavkaPrice = 5;
                          postPrice = dostavkaPrice + finalPrice;
                          document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                          document.getElementById('deliveryCost').style.color = 'red';
                          document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';
                        }

                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", '/submitMenu', true);
                        xhr.setRequestHeader('Content-Type', 'application/json');
                       xhr.send(JSON.stringify(itemOrder[i]));
                    }
               }
          }
      }

      document.getElementById('buttonOrder').onclick = () =>{
  //    let Data = new Date();
      let buffOrder = [];
            postOrder._id = makeid();
            postOrder.guest = document.getElementById('nameOrder').value;
            postOrder.guestNumber = document.getElementById('telephoneOrder').value;
            postOrder.guestAdress = document.getElementById('adressOrder').value;
            postOrder.comment = document.getElementById('commentOrder').value;
            postOrder.price = postPrice.toFixed(2);
            postOrder.timeOrder = new Date();
            postOrder.ip = document.getElementById('ip').innerHTML;

            for (let i = 0; i<itemOrder.length; i++){
                 buffOrder[i] = {
                  name:itemOrder[i].name,
                  price:itemOrder[i].price,
                  count:itemOrder[i].counter
                }
            }
            postOrder.orderDish=JSON.stringify(buffOrder);
            postOrder.status = 'Принят';
            console.log(  postOrder)

                var xhr = new XMLHttpRequest();
                xhr.open("POST", '/order', true);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(postOrder));
                alert('ЗАКАЗ ПРИНЯТ!')

              /*  var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i];
                    var eqPos = cookie.indexOf("=");
                    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                    }
*/
              window.location.reload();
          }
    return   products;
}


      getElementMenu()
        function fun1() {
        var chbox;
        chbox=document.getElementById('one');
            if (chbox.checked) {
              //  alert('Выбран');
              document.getElementById('adressOrder').value = 'Кафе "Парк Авеню"';
               document.getElementById('adressOrder').setAttribute("readonly", true);
                  dostavkaPrice = 0;
                postPrice = dostavkaPrice + finalPrice;
                document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                document.getElementById('deliveryCost').style.color = 'yellow';
                document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';
            }
            else {
               document.getElementById('adressOrder').readOnly = false;
              document.getElementById('adressOrder').value='';
                      if (  finalPrice < 10 ) {
                    dostavkaPrice = 5;
                    postPrice = dostavkaPrice + finalPrice;
                    document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                    document.getElementById('deliveryCost').style.color = 'red';
                    document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';
                  }
            }
        }

        function renderOrder(items){
              console.log(items.length);
        finalPrice = 0;

            for (var i = 0; i < items.length; i++){

              finalPrice += items[i].price * items[i].counter;
              orderCost.innerHTML ='Стоимость заказа: '+ finalPrice.toFixed(2) + ' р.';

              if ( ( finalPrice >= 10 ) || (document.getElementById('adressOrder').value === 'Кафе "Парк Авеню"') ) {

                dostavkaPrice = 0;
                postPrice = dostavkaPrice + finalPrice;
                document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                document.getElementById('deliveryCost').style.color = 'yellow';
                document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';

              } else {
                dostavkaPrice = 5;
                postPrice = dostavkaPrice + finalPrice;
                document.getElementById('deliveryCost').innerHTML = 'Стоимость доставки: ' +  dostavkaPrice+ ' р.' ;
                document.getElementById('deliveryCost').style.color = 'red';
                document.getElementById('finalCost').innerHTML = 'Итого к оплате: '+ postPrice.toFixed(2) + ' р.';
              }


              const  orderCenter = document.createElement("div");
                  orderCenter.className = 'orderCenter';
                  orderCenter.id = items[i]._id+items[i].kind;
                  document.getElementsByClassName('centerPostOrder')[0].appendChild(orderCenter);

              const frontImage = document.createElement("div");
                  frontImage.className = 'frontImage';
                  if (items[i].discription!==undefined){
                    frontImage.style.backgroundImage = "url(public/image/menuPhoto/"+items[i]._id+".jpg)";
                  } else{
                      frontImage.style.backgroundImage = "url(public/image/menuPhoto/"+items[i].kind+".jpg)";
                  }

                  document.getElementById(orderCenter.id).appendChild(frontImage);

          const textCenter = document.createElement("div");
                textCenter.className = 'textCenter';
                textCenter.id = items[i]._id+items[i].name;
                document.getElementById(orderCenter.id).appendChild(textCenter);

                const textCenter1 = document.createElement("div");
                      textCenter1.className = 'textCenter1';
                      textCenter1.id = items[i]._id+items[i].name+'qwe';
                      document.getElementById(textCenter.id).appendChild(textCenter1);

                      const textCenter2 = document.createElement("div");
                            textCenter2.className = 'textCenter2';
                            textCenter2.id = items[i]._id+items[i]+'qwe';
                            document.getElementById(textCenter.id).appendChild(textCenter2);

            const  nameMenuOrder = document.createElement("div");
                   nameMenuOrder.className = 'nameMenuOrder';
                   nameMenuOrder.id = i + items[i]._id;
                   nameMenuOrder.innerHTML = items[i].name;
                   document.getElementById(textCenter1.id).appendChild(nameMenuOrder);

                   const  kindOrder = document.createElement("div");
                          kindOrder.className = 'kindOrder';
                  if (items[i].discription!==undefined){
                    kindOrder.innerHTML =items[i].discription;}
                    else{
                      if (items[i].other!==undefined){
                        kindOrder.innerHTML =items[i].other;
                      } else{
                        kindOrder.innerHTML =items[i].name;
                      }
                    }

            document.getElementById(textCenter1.id).appendChild(kindOrder);

              const priceOrder = document.createElement("div");
                   priceOrder.className = 'priceOrder';
                   priceOrder.innerHTML = items[i].price + ' р.';
                   document.getElementById(textCenter2.id).appendChild(priceOrder);


                   const weightOrder = document.createElement("div");
                        weightOrder.className = 'weightOrder';
                        weightOrder.innerHTML = items[i].gram;
                        document.getElementById(textCenter1.id).appendChild(weightOrder);

                        const addCounter= document.createElement("div");
                        addCounter.className = 'addCounter';
                        addCounter.id = items[i]._id+'addcounter';
                        document.getElementById(textCenter2.id).appendChild(addCounter);

                        const minusCounter= document.createElement("div");
                              minusCounter.className = 'minusCounter';
                                minusCounter.innerHTML =  '-'
                                minusCounter.id = items[i]._id + 'minus';
                              document.getElementById(addCounter.id).appendChild(minusCounter);

                              const colCounter= document.createElement("div");
                                    colCounter.className = 'colCounter';
                                    colCounter.innerHTML =  items[i].counter;
                                    document.getElementById(addCounter.id).appendChild(colCounter);

                        const plusCounter = document.createElement("div");
                          plusCounter.className = 'plusCounter';
                          plusCounter.innerHTML =  '+'
                          plusCounter.id = items[i]._id + 'plus';
                          document.getElementById(addCounter.id).appendChild(plusCounter);


                        const deleteCart = document.createElement("div");
                      deleteCart.className = 'deleteCart';
                        deleteCart.id = items[i]._id+'delete';
                        document.getElementById(textCenter2.id).appendChild(deleteCart);

                        const deleteOrder = document.createElement("p");
                          deleteOrder.className = 'deleteOrder';
                          deleteOrder.innerHTML =  'Удалить заказ'
                        document.getElementById(deleteCart.id).appendChild(deleteOrder);

                        const imgPrice = document.createElement("IMG");
                         imgPrice.className = 'imgPrice';
                        document.getElementById(deleteCart.id).appendChild(imgPrice);
            }
        }

              function makeid() {
              var text = "";
              var possible = "0123456789";
              for (var i = 0; i < 6; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                for (var i = 0; i < 5; i++)
                  text += possible.charAt(Math.floor(Math.random() * possible.length));
              return text;
            }
