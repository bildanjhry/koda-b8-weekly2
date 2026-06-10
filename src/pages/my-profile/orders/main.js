$(document).ready(function() {
	function handleLogout(){
		window.localStorage.getItem("user") ?
		window.localStorage.removeItem("user") :
		false
		window.location.href = "../../auth/login/index.html"
	}

  $(".profile-logout-btn").on("click", () => { handleLogout() })
})