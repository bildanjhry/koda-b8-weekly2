import handleData from "./services/fetch-data.js"

async function makeHtmlElements(){

    try{
        const data = await handleData()
        const cardWrapper = document.createElement("div")
        console.log(data)
        console.log(data.length)
        const cardDesc = document.querySelectorAll(`.flash-deals-card-desc > h4`)
        data.forEach((item, index) => {
            console.log(cardDesc)
            const card = document.createElement("div")
            const h3 = document.createElement("h3")
            const p = document.createElement("p")
            cardDesc[index].innerHTML = item.name
            p.innerHTML = item.price
            // card.appendChild(h3)
            // card.appendChild(p)
            // cardWrapper.appendChild(card)
        })

        const main = document.querySelector("main")
        main.appendChild(cardWrapper)

    } catch(err) {
        console.log(err.message)
    }

}

makeHtmlElements()
