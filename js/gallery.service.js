'use strict'
let gRandomLines = ['I sometimes eat Falafel', 'im soryy', 'happy for you', 'its real when i', 'i miss you hony', 'whem your mom', 'im so scared', 'oh Hug me baby', 'i love you', 'you so pretty', 'can i touch?', 'its really you?!', 'you a littel..', 'are you pretty like', 'donkey baby donkey']
var gKeywordSearchCountMap = { funny: 12, cat: 16, baby: 9, dog: 10, cute: 7, crazy: 9, happy: 14, }


function getKeyWords(){
    return gKeywordSearchCountMap
}

function setImagFromStoreage(){
    return  loadFromStorage('user-meme')
}

 function saveImgToStoreage(){
    saveToStorage('user-meme', gSavedMeme)
}
