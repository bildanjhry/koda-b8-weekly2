const inputForm = document.querySelector(".login-form")
const inputValue = document.querySelectorAll("input")
const watchBtn = document.querySelector(".pass-watch-auth-icon")
const params = new URLSearchParams(window.location.search)
const acc = JSON.parse(window.localStorage.getItem("accounts"))

export function handleWatchPass(e){
  const element = watchBtn.previousElementSibling
  const input = document.getElementById("password")
  if(element.type === "password") return  element.setAttribute("type", "text")
  else return element.setAttribute("type", "password")
}
 
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
    let isFound = false
    for(const account of acc){
      const decodePass = window.atob(account.password)
      // check if input matches one of users
      if(account.email == data.get("email") && decodePass == data.get("password")){
        const newData = {}
        for(const key in account){ // create new object of founded user's data
          newData[key] = account[key]
        }
          window.localStorage.setItem("user", JSON.stringify(newData))
          alert("Login Berhasil")
          isFound = true
          if(data.get("email").split("@")[1]== "admin.com"){
             window.location.href = '../../admin/index.html'
          } else {
            window.location.href = '../../../../index.html'
          }
        }
      }
      if(!isFound) throw new Error("Akun tidak ditemukan")
  } catch(err) {
    alert(err.message)
  }
}

watchBtn.addEventListener("click", (e) => { handleWatchPass(e) })
inputForm.addEventListener('submit', (e) => { handleLogin(e) })
