function slider(media, index) {
    const slideInfo = media.map(({image, video, title}) => {
        return {title, type: image && !video ? 'image' : 'video', url: image || video}
    })
    const slider = document.querySelector('.slider')
    const sliderTitle = slider.querySelector('.slider__title')
    const sliderImg = slider.querySelector('.slider__img')
    const sliderVideo = slider.querySelector('.slider__video')
    const prev = slider.querySelector('.prev')
    const next = slider.querySelector('.next')
    const close = slider.querySelector('.close')

    function makeSliderByType() {
        if (slideInfo[index].type === 'video') {
            sliderImg.style.display = 'none'
            sliderVideo.style.display = 'block'
            sliderVideo.src = `./assets/videos/${slideInfo[index].url}`
            sliderVideo.alt = slideInfo[index].title
        } else {
            sliderVideo.style.display = 'none'
            sliderImg.style.display = 'block'
            sliderImg.src = `./assets/images/${slideInfo[index].url}`
            sliderImg.alt = slideInfo[index].title

        }
    }

    slider.classList.add('open')
    sliderTitle.innerHTML = slideInfo[index].title
    makeSliderByType()
    addEventListener('keydown', ({key}) => {
        if (key === 'ArrowLeft') {
            changeSlide('prev')
        } else if (key === 'ArrowRight') {
            changeSlide('next')
        } else if (key === 'Escape') {
            slider.classList.remove('open')
        }
    })

    function changeSlide(direction) {
        if (direction === 'prev') {
            index = index === 0 ? slideInfo.length - 1 : index - 1
        }
        if (direction === 'next') {
            index = index === slideInfo.length - 1 ? 0 : index + 1
        }
        makeSliderByType()
        sliderTitle.innerHTML = slideInfo[index].title
    }

    prev.addEventListener('click', () => changeSlide('prev'))
    next.addEventListener('click', () => changeSlide('next'))
    close.addEventListener('click', () => slider.classList.remove('open'))
}

export default slider