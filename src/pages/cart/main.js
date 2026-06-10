import moneyFormat from "../../js/utils/money-format.js"

$(document).ready(function(){
    const dataUser = JSON.parse(window.localStorage.getItem("user"))
    const cart = dataUser.cart
    const address = dataUser.address
    const parent = $(".container-cart-action-items")
    const checkoutBtn = $(".container-cart-action-struct-btn")
    let subtotal = 0
    let itemsTotal = 0
   
    function handleCheckout(){
        if(!address){
            alert("Silahkan isi alamat anda terlebih dahulu")
            window.location.href = "../my-profile/address/index.html"
        }
        window.location.href = "../checkout/index.html"
    }
    
    checkoutBtn.on("click", handleCheckout)

    if(!cart){
        return false
    }
    $(".cart-title").text(`Keranjang Belanja (${cart.length} Item)`)
    
    cart.forEach((item) => {
        subtotal += item.price
        itemsTotal += parseInt(item.qty)
        const cardWrapper = $("<section>")
        
        const imageContainer = $("<div>").addClass("container-cart-action-items-img")
        const prodImage = $("<img>")
        .attr("src", `../../../assets/${item.image}`)
        .attr("width", "96")
        .attr("height", "96")
        
        const descSection = $("<section>")
        const descContainer = $("<div>").addClass("container-cart-action-items-desc")
        const prodTittle = $("<h5>").text(item.name)
        const pAttribute = $("<p>").text(item.color)
        const qtyVal = $("<span>").text(item.qty)
        const total = $("<h2>").text(moneyFormat(item.price)[0])
        
        const qtyDecBtnImage = $("<img>").attr("src", "../../../assets/minus-icon.svg")
        const qtyIncBtnImage = $("<img>").attr("src", "../../../assets/plus-icon.svg")
        const decQtyBtn = $("<button>")
        const incQtyBtn = $("<button>")
        
        const qtyButtonWrapper = $("<div>")
        
        const qtyContainer = $("<div>").addClass("container-cart-action-items-desc-qty")
        
        const wishButton = $("<button>").addClass("container-cart-action-items-desc-fav")
        const wishButtonImg = $("<img>").attr("src", "../../../assets/fav-icon.svg")
        const wishButtonTxt = $("<span>").text("Simpan ke wishlist")
        
        const resultSection = $("<section>")
        const delBtnImg = $("<img>").attr("src", "../../../assets/delete-line-icon.svg")
        const delBtn = $("<button>").append(delBtnImg)
        
        imageContainer.append(prodImage)
        decQtyBtn.append(qtyDecBtnImage)
        incQtyBtn.append(qtyIncBtnImage)
        qtyButtonWrapper.append(decQtyBtn, qtyVal, incQtyBtn)
        qtyContainer.append(qtyButtonWrapper)
        wishButton.append(wishButtonImg, wishButtonTxt)
        
        descSection.append(prodTittle, pAttribute, qtyContainer, wishButton)
        resultSection.append(delBtn, total)
        
        descContainer.append(descSection, resultSection)
        cardWrapper.append(imageContainer, descContainer)
        
        parent.prepend(cardWrapper)
    });
    
    $(".container-cart-action-struct > ul:first-of-type > li:last-child")
    .text(moneyFormat(subtotal)[0])
    
    $(".container-cart-action-struct > ul:first-of-type > li:first-child")
    .text(`Subtotal (${itemsTotal} item)`)
    
    $(".container-cart-action-struct > ul:last-of-type > li:last-child > span")
    .text(moneyFormat(subtotal)[0])
    console.log(subtotal)
})