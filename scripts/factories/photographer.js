export default function photographerFactory(data) {
    const {name, id, city, country, tagline, price, portrait} = data
    const picture = `assets/photographers/${portrait}`

    function getUserCardDOM() {
        // Create the DOM elements
        const article = document.createElement('article')
        const img = document.createElement('img')
        const content = document.createElement('div')
        const location = document.createElement('h3')
        const description = document.createElement('p')
        const priceParHours = document.createElement('span')
        const h2 = document.createElement('h2')
        const link = document.createElement('a')

        //Add classes and attributes for DOM elements
        article.classList.add('card')
        img.classList.add('card-img')
        h2.classList.add('card-name')
        link.classList.add('card-link')
        content.classList.add('content')
        link.setAttribute('href', `./photographer.html?id=${id}`)
        link.setAttribute('aria-label', `Voir la page de ${name}`)
        img.setAttribute("src", picture)

        //Set text values for DOM elements
        h2.textContent = name
        location.textContent = `${city}, ${country}`
        description.textContent = tagline
        priceParHours.textContent = `${price}€/jour`

        //Append DOM elements to the DOM
        content.append(location, description, priceParHours)
        link.append(img,h2)
        article.append(link, content)
        //Return the DOM elements
        return (article)
    }

    function getUserImageDOM() {
        const article = document.createElement('article')
        const img = document.createElement('img')
        img.setAttribute('aria-label', name)
        img.setAttribute('tabindex', '0')
        img.classList.add('card-img')
        img.setAttribute("src", picture)
        img.setAttribute("alt", name)
        article.append(img)
        return article
    }

    function getUserInfoDOM() {
        const title = document.createElement('h1')
        const location = document.createElement('h3')
        const description = document.createElement('p')
        const content = document.createElement('div')
        content.classList.add('photograph-header__description')
        content.setAttribute('tabindex', '0')

        title.textContent = name
        location.textContent = `${city}, ${country}`
        description.textContent = tagline
        content.append(title, location, description)
        return content
    }

    return {name, picture, getUserCardDOM, getUserImageDOM, getUserInfoDOM}
}
