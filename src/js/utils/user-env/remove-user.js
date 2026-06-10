$(document).ready(function(){
    return window.localStorage.getItem("user") ? window.localStorage.removeItem("user") : false
})