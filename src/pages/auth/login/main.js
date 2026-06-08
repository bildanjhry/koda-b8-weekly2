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
  try{
    const data = new FormData(e.target)
    const formInput = Object.fromEntries(data.entries())
  
    for(const value in formInput){
      if(!(formInput[value])) throw new Error('Pastikan semua form terisi.')
    }
  
    for(const account of acc){
      const decodePass = window.atob(account.password)
      console.log(account.password)
      if(account.email == data.get("email") && decodePass == data.get("password")){
        window.location.href = '../../../../index.html'
          return alert("Login Berhasil")
        }
      }
      alert("Akun tidak ditemukan")
  } catch(err) {
    alert(err.message)
  }
}

inputForm.addEventListener('submit', (e) => { handleLogin(e) })