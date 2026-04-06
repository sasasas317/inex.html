async function registerUser(username, email, password) {
    const url = 'http://localhost/myserver/regist.php';
    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            body: new URLSearchParams({
                username: username,
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            alert(data.message);
        } else {
            alert('Ошибка: ' + data.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером');
    }
}

function initRegistrationForm() {
    const regForm = document.querySelector('#reg_form');
    
    if (regForm) {
        regForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const username = document.querySelector('#reg_username').value;
            const email = document.querySelector('#reg_email').value;
            const password = document.querySelector('#reg_password').value;
            const passwordConfirm = document.querySelector('#reg_password_confirm').value; 
            
            if (password !== passwordConfirm) {
                alert('Пароли не совпадают!');
                return;
            }

            registerUser(username, email, password);
        });
    }
}

document.addEventListener('DOMContentLoaded', initRegistrationForm);