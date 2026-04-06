// вход
// отправка данных на сервер
async function loginUser(username, password) {
    const url = 'http://localhost/myserver/login.php'; //
     // отправка запроса на сервер с помощью fetch
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: new URLSearchParams({
                username: username, // имя пользователя или email для поиска в  бд
                password: password // пароль для проверки
            })
        });
        // получение ответа от сервера
        const data = await response.json();
        // проверка статуса ответа от сервера
        if (data.status === 'success') {
            alert(data.message);
            // сохранение данных пользователя
            if (data.user) {
                localStorage.setItem('currentUser', JSON.stringify(data.user));
            }
            return true;// возвращяет true если вход выполнен успешно
        } else {
            alert('Ошибка: ' + data.message);
            return false;
        }
    } catch (error) {
        console.error('Ошибка входа:', error);
        alert('Ошибка соединения с сервером');
        return false;// возвращяет false если вход не удался
    }
}
// настройка обработки формы входа
function initLoginForm() {
    const loginForm = document.querySelector('#login_form'); // 
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // получение значений из полей ввода по их id
            const username = document.querySelector('#login_input').value.trim(); // имя или email
            const password = document.querySelector('#login_password').value; // пароль
            // проверка заполнены ли все поля
            if (!username || !password) {
                alert('Заполните все поля');
                return;
            }
            // если все прошло усешно вызов функции отправки данных на сервер
            loginUser(username, password);
        });
    }
}

document.addEventListener('DOMContentLoaded', initLoginForm);