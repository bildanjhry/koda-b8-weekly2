$(document).ready(function(){
	const parent = $(".nav-actions")

	function goBackButton() {
		parent.children().not(":last").remove()
		const backButton = $("<button>").attr("type", "button").addClass("button-back")
		const arrow = $("<img>").attr("alt", "back arrow").attr("src", "../../../assets/arrow-left.svg").addClass("rotate")
		const text = $("<p>").text("Kembali").addClass("blue-color")
		backButton.append(arrow, text)
		backButton.on("click", function(){
			window.history.back()
		})
		parent.prepend(backButton)
	}

	function bottomBar(){
		const container = $("<div>").addClass("bottom-bar-container")
		const descInfo = $("<div>").addClass("bottom-bar-desc")
		const totalText = $("<p>Total</p>")
		const totalValue = $("<h4>Rp 40.000</h4>")
		const checkButton = $("<button>").addClass("bottom-bar-checkout-btn")
		descInfo.append(totalText, totalValue)
		container.append(descInfo, checkButton)
		$("body").append(container)
	}

	if(window.innerWidth <= 800) {
		goBackButton()
		bottomBar()
	}
})