let chbox=document.getElementById('checkbox');
let submit1 = document.getElementById('submit1');
submit1.style.background='#FC6666'

function auth(){
  if (chbox.checked) {
  		submit1.innerHTML='Регистрация';
      submit1.style.background='#FC6666'
  	}
  	else {
  			submit1.innerHTML='Авторизация';
        submit1.style.background='#00CCFF'
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
          console.log(xhr.responseText)
            document.getElementById('phone').value = '';
            document.getElementById('password').value = '';
        } else {
          alert('Данный телефон уже зарегистрирован в системе!')
        }
    }else{
      console.log('autentification');
      fetch('/userList')
                      .then(function(response) {
                        return response.json();
                      }).then((rez) => {
                        console.log(rez);
                        for (let i=0;i<rez.length;i++){
                          if ((rez[i].phone === document.getElementById('phone').value) && (rez[i].password === document.getElementById('password').value)){
                            document.cookie = "phone="+document.getElementById('phone').value +" password=" + document.getElementById('password').value;
                            return true
                          }
                        }
                          return false;
                      }).then((resp)=>{
                        console.log(resp)
                        if (resp){                          document.getElementsByClassName('registerForm')[0].style.display='none';

                        } else{
                          alert('Введены не верные данные!')
                        }
                      })
     }
}
