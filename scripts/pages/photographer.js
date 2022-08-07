import getData from '../utils/api/getData.js'
import getSearchParam from '../utils/getSearchParam.js'
import photographerFactory from "../factories/photographer.js"
import slider from "../utils/slider.js";
import clearFormValues from "../utils/clearFormValues.js";

const URL = '../../data/photographers.json'
const searchParam = getSearchParam('id')
const select = document.querySelector('#select')
let {photographers, media} = await getData(URL)
let portfolio = media.filter(el => el?.photographerId === searchParam)
let totalLikes = portfolio.reduce((acc, el) => acc + el.likes, 0)


document.addEventListener('focusin', ({target}) => {
    if (target.classList.contains('select_option')) {
        select.classList.add('open')
        const orderBy = target.getAttribute('data-value')
        const options = document.querySelectorAll('.select_option')

        target.addEventListener('keydown', ({key}) => {
            if (key === 'Enter') {
                select.classList.remove('open')
                options.forEach(option => {
                    option.style.pointerEvents = 'none'
                    option.classList.remove('checked')
                    option.getAttribute('data-value') === orderBy ? option.classList.add('checked') : ''
                })
                sortByOrder(portfolio, orderBy)
                renderMedia()
            }
        })
    }
    if (target.classList.contains('card-img') || target.classList.contains('card-name')) {
        target.addEventListener('keydown', ({key}) => {
            if (key === 'Enter') {
                const index = Number.parseInt(target.dataset.index)
                slider(portfolio, index)
            }
        })
    }
    if (target.classList.contains('close')) {
        target.addEventListener('keydown', ({key}) => {
            if (key === 'Enter') {
                document.querySelector('.slider').classList.remove('open')
            }
        })
    }
})

document.addEventListener('focusout', ({target}) => {
    if (target.classList.contains('select_option')) {
        select.classList.remove('open')
    }
})


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
        sortByOrder(portfolio, orderBy)
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
    portfolio.forEach((el, index) => photographCards.insertAdjacentHTML('beforeend', getCardTemplate(el, index)))
}

function getCardTemplate(el, index) {
    const {title, likes, image, video} = el
    const imageHtml = image ? `<img class="card-img" data-index="${index}" tabindex="0" aria-label="photo ${title}" src="./assets/images/${image}" alt="${title}">` : ''
    const videoHtml = video ? `<video class="card-video" data-index="${index}" tabindex="0" aria-label="videos ${title}" src="./assets/videos/${video}" controls></video>` : ''
    return `
        <div class="card">
            ${imageHtml}
            ${videoHtml}
            <div class="card-description">
                <h3 class="card-title" tabindex="0" aria-label="${title}">${title}</h3>
                <div class="card-likes" data-like="${likes}" tabindex="0" aria-label="Have ${likes}">${likes} <i class="fa-regular fa-heart"></i></div>
            </div>
        </div>
    `
}

function sortByOrder(arr, order = 'likes') {
    if (order === 'likes') {
        portfolio = arr.sort((a, b) => b[order] - a[order])
    } else {
        portfolio = arr.sort((a, b) => a[order]?.localeCompare(b[order]))
    }
}

function addNameToContactForm(name) {
    const form = document.querySelector('#contact_modal')
    const placeForNameHTMl = form.querySelector('h2')
    const nameHTML = `<p>${name}</p>`
    placeForNameHTMl.insertAdjacentHTML('beforeend', nameHTML)
}

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const values = Object.fromEntries(new FormData(e.target).entries())
    for (const value in values) {
        if (values[value].trim() === '') {
            alert('Please fill all fields')
            return
        }
    }
    console.log(values)
    clearFormValues(e.target)
    closeModal()
    setTimeout(() => {
        alert('Thank you for your message')
    }, 200)
})

function getSticker(selector) {
    const sticker = document.getElementById(selector)
    const likes = `<span>${totalLikes} <i class="fa-solid fa-heart"></i></span>`
    const price = `<span>148€ / jour</span>`
    sticker.innerHTML = likes + price
}

function toggleLike(el) {
    el.classList.toggle('liked')
    if (el.classList.contains('liked')) {
        el.dataset.like = Number(el.dataset.like) + 1
        el.innerHTML = `${el.dataset.like} <i class="fa-solid fa-heart"></i>`
        totalLikes++

    } else {
        el.dataset.like = Number(el.dataset.like) - 1
        el.innerHTML = `${el.dataset.like} <i class="fa-regular fa-heart"></i>`
        totalLikes--
    }
    getSticker('sticker')
}

async function init() {
    const [photographer] = photographers.filter(photographer => photographer.id === searchParam)
    displayData(photographer)
    sortByOrder(portfolio)
    renderMedia(portfolio)
    addNameToContactForm(photographer.name)
    getSticker('sticker')
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('card-video')) {
        const index = Number.parseInt(event.target.dataset.index)
        slider(portfolio, index)
    }
    if (event.target.classList.contains('card-img')) {
        const index = Number.parseInt(event.target.dataset.index)
        slider(portfolio, index)
    }
    if (event.target.classList.contains('card-likes')) {
        toggleLike(event.target)
    }
})


init()