const inputForm = document.querySelector(".login-form")

function handleWatchPass(element){
  const input = document.getElementById("password")
  if(element.type === "password") return  element.setAttribute("type", "text")
  else return element.setAttribute("type", "password")
}

function handleRegister(e) {
    e.preventDefault()
            
    try{
        const inputValue = document.querySelectorAll("input")
        const formData = {}
        const acconts = []
        inputValue.forEach((item) => {
            if(!item.value){
                throw new Error('Pastikan semua form terisi.')
            }
            if(inputForm[name="password"].value !== inputForm[name="password-confirm"].value) {
                throw new Error('Konfirmasi password tidak sama.')
            }
            if (!(inputForm[name="privacy-policy"].checked)) {
                throw new Error("Pastikan menceklis privacy dan policy.")
            } else {
                if(item.name === "privacy-policy" || item.name === "password-confirm") return
                else formData[item.name] = item.value
            }
        })
        const acc = window.localStorage.getItem("accounts")
        formData.password = btoa(formData.password)
        if(acc){
            console.log(formData.password)
            const objAcc = JSON.parse(acc)
            accounts = [...objAcc, formData]
        } else {
            accounts = [formData]
        }
        alert('Berhasil Buat Akun')
        console.log(formData)
        window.localStorage.setItem("accounts", JSON.stringify(accounts))
        window.location.href = '../login/index.html?new=true'

    } catch(err) {
        alert(err.message)
    }

}

inputForm.addEventListener('submit', handleRegister)