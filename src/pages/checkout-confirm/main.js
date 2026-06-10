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

    const name = $(".checkout-action-form-confirm-address > p:nth-child(2)")
    name.text(`${userData.fullname} · `)
    name.children("span").text(userData.phone)
    $(".checkout-action-form-confirm-address > p:last-of-type")
    .text(address[0].fullAddress)

    const deliver = $(".checkout-action-form-confirm-delivery > .delivery-method")
    deliver.text(`${userData.deliveryMethod[0]} · ${userData.deliveryMethod[1]}`)

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

    function createCardProducts(imgPath, prodName, prodQty, prodPrice){
			const wrapper = $(".checkout-action-form-confirm-products-prod")
			const innerWrapper = $("<div>")

			const image = $("<img>")
			.attr("src", `../../../assets/${imgPath}`)
			.attr("width", "48")
			.attr("height", "48")

			const descWrapper = $("<div>")
			const infoWrapper = $("<div>")
			const title = $("<p>").text(prodName)
			const qty = $("<p>").text(`x${prodQty}`)
			const price = $("<p>").text(`${moneyFormat(prodPrice)[0]}`)

			infoWrapper.append(title, qty)
			descWrapper.append(infoWrapper, price)
			innerWrapper.append(image, descWrapper)
			wrapper.append(innerWrapper)

    }

		function createCardProductsRes(imgPath, prodName, prodQty){
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
        subtotal += (item.price * item.qty)
        // create product list based on cart datas
        createCardProducts(item.image, item.name, item.qty, item.price)
				createCardProductsRes(item.image, item.name, item.qty)
    })
    grandTotal += subtotal

    $(".container-cart-action-struct > ul:first-of-type > li:last-child")
    .text(moneyFormat(subtotal)[0])

    $(".container-cart-action-struct > ul:last-of-type > li:last-child > span")
    .text(moneyFormat(subtotal)[0])	

    $(".checkout-action-form-buttons > button > p")
    .text(`Bayar ${moneyFormat(grandTotal)[0]} Sekarang`)

    function handleSubmit(e) {
        e.preventDefault()
        try{
            let newData = {}
            newData = {
                ...userData,
                isCheckoutPaid: "success",
								orderStatus:"ordered",
								checkoutTotal:grandTotal
            }
            window.localStorage.setItem("user",JSON.stringify(newData)) // update user's checkout datas
            // window.localStorage.setItem("account",JSON.stringify([ // update user's checkout datas
            // 	...userAccRest,
            // 	newData
            // ]))
            alert("Berhasil")
            window.location.href = "../checkout-success/index.html"
        } catch(err){
            alert(err.message)
        }
    }

    $(".checkout-action-form-implement").on("submit", (e) => { handleSubmit(e) })
})