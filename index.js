// регистрация 
// отправка данных на сервер  
async function registerUser(username, email, password) {
    const url = 'http://localhost/myserver/regist.php';
    try {
        // отправка запроса на сервер с помощью fetch
        const response = await fetch(url, {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: new URLSearchParams({
                username: username, // значение из поля имя
                email: email, // значение из поля email
                password: password // значение из поля пароль
            })
        });
        // получение ответа от сервера 
        const data = await response.json();
        // проверка статуса ответа от сервера
        if (data.status === 'success') {
            alert(data.message); // нет ошибки 
        } else {
            alert('Ошибка: ' + data.message); //есть ошибка
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером');
    }
}
// обработка формы регистрации
function initRegistrationForm() {

    const regForm = document.querySelector('#reg_form');
    
    if (regForm) {
        regForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // получение значение из полей ввода по их id
            const username = document.querySelector('#reg_username').value;
            const email = document.querySelector('#reg_email').value;
            const password = document.querySelector('#reg_password').value;
            const passwordConfirm = document.querySelector('#reg_password_confirm').value; 
            // проверка совпадения пароля
            if (password !== passwordConfirm) {
                alert('Пароли не совпадают!');
                return;
            }
            //если все хорошо вызов функции отправки данных на сервер    
            registerUser(username, email, password);
        });
    }
}

document.addEventListener('DOMContentLoaded', initRegistrationForm);