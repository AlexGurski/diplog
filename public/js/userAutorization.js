let chbox=document.getElementById('checkbox');
let submit1 = document.getElementById('submit1');
submit1.style.background='#FC6666'

function setCookie(name, value) {
 document.cookie = name + "=" + value;
}
function getCookie(name) {
  var r = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  if (r) return r[2];
  else return "";
}

function deleteCookie(name) {
  var date = new Date(); // Берём текущую дату
  date.setTime(date.getTime() - 1); // Возвращаемся в "прошлое"
  document.cookie = name += "=; expires=" + date.toGMTString(); // Устанавливаем cookie пустое значение и срок действия до прошедшего уже времени
}

////////////////////////////////////////////////
function loadForm(){
  document.getElementsByClassName('registerForm')[0].style.display='none';
  document.getElementById('nomer').value = getCookie('phone');
  document.getElementById('parol').value = getCookie('password');
  document.getElementById('imia').value = getCookie('imia');
  document.getElementById('adres').value = getCookie('adress');

 if (getCookie('status')!=='admin'){
      document.getElementsByClassName('admin')[1].style.display='none';
      document.getElementsByClassName('admin')[0].style.display='none';
  } else{
    document.getElementsByClassName('admin')[1].style.display='block';
    document.getElementsByClassName('admin')[0].style.display='block';
  }
      OrderAdmin();
}

document.getElementById('knopochka').onclick = function(){
  let body = {
    "phone":document.getElementById('nomer').value ,
    "password":  document.getElementById('parol').value,
    "imia":document.getElementById('imia').value,
    "adress":document.getElementById('adres').value
  }
    console.log(body);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/userUpdate', false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(body));
  if (xhr.responseText === 'YES'){
      document.cookie ='phone=' + document.getElementById('nomer').value;
      document.cookie ='password=' +   document.getElementById('parol').value ;
      document.cookie ='imia=' +  document.getElementById('imia').value ;
      document.cookie ='adress=' +  document.getElementById('adres').value ;

  }
}
document.getElementsByClassName('clearCookies')[0].onclick =()=>{
  deleteCookie('phone');
  deleteCookie('password');
  deleteCookie('imia');
  deleteCookie('adress');
  deleteCookie('status');
  deleteCookie('skidka');
}

window.addEventListener('load', function() {
  if ((getCookie('phone'))!=='' && (getCookie('password')!=='')){
    loadForm();
  }
});

function auth(){
  if (chbox.checked) {
      document.getElementsByClassName('modal')[0].style.display='none';
      document.getElementsByClassName('modal')[1].style.display='none';
  		submit1.innerHTML='Регистрация';
      submit1.style.background='#FC6666';
      document.getElementById('phone').value='';
      document.getElementById('password').value='';
  	}
  	else {
      document.getElementsByClassName('modal')[0].style.display='none';
      document.getElementsByClassName('modal')[1].style.display='none';
  			submit1.innerHTML='Авторизация';
        submit1.style.background='#00CCFF'
        document.getElementById('phone').value='';
        document.getElementById('password').value='';
  	}
}

submit1.onclick = function(){
    if (submit1.innerHTML === 'Регистрация'){
      let ret = {
        "phone":document.getElementById('phone').value,
        "password":document.getElementById('password').value,
        "submit":this.innerHTML
      }
        console.log(ret);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/user', false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(ret));
        if(xhr.responseText==='ACCEPT'){
          console.log(xhr.responseText);
          document.cookie = "phone="+document.getElementById('phone').value ;
          document.cookie = "password=" + document.getElementById('password').value;
          document.getElementById('phone').value = '';
          document.getElementById('password').value = '';
          loadForm()
        } else {
          document.getElementsByClassName('regex')[0].style.display='block';
        }
    } else{
      console.log('autentification');
      fetch('/userList')
                      .then(function(response) {
                        return response.json();
                      }).then((rez) => {
                //        console.log(rez);
                        for (let i=0;i<rez.length;i++){
                          if ((rez[i].phone === document.getElementById('phone').value) && (rez[i].password === document.getElementById('password').value)){
                            document.cookie = "phone="+rez[i].phone ;
                            document.cookie = "password=" + rez[i].password;
                            document.cookie = "imia=" + rez[i].imia;
                              document.cookie = "adress=" + rez[i].adress;
                            document.cookie = "status="+rez[i].status;
                            return true
                          }
                        }
                          return false;
                      }).then((resp)=>{
                        console.log(resp)
                        if (resp){
                          loadForm();
                        } else{
                          document.getElementsByClassName('authen')[0].style.display='block';
                        }
                      })
     }
}
