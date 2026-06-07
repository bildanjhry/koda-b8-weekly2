const navigation = document.querySelector("nav")
const content = document.querySelector(".nav-actions-menu")
const newContent = content.cloneNode(true)
const header = document.querySelector("header")

if(window.innerWidth <= 695) {
    const newNav = document.createElement("nav")
    const newDiv = document.createElement("div")
    newDiv.classList.add("nav-actions-wrapper")
    newDiv.appendChild(content)
    newNav.classList.add("nav-container-bottom")
    newNav.appendChild(newDiv)
    header.appendChild(newNav)
} 