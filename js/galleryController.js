'use strict'



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


function renderKeyWord() {
    let keyWords = getKeyWords()
    var strHtml = ''
    for (let keyWord in keyWords) {
        strHtml += `<a onclick="onClickWord(this)" style="font-size:${keyWords[keyWord] * 3}px;" name="${keyWord}">       ${keyWord}</a>`
    }
    document.querySelector('.key-word').innerHTML = strHtml

}
function onClickWord(word) {
    gKeywordSearchCountMap[word.name]++
    renderKeyWord()
}