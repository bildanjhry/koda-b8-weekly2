import handleData from "./services/fetch-data.js"
import moneyFormat from "./utils/money-format.js"

function handleRatingStars(rating, ratingTotal){
  const stars = document.createElement("p")
  for(let i = 1 ; i <= 5; i++){
    const span = document.createElement("span")
      span.setAttribute("class", "fa fa-star")
        if(Math.round(rating) >= i){
          span.classList.add("checked")
        }
      stars.appendChild(span)
    }
    const ratingDesc = document.createElement("span")
    ratingDesc.innerText = `${rating} (${ratingTotal})`
    ratingDesc.classList.add("rating-margin")
    stars.appendChild(ratingDesc)
    return stars
}

export default async function makeProductCard(parentEl, dataLength, pathAssets){
  try{
      const data = await handleData()
        data.forEach((item, index) => {
          if((index+1) <= dataLength ){
            const cardWrapper = document.createElement("a")
            const div = document.createElement("div")
            const div2 = document.createElement("div")
            const div3 = document.createElement("div")
            const span = document.createElement("span")
            const span2 = document.createElement("span")
            const span3 = document.createElement("span")
            const s = document.createElement("s")
            const p = document.createElement("p")
            const p2 = document.createElement("p")
            const h4 = document.createElement("h4")
            const h3 = document.createElement("h3")
            const img = document.createElement("img")

            div.classList.add("product-card")
            span.classList.add("product-card-cut")
            div3.classList.add("product-card-desc")
            h3.classList.add("product-card-price")
            img.setAttribute("src", pathAssets+item.image)
            img.setAttribute("width", "100%")

            h4.innerText = item.name
            span2.innerText = item.discount
            p2.innerText = item.brand
            h3.innerText = moneyFormat(item.price)[0]

            span.appendChild(span2)
            div2.appendChild(img)
            div3.appendChild(p2)
            div3.appendChild(p)
            div3.appendChild(h4)
            div3.appendChild(handleRatingStars(item.rating, item.ratingTotal))
            if(item.promoPrice){
                s.innerText = moneyFormat(item.promoPrice)[0]
                span3.appendChild(s)
                h3.appendChild(span3)
            }
            div3.appendChild(h3)
            div.appendChild(span)
            div.appendChild(div2)
            div.appendChild(div3)
            cardWrapper.appendChild(div)
            parentEl.appendChild(cardWrapper)
          }
    })
     
  } catch(err) {
    console.log(err.message)
  }
}

