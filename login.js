async function loginUser(username, password) {
    const url = 'http://localhost/myserver/login.php'; //
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: new URLSearchParams({
                username: username,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            alert(data.message);
            // сохранение данных пользователя
            if (data.user) {
                localStorage.setItem('currentUser', JSON.stringify(data.user));
            }
            return true;
        } else {
            alert('Ошибка: ' + data.message);
            return false;
        }
    } catch (error) {
        console.error('Ошибка входа:', error);
        alert('Ошибка соединения с сервером');
        return false;
    }
}

function initLoginForm() {
    const loginForm = document.querySelector('#login_form'); // 
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.querySelector('#login_input').value.trim(); // имя или email
            const password = document.querySelector('#login_password').value; // пароль
            // проверка заполнения полей 
            if (!username || !password) {
                alert('Заполните все поля');
                return;
            }
            
            loginUser(username, password);
        });
    }
}

document.addEventListener('DOMContentLoaded', initLoginForm);