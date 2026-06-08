//import validateForm from "../../../js/utils/form-validation.js"
const inputForm = document.querySelector(".login-form")
const inputValue = document.querySelectorAll("input")

export function handleWatchPass(element){
  const input = document.getElementById("password")
  if(element.type === "password") return  element.setAttribute("type", "text")
  else return element.setAttribute("type", "password")
}

const params = new URLSearchParams(window.location.search)
  const acc = JSON.parse(window.localStorage.getItem("accounts"))
 
  if(params.get('new')) {  // check if url has parameter new
      const email = document.querySelector(".input-email")
      const password = document.querySelector(".input-password")
      email.value = acc[acc.length-1].email
  }

function handleLogin(e){
  e.preventDefault()
    const data = new FormData(e.target)

    for(const account of acc){
      const decodePass = window.atob(account.password)
      if(account.email == data.get("email") && decodePass == data.get("password")){
        window.location.href = '../../../../index.html'
        return alert("Login Berhasil")
       }
    }
    alert("Akun tidak ditemukan")
}

inputForm.addEventListener('submit', handleLogin)