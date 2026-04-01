
// Регистрация
async function fetchData( username, email, password) {
    let url = `http://localhost/myserver/?username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    
    try {
        let response = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' },
        })
        let data = await response.json()
        
        if (data.status === 'success') {
            alert(data.message)
            
        } else {
            alert(data.message)
        }
    } catch (error) {
        console.error('Ошибка:', error)
        alert('Ошибка соединения с сервером')
    }
}

function get_data_form() {
    // Регистрация
    const regForm = document.querySelector('#reg_form')
    if (regForm) {
        regForm.addEventListener('submit', function(event) {
            event.preventDefault()  
            
            const username = document.querySelector('#reg_username').value
            const email = document.querySelector('#reg_emai').value
            const password = document.querySelector('#reg_password').value
    

            if (password !== passwordConfirm) {
                alert('Пароли не совпадают')
                return
            }

            console.log('Отправка данных:', {username, email, }) 
            fetchData(username, email, password)
        })
    }
    
}

document.addEventListener('DOMContentLoaded', function () {
    get_data_form()
})

