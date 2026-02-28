
const element = document.getElementById('batn');
console.log(element)

element.addEventListener('click', () => {
    alert('данные отправлены')
}); 

function sendForm(e) {
const el = document.forms.batn.fam.value
alert(el)
}

const sendButton = document.batn.btn
sendButton.addEventListener('click',sendForm)
