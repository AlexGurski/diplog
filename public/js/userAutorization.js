let chbox=document.getElementById('checkbox');
let submit = document.getElementById('submit');


function auth(){
  if (chbox.checked) {
  		submit.value='Регистрация';
  	}
  	else {
  			submit.value='Авторизация';
  	}
}
