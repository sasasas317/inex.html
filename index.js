
async function sendToServer(url, data) {
    try {
        
        const queryString = new URLSearchParams(data).toString();
        const fullUrl = `${url}?${queryString}`;
        
        console.log('Запрос к:', fullUrl); 
        
        const response = await fetch(fullUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
            
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            alert(result.message);
            if (result.redirect) {
                window.location.href = result.redirect;
            }
        } else {
            alert(result.message || 'Произошла ошибка');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером');
    }
}

// регистрация
function initRegistrationForm() {
    const regForm = document.querySelector('.reg');
    
    if (regForm) {
        regForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.querySelector('input[name="username"]').value.trim();
            const email = document.querySelector('input[name="email"]').value.trim();
            const password = document.querySelector('input[name="password"]').value;
            const passwordConfirm = document.querySelector('input[name="password_confirm"]')?.value;
            
            // Валидация
            if (!username || !email || !password) {
                alert('Заполните все обязательные поля!');
                return;
            }
            
            if (passwordConfirm && password !== passwordConfirm) {
                alert('Пароли не совпадают!');
                return;
            }
            
            if (password.length < 6) {
                alert('Пароль должен быть не менее 6 символов!');
                return;
            }
            
            console.log('Отправка регистрации:', { username, email });
            
            // отправка данных через get
            sendToServer('register.php', {
                username: username,
                email: email,
                password: password  
            });
        });
    }
}

//  Вход
function initLoginForm() {
    const loginForm = document.querySelector('.vhod');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const login = document.querySelector('input[name="login"]').value.trim();
            const password = document.querySelector('input[name="password"]').value;
            
            if (!login || !password) {
                alert('Введите логин и пароль!');
                return;
            }
            
            console.log('Отправка входа:', { login });
            
            sendToServer('login.php', {
                login: login,
                password: password  
            });
        });
    }
}


