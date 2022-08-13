'use strict'

var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 9, dog: 10, cute: 7, crazy: 9, happy: 14, }


function renderGallery() {
    const images = getImgs()
    const strHTMLs = images.map(img => {
        return `<img onclick="onImgSelect(${img.id})"  src="img/${img.id}.jpg">`
    }).join('')

    document.querySelector('.gallery-container').innerHTML = strHTMLs

}

function onImgSelect(id) {
    setImg(id)
    const elEditor = document.querySelector('.editor')
    const elGallry = document.querySelector('.gallery')
    elEditor.style.display = 'block'
    elGallry.style.display = 'none'
}

function onFlexible() {
    let randomImgId = getRandomInt(0, getImgs().length - 1)
    setRandomOptions()
    onImgSelect(randomImgId)
    onSetColorStroke()
    onSetColor()
}

function toggleNavBar() {
    document.body.classList.toggle('menu-opened')
}


function onSearchWord() {
    var strHtml = ''
    for (let keyWord in gKeywordSearchCountMap) {
        strHtml += `<a onclick="onClickWord(this)" style="font-size:${gKeywordSearchCountMap[keyWord] * 3}px;" name="${keyWord}">       ${keyWord}</a>`
    }
    document.querySelector('.search').innerHTML = strHtml

}
function onClickWord(word) {
    gKeywordSearchCountMap[word.name]++
    onSearchWord()
}