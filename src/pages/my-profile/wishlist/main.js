import { makeProductCard } from "../../../js/landing.js"

const parentEl = document.querySelector(".product-cards-wrapper")
const btnLoadMore = document.querySelector(".content-products-browse-more-btn")
const imagePath = '../../../../../assets/'

function loadMoreData(add){
    const nodeLength = parentEl.children.length + add
    const data = makeProductCard(parentEl, nodeLength, imagePath)
    data.then((res) => {
        if((res-nodeLength) < 0){
            btnLoadMore.querySelector("button").classList.add("no-display")
        }
        if((res-nodeLength) < 6) {
            btnLoadMore.querySelector("button")
            .innerText = `Muat (${res-nodeLength} Produk) terakhir` 
        }
    })
}

makeProductCard(parentEl, 6, imagePath)