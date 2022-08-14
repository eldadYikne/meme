'use strict'

let gFilterBy
let gSavedMeme = setImagFromStoreage()? setImagFromStoreage():[]
function renderGallery() {
    const images = getImgForDisplay(gFilterBy)
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

function onPageSaved() {
    console.log('saasasa')

    const elEditor = document.querySelector('.editor')
    const elGallry = document.querySelector('.gallery')
    const elSaved = document.querySelector('.saved')
    elEditor.style.display = 'none'
    elGallry.style.display = 'none'
    elSaved.style.display = 'block'
    

    let strHTMLs= gSavedMeme.map(meme => {
         return `<div><button onclick="removeSavedImage(${meme})" class="remove-saved"> X</button>
          <img onclick="onImgSelect(${meme})" src="img/${meme}.jpg">
           </div>`
        }).join('')
    if(gSavedMeme.length===0){
        strHTMLs= '<h1> We sorry, not Meme saved yet.</h1>'
    }
    elSaved.innerHTML = strHTMLs

}
function onSaveMeme() {
    gSavedMeme.push(gMeme.selectedImgId)
    saveImgToStoreage()
    console.log(gSavedMeme);
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

function onSearch(value) {


    getImgForDisplay(value)
    renderGallery()
}
function removeSavedImage(idx){
  let removeMemeIdx=  gSavedMeme.filter(id=> id===idx)
  gSavedMeme.splice(removeMemeIdx,1)
    onPageSaved()
}