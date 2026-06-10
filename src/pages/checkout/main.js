import moneyFormat from "../../js/utils/money-format.js"

$(document).ready(function(){
	const userData = JSON.parse(window.localStorage.getItem("user"))
	// const userAcc = JSON.parse(window.localStorage.getItem("account")).filter((item) => {
	// 	if(item.email === userData.email) return item
	// })
	// const userAccRest = JSON.parse(window.localStorage.getItem("account")).filter((item) => {
	// 	if(item.email !== userData.email) return item
	// })
	const address = userData.address.filter((item) => item.isMain)
	const cart = userData.cart
	const checkout = userData.checkout

	const formInput = $(".checkout-action-form-implement")
	const userAddress = {
		name: userData.fullname,
		phone: userData.phone ? userData.phone : "08128188",
		email: userData.email,
		address: address[0].fullAddress,
		city: address[0].city,
		province:address[0].province,
		postCode:address[0].postCode
	}

	formInput.find("input").each(function(){
		if($(this).attr("name") === "name") $(this).val(userAddress["name"])
		if($(this).attr("name") === "phone") $(this).val(userAddress["phone"])
		if($(this).attr("name") === "email") $(this).val(userAddress["email"])
		if($(this).attr("name") === "address") $(this).val(userAddress["address"])	
		if($(this).attr("name") === "city") $(this).val(userAddress["city"])									
		if($(this).attr("name") === "province") $(this).val(userAddress["province"])
		if($(this).attr("name") === "postCode") $(this).val(userAddress["postCode"])						
	})
	
	function createCardProducts(imgPath, prodName, prodQty){
		
		const prodImg = $("<img>")
		.attr("width", "45")
		.attr("height", "45")
		.attr("src", `../../../assets/${imgPath}`)
		const prodDesc = $("<div>")
		const name = $("<p>").text(prodName)
		const qty = $("<p>").text(`x${prodQty}`)
		prodDesc.append(name, qty)
		const container = $("<div>").append(prodImg, prodDesc)
		$(".container-cart-action-prod").append(container)
	}
	
	let subtotal = 0
	let grandTotal = 0
	cart.forEach((item) => {
		subtotal += item.price
		createCardProducts(item.image, item.name, item.qty)
	})

	$(".container-cart-action-struct > ul:first-of-type > li:last-child")
	.text(moneyFormat(subtotal)[0])

	$(".container-cart-action-struct > ul:last-of-type > li:last-child > span")
	.text(moneyFormat(subtotal)[0])	

	function handleSubmit(e) {
		e.preventDefault()
		try{
			const datas = new FormData(e.target)
			const formatData = Object.fromEntries(datas.entries())
			const checkoutProd = [...cart]
			let newData = {}
			for(const val in formatData){ // cannot continue if address are empty
				if(!(formatData[val]) && val !== "optional"){
					throw new Error("Silahkan Isi Alamat Terlebih Dahulu") 
				}
			}
			if(!(datas.get("delivery-method"))){
				throw new Error("Mohon Pilih Metode Pengiriman")
			}
			newData = {
				...userData,
				checkout: checkoutProd,
				isCheckoutPaid: false,
			}
			window.localStorage.setItem("user",JSON.stringify(newData)) // update user's checkout datas
			// window.localStorage.setItem("account",JSON.stringify([ // update user's checkout datas
			// 	...userAccRest,
			// 	newData
			// ]))
			alert("Berhasil")
			window.location.href = "../checkout-payment/index.html"
		} catch(err){
			alert(err.message)
		}
	}

	$(".checkout-action-form-implement").on("submit", (e) => { handleSubmit(e) })

})