'use strict'
let gIdx = 0
let gHeight
let gStartShowIdx=0
let gEmojis=['😀', '😃', '😄', '😁' ,'😆' ,'😅' ,'😂', '🤣',  '😊', '😇', '🙂', '🙃', '😉', '😌', '😍' ,'🥰' ,'😘', '😗' ,'😙' ,'😚' ,'😋', '😛', '😝' ,'😜' ,'🤪', '🤨', '🤬' ,'🤯' ,'😳' ,'🥵' ,'🥶' ,'😱' ]

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['funny', 'trump'] },
    { id: 2, url: 'img/2.jpg', keywords: ['cute', 'dog', 'baby'] },
    { id: 3, url: 'img/3.jpg', keywords: ['cute', 'cat',] },
    { id: 4, url: 'img/4.jpg', keywords: ['cute', 'fuuny', 'baby'] },
    { id: 5, url: 'img/5.jpg', keywords: ['explaine', 'crazy'] },
    { id: 6, url: 'img/6.jpg', keywords: ['cute', 'surprised', 'baby'] },
    { id: 7, url: 'img/7.jpg', keywords: ['cute', 'dog'] },
    { id: 8, url: 'img/8.jpg', keywords: ['cute', 'dog'] },
    { id: 9, url: 'img/9.jpg', keywords: ['cute', 'dog'] },
    { id: 10, url: 'img/10.jpg', keywords: ['cute', 'dog'] },
    { id: 11, url: 'img/11.jpg', keywords: ['cute', 'dog'] },
    { id: 12, url: 'img/12.jpg', keywords: ['cute', 'dog'] },
    { id: 13, url: 'img/13.jpg', keywords: ['cute', 'dog'] },
    { id: 14, url: 'img/14.jpg', keywords: ['cute', 'dog'] },
    { id: 15, url: 'img/15.jpg', keywords: ['cute', 'dog'] },
];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: gIdx++,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40 + 'px',
            align: 'center',
            color: '#FFFAF0',
            strokeColor: 'black',
            isChoose: false,
            font: 'impact',
            lineHeigth: 50,
            isDrag: false,
            pos:50,

        }

    ]
}

function getMeme() {
    return gMeme
}
function getImgs() {
    return gImgs
}

function findImgByid(id) {
    let currImg = gImgs.find(img => img.id === id)
    return currImg
}

function setLineText(value) {
    gMeme.lines[getMeme().selectedLineIdx].txt = `${value}`
}

function setImg(id) {
    gMeme.selectedImgId = id
    renderMeme()

}

function setSearchMeme(value) {
    if (!value) return

    const imgs = gImgs.forEach(img => img.keywords
        .filter(key => {
            key === value
        }));


}
function setNewLine(value = 'New Text') {
    gMeme.lines.push({
        txt: value,
        size: 40 + 'px',
        align: 'center',
        color: '#FFFAF0',
        strokeColor: 'black',
        isChoose: false,
        font: 'impact',
        lineHeigth: 350,
        isDrag: false,
        pos: 350,
    })
}


function lineLocation(idx) {

    let height = 50

    if (idx === 0 && gMeme.lines.length === idx + 1) return gMeme.lines[idx].pos = height
    if (idx === 1 && gMeme.lines.length === idx + 1) return gMeme.lines[idx].pos = height * 7
    if (idx === 2 && gMeme.lines.length === idx + 1) return gMeme.lines[idx].pos = height * 4
    if (idx >= 3 && gMeme.lines.length === idx + 1) return gMeme.lines[idx].pos = height * 4
}
function setFont(font) {
    if (font === 'impact') return gMeme.lines[gMeme.selectedLineIdx].font = 'impact'
    if (font === 'Tahoma') return gMeme.lines[gMeme.selectedLineIdx].font = 'Tahoma '
    if (font === 'Arial') return gMeme.lines[gMeme.selectedLineIdx].font = 'Arial'


}
function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}
function setTxtSide(value) {
    if (!gMeme.lines[gMeme.selectedLineIdx].isChoose) return
    if (value === 'right') {
        return gMeme.lines[gMeme.selectedLineIdx].align = 'left'
    }
    if (value === 'align') {
        return gMeme.lines[gMeme.selectedLineIdx].align = 'center'
    }
    if (value === 'left') {
        return gMeme.lines[gMeme.selectedLineIdx].align = 'right'

    }
}
function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}
function isLineClicked(clickedPos) {
  
    const { pos } = gMeme.lines[gMeme.selectedLineIdx]
    if (clickedPos.y < pos + 40 && clickedPos.y > pos - 30) return true
    else return false
}

function moveLine(dx, dy) {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    // currLine.pos.x += dx
    currLine.pos += dy
}

function setEmoji(){
let  emojis = gEmojis.map(emoji=> `<a onclick="onEmoji(event)">${emoji}</a>` )
let emojiShown=  emojis.slice(gStartShowIdx,gStartShowIdx+4 )
gStartShowIdx+=4
if(gStartShowIdx>=emojis.length)gStartShowIdx=0
return emojiShown
}
