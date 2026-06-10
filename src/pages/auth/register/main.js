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
			const data = new FormData(e.target)
			const formInput = Object.fromEntries(data.entries())

			for(const value in formInput){
				if(!(formInput[value])) throw new Error('Pastikan semua form terisi.')
			}

			if(data.get("password") !== data.get("password-confirm")) {
				throw new Error('Konfirmasi password tidak sama.')
			}

			if(!(data.get("privacy-policy"))) {
				throw new Error("Pastikan menceklis privacy dan policy.")
			} 
      // dummy address
      const address = {
        isMain:true,
        fullAddress: "Jalan Merpati Blok A No.16, Kec. Merah Putih",
        city:"Bogor",
        province:"Jawa Barat",
        postCode:"1130"
      }

			formData["fullname"] = data.get("fullname")
			formData["email"] = data.get("email")
			formData["password"] = btoa(data.get("password")) // encode password
      formData["cart"] = []
      formData["address"] = [address]
      formData["wishlist"] = []
      formData["checkout"] = []

      const acc = window.localStorage.getItem("accounts")

      if(acc){
          const objAcc = JSON.parse(acc)
          accounts = [...objAcc, formData]
      } else {
          accounts = [formData]
      }
      alert('Berhasil Buat Akun')
      window.localStorage.setItem("accounts", JSON.stringify(accounts))
      window.location.href = '../login/index.html?new=true'

    } catch(err) {
        alert(err.message)
    }

}

inputForm.addEventListener('submit', handleRegister)