const regexp = /\B'/gmi;

let originalP = document.getElementById("simpleText");
let modifiedP = document.getElementById("modifiedText");

modifiedP.innerText = originalP.innerText.replace(regexp,'"');

//найдем все, что будем анализировать
const nameText = document.getElementById("name");
const telText = document.getElementById("tel");
const emailText = document.getElementById("email");
const messageText = document.getElementById("message");
const send = document.getElementById("sendSuccess");
const errDescName = document.getElementById("errorDescName");
const errDescTel = document.getElementById("errorDescTel");
const errDescEmail = document.getElementById("errorDescEmail");
submitBtn = document.getElementById("submitbtn");
submitBtn.addEventListener("click", (event) => {
    //определяем регуляры
    let regexpName = /^[a-z|а-я|\s]+$/gmi;
    let regexpTel = /^\+\d[(]\d{3}[)]\d{3}[-]\d{4}$/gmi;
    let regexpEmail = /^[a-z]+[\.|\-]?[a-z]+@[a-z]+\.[a-z]+$/gmi;
    //выставляем флаг ошибочного заполнения формы по умолчанию в false
    let error = false;

    if (!regexpName.test(nameText.value)) {
        error = true;
        nameText.classList.add("error");
        errDescName.classList.remove("hidden");
    }

    if (!regexpTel.test(telText.value)) {
        error = true;
        telText.classList.add("error");
        errDescTel.classList.remove("hidden");
    }

    if (!regexpEmail.test(emailText.value)) {
        error = true;
        emailText.classList.add("error");
        errDescEmail.classList.remove("hidden");
    }

    if (error) {
        event.preventDefault();
    } else {
        event.preventDefault();
        nameText.value = "";
        telText.value = "";
        emailText.value = "";
        messageText.value = "";
        send.classList.remove("hidden");
        setTimeout(() => send.classList.add("hidden"),5000);
    }
})

nameText.addEventListener("focus",(event) => {
    nameText.classList.remove("error");
    errDescName.classList.add("hidden");
})
telText.addEventListener("focus",(event) => {
    telText.classList.remove("error");
    errDescTel.classList.add("hidden");
})
emailText.addEventListener("focus",(event) => {
    emailText.classList.remove("error");
    errDescEmail.classList.add("hidden");
})

