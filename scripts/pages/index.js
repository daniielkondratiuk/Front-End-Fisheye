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

// function redirectToPhotographer(target) {
//     window.location.href = `./photographer.html?id=${target.parentNode.dataset.id}`
// }

// document.addEventListener('click', ({target}) => {
//     if (target.classList.contains('card-img') || target.classList.contains('card-name')) {
//         redirectToPhotographer(target)
//     }
// })
// document.addEventListener('keydown', ({target, key}) => {
//     if (key === 'Enter' && target.classList.contains('card-img') || key === 'Enter' && target.classList.contains('card-name')) {
//         redirectToPhotographer(target)
//     }
// })

async function init() {
    const {photographers} = await getData(URL)
    await displayData(photographers)
}

init()
    