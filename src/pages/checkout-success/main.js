import moneyFormat from "../../js/utils/money-format.js"

$(document).ready(function(){
    const userData = JSON.parse(window.localStorage.getItem("user"))
    const checkout = userData.checkout
    
    $(".transactions-total > h4").text(moneyFormat(userData.checkoutTotal)[0])
    $(".delivery-method > p:first-child").text(userData.deliveryMethod[0])
    $(".delivery-method > p:last-child > span").text(userData.deliveryMethod[1])
    $(".address > p:last-child").text(userData.address[0].fullAddress)
})