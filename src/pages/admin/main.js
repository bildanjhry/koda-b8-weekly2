$(document).ready(function(){
    const user = JSON.parse(window.localStorage.getItem("user"))
    if(!user){
        window.location.href = "../../index.html"
    }
    if(user.email.split("@")[1] !== "admin.com"){
        alert("Anda tidak punya akses dihalaman ini")
        window.location.href = "../../index.html"
    }
    const profile = $(".profile > p")
    profile.text(user.fullname)
})