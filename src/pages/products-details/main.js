$(document).ready(function(){
	const cartBtn = $(".add-cart-btn")
	const coosenColor = $(".coosen-color")
	const incBtn = $(".quantity-inc-btn")
	const decBtn = $(".quantity-dec-btn")
	const qtyTotal = $(".quantity-total")
	const colorInput = $(".color-input")
	
	// handle product qty
  if(parseInt(qtyTotal.text()) >= 1) {
		let res = parseInt(qtyTotal.text())
    incBtn.on('click', () => {
			res += 1
      qtyTotal.text(`${res}`)
    })
    decBtn.on('click', () => {
			if(!(parseInt(qtyTotal.text()) < 2)) {
				res -= 1
      	qtyTotal.text(`${res}`)
      }
    })
  }
	
	function handleAddCart() {
		const user = JSON.parse(window.localStorage.getItem("user")) 
		try{
			let productForm = {}
			let cartProduct = []
			const productQty = $(".quantity-total").text()
			
			if(!user){
				throw new Error("Anda harus login untuk melanjutkan")
			}
			if(!coosenColor.text()) {
				throw new Error("Silahkan pilih warna untuk melanjutkan")
			}

			productForm = {
					name: $(".product-name").text(),
					price: $(".product-price").data("value"),
					qty: productQty,
					color: coosenColor.text(),
					image: $(".prod-content-image > img").data("value")
			}

			if(user.cart) cartProduct = [...user.cart]
			cartProduct.push(productForm)
			window.localStorage.setItem("user", JSON.stringify({
				...user,
				cart : cartProduct
			}))

			alert("Berhasil menambahkan product")
		} catch(err){
			alert(err.message)
		}
	}

	colorInput.each(function () {
		$(this).on('click', function () {
			coosenColor.text($(this).val())
		})
	})

	cartBtn.on("click", handleAddCart)
})