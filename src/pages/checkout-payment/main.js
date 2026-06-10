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
        subtotal += (item.price * item.qty)
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
      
            if(!(datas.get("payment-method"))){
                throw new Error("Mohon Pilih Metode Pembayaran")
            }

            const paymentMethod = $(e.target).find('input[name="payment-method"]:checked')
            .val()
            .split("-").map((item) => {
                return item.charAt(0).toUpperCase() + item.slice(1)
            }).join(" ")

            newData = {
                ...userData,
                isCheckoutPaid: "pending",
                paymentMethod: paymentMethod
            }
            window.localStorage.setItem("user",JSON.stringify(newData)) // update user's checkout datas
            // window.localStorage.setItem("account",JSON.stringify([ // update user's checkout datas
            // 	...userAccRest,
            // 	newData
            // ]))
            alert("Berhasil")
            window.location.href = "../checkout-confirm/index.html"
        } catch(err){
            alert(err.message)
        }
    }

    $(".checkout-action-form-implement").on("submit", (e) => { handleSubmit(e) })
})