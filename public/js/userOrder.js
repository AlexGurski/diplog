function getCookie(name) {
  var r = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  if (r) return r[2];
  else return "";
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

            ////////////не лезь в код, хз как работает!
              console.log(rezult);
          showPhones(rezult);
            }
    xhr.send(null);  }


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
                  var linkText = document.createTextNode(orders[i]["orderDish"]);
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

                        var p2 = document.createElement('p');
                          p2.innerHTML = "Клиент: " + orders[i].guest;
                          divStatus.appendChild(p2);

                          var p3 = document.createElement('p');
                            p2.innerHTML = "ID: " + orders[i]._id;
                            divStatus.appendChild(p3);

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

OrderAdmin();
