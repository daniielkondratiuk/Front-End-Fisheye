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

        //Add classes and attributes for DOM elements
        img.classList.add('card-img')
        h2.classList.add('card-name')
        content.classList.add('content')
        article.setAttribute('data-id', id)
        img.setAttribute("src", picture)

        //Set values for DOM elements
        h2.textContent = name
        location.textContent = `${city}, ${country}`
        description.textContent = tagline
        priceParHours.textContent = `${price}€/jour`

        //Append DOM elements to the DOM
        content.append(location, description, priceParHours)
        article.append(img, h2, content)
        //Return the DOM elements

        return (article)
    }

    return {name, picture, getUserCardDOM}
}
