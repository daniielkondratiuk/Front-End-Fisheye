import getData from '../utils/api/getData.js'
import photographerFactory from '../factories/photographer.js'

const URL = '../../data/photographers.json'

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section")
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer)
        const userCardDOM = photographerModel.getUserCardDOM()
        photographersSection.appendChild(userCardDOM)
    })
}

document.addEventListener('click', ({target}) => {
    if(target.classList.contains('card-img') || target.classList.contains('card-name')) {
        window.location.href = `./photographer.html?id=${target.parentNode.dataset.id}`
    }
})

async function init() {
    const {photographers} = await getData(URL)
    await displayData(photographers)
}

init()
    