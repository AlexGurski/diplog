function getCookie(name) {
  var r = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  if (r) return r[2];
  else return "";
}

document.getElementsByClassName('setting')[0].onclick = ()=>{
document.getElementsByClassName('editCookies')[0].style.display='block';
document.getElementsByClassName('adminOrder')[0].style.display='none';
}

document.getElementsByClassName('Zakaz')[0].onclick = ()=>{
document.getElementsByClassName('editCookies')[0].style.display='none';
document.getElementsByClassName('adminOrder')[0].style.display='block';
}
function skidOn(x){
  if (x < 100) return '0';
  if ((x >= 100) && (x<150))  return '5';
  if ((x >= 150) && (x<200))  return '7';
    if ((x >= 200) && (x<300)) return '9';
      if ((x >= 300) && (x<450))  return '10';
        if ((x >= 450) && (x<600))  return '13';
          if (x >= 600)  return '15';
}

function OrderAdmin() {
  var skidka = 0;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'adminOrder', true);

            xhr.onreadystatechange = function() {
              if (xhr.readyState != 4) return;
              if (xhr.status != 200) {
                console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
                return;
              }
                var rez = JSON.parse(xhr.responseText);
                //ПОИСК!!!
                var j = 0;
                var rezult = [];
              for (var i=0; i<rez.length; i++){
                if ((getCookie('phone')!=='') && (getCookie('phone')!==undefined) && (getCookie('phone') !==null)){
                if (rez[i].guestNumber.indexOf(getCookie('phone'))+ 1){
                  if (rez[i].status==='Доставлен'){skidka=skidka + +rez[i].price;}
            rezult[j] = rez[i];
            j++;}
          }
            }
          console.log(skidka);
          var divPrice = document.createElement("div");
               divPrice.className = 'divPrice';
               divPrice.id = 'divPrice';
               divPrice.innerHTML ="Общая сумма заказа: "+ skidka.toFixed(2);
          document.getElementsByClassName("adminOrder")[0].appendChild(divPrice);
          let cooksale = 1-skidOn(skidka)/100
              document.cookie='skidka='+ cooksale ;
          var rice = document.createElement("div");
              rice.className = 'rice';
               rice.id = 'rice';
               rice.innerHTML ="Ваша скидка: "+ skidOn(skidka);
          document.getElementsByClassName("adminOrder")[0].appendChild(rice);
            ////////////не лезь в код, хз как работает!
              console.log(rezult);
          showPhones(rezult);
            }
    xhr.send(null);
  }

//OrderAdmin();

  function showPhones(orders) {
   var div = document.createElement("div");
        div.className = 'adminDelete';
        div.id = 'adminDelete'
      document.getElementsByClassName("adminOrder")[0].appendChild(div);

              for (var i=orders.length-1; i >= 0; i--){
                var divStatus = document.createElement("div");
                     divStatus.className = 'divStatus';
                     divStatus.id = 'divStatus'
                   document.getElementsByClassName("adminDelete")[0].appendChild(divStatus);

                    var h3 = document.createElement("h3");
                h3.innerHTML = "Заказ: "
              divStatus.appendChild(h3);

                  var a = document.createElement('a');
                  console.log(orders[i]["orderDish"].replace('name','Наименование'));
                  var linkText = document.createTextNode(orders[i]["orderDish"].replace(/"name"/g,'Наименование').replace(/price/g,'Стоимость').replace(/count/g,'Количество').replace('[','').replace(']',''));
                  a.target = '_blank';
                  a.appendChild(linkText);
                  a.href = "/admin/"+orders[i]._id;
                  h3.appendChild(a);

                  var p2 = document.createElement('p');
                    p2.innerHTML = "Статус заказа: " + orders[i].status;
                    divStatus.appendChild(p2);

                    if (orders[i].status ==='Принят'){
                              document.getElementsByClassName('divStatus')[orders.length - i -1].style.backgroundColor = 'red';

                        }

                        if (orders[i].status ==='Доставлен'){
                                document.getElementsByClassName('divStatus')[orders.length - i -1].style.backgroundColor = 'green';
                            }

                            if (orders[i].status ==='Обработан'){
                                    document.getElementsByClassName('divStatus')[orders.length - i -1].style.backgroundColor = 'orange';
                                }
                                if
                                (orders[i].status ==='Доставка'){
                                        document.getElementsByClassName('divStatus')[orders.length - i -1].style.backgroundColor = 'yellow';
                                    }
                                    if
                                    (orders[i].status ==='Отменен'){
                                            document.getElementsByClassName('divStatus')[orders.length - i -1].style.backgroundColor = 'grey';
                                        }

                      var p1 = document.createElement('p');
                        p1.innerHTML = "Время заказа: " + orders[i].timeOrder
                        divStatus.appendChild(p1);

                          var p3 = document.createElement('p');
                            p2.innerHTML = "ID: " + orders[i]._id;
                            divStatus.appendChild(p3);

                            var p4 = document.createElement('p');
                              p4.innerHTML = "Общая стоимость: " + orders[i].price;
                              divStatus.appendChild(p4);

                          var hr = document.createElement('hr');
                          hr.color = 'red';
                        divStatus.appendChild(hr);
                    }
}

function makeid() {
  var text = "";
  var possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (var i = 0; i < 14; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}
var icon = document.getElementById("button"),
    buttonText = document.getElementById("button-text"),
    animationToCheck = document.getElementById("animation-to-check"),
    animationToGreen = document.getElementById("animation-to-green"),
    animationToStar = document.getElementById("animation-to-star"),
    animationToYellow = document.getElementById("animation-to-yellow");

button.addEventListener('click', function() {

  if (button.classList.contains("saved")) {
    button.classList.remove("saved");
    animationToStar.beginElement();
    animationToYellow.beginElement();
    buttonText.innerHTML = "Изменить данные";
  } else {
    button.classList.add("saved");
    animationToCheck.beginElement();
    animationToGreen.beginElement();
    buttonText.innerHTML = "Изменено";
  }

}, false);
