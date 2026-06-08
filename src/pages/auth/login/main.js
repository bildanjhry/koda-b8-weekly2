function handleWatchPass(element){
  const input = document.getElementById("password")
  if(element.type === "password") return  element.setAttribute("type", "text")
  else return element.setAttribute("type", "password")
}

const params = new URLSearchParams(window.location.search)
  const acc = JSON.parse(window.localStorage.getItem("accounts"))
  if(params.get('new')) {
      const email = document.querySelector(".input-email")
      const password = document.querySelector(".input-password")
      email.value = acc[acc.length-1].email
  }
  const inputForm = document.querySelector(".login-form")
  const inputValue = document.querySelectorAll("input")

function handleLogin (e){
  e.preventDefault()
  try{
     acc.forEach((account) => {
      const decodePass = atob(account.password)
      if(account.email == inputForm[name="email"].value &&
        decodePass == inputForm[name="password"].value
      ){
        alert("Login Berhasil")
            return window.location.href = '../../../../index.html'
       } else {
            throw new Error("Akun tidak ditemukan")
       }
    })
  } catch(err) {
     alert(err.message)
  }
}

inputForm.addEventListener('submit', handleLogin)