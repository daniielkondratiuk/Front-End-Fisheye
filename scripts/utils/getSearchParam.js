const  getSearchParam = (name) => {
    let params = (new URL(document.location)).searchParams;
    return isNaN(params.get(name)) ? params.get(name) : Number(params.get(name))
}

export default getSearchParam