import getData from '../utils/api/getData.js'
import getSearchParam from '../utils/getSearchParam.js'
import photographerFactory from "../factories/photographer.js"

const URL = '../../data/photographers.json'
const searchParam = getSearchParam('id')
const select = document.querySelector('#select')
let {photographers, media} = await getData(URL)
media = media.filter(el => el.photographerId === searchParam)

select.addEventListener('click', ({target}) => {
    const isClose = !select.classList.contains('open')
    const options = document.querySelectorAll('.select_option')
    const orderBy = target.getAttribute('data-value')
    if (isClose) {
        select.classList.add('open')
        options.forEach(option => option.style.pointerEvents = 'all')
    } else {
        select.classList.remove('open')
        options.forEach(option => {
            option.style.pointerEvents = 'none'
            option.classList.remove('checked')
            option.getAttribute('data-value') === orderBy ? option.classList.add('checked') : ''
        })
    }
    if (orderBy) {
        sortByOrder(media, orderBy)
        renderMedia()
    }
})

function displayData(photographer) {
    const photographersSection = document.querySelector(".photograph-header")
    const {getUserInfoDOM, getUserImageDOM} = photographerFactory(photographer)
    photographersSection.insertAdjacentElement("afterbegin", getUserInfoDOM())
    photographersSection.insertAdjacentElement("beforeend", getUserImageDOM())
}

function renderMedia() {
    const photographCards = document.querySelector('.photograph-cards')
    photographCards.innerHTML = ''
    media.forEach(el => photographCards.insertAdjacentHTML('beforeend', getCardTemplate(el)))
}

function getCardTemplate(el) {
    const {title,likes,image,video} = el
    const imageHtml = image ? `<img class="card-img" src="./assets/images/${image}" alt="${title}">` : ''
    const videoHtml = video ? `<video class="card-img" src="./assets/videos/${video}" controls></video>` : ''
    return `
        <div class="card">
            ${imageHtml}
            ${videoHtml}
            <div class="card-description">
                <h3 class="card-title">${title}</h3>
                <div class="card-likes">${likes} <i class="fa-solid fa-heart"></i></div>
            </div>
        </div>
    `
}

function sortByOrder(arr, order = 'likes') {
    if (order === 'likes') {
        media = arr.sort((a, b) => {
            return a[order] - b[order]
        })
    } else {
        media = arr.sort((a, b) => {
            return a[order] > b[order] ? 1 : -1
        })
    }
}

async function init() {
    const [photographer] = photographers.filter(photographer => photographer.id === searchParam)
    displayData(photographer)
    sortByOrder(media)
    renderMedia(media)
}

init()