$(document).ready(function(){
	const dataUser = JSON.parse(window.localStorage.getItem("user"))
	if(dataUser){
		const userName = dataUser.fullname.split(" ")[0]
		const profile = $(".nav-actions-menu-profile > a > span").text(userName)
	}
})