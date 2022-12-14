'use strict'
let gElCanvas
let gCtx
let gFontSizeCount = 40
let gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
let gIsEmoji = false
let gCurrEmoji
let gUserImg = null


function onInit() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderGallery()
    addListeners()
    renderMeme()
    resizeCanvas()
    onPutEmoji()
    renderKeyWord()
}



function renderMeme() {

    const currMeme = getMeme()
    const img = new Image()

    img.src = findImgByid(currMeme.selectedImgId).url
    img.onload = () => {

        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderLines()
        if (gIsEmoji) drawEmojy(gCurrEmoji, 30, 100)
    }

}


function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}


function addMouseListeners() {

    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isLineClicked(pos)) return
    getMeme().lines[getMeme().selectedLineIdx].isChoose = true
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (getMeme().lines.length === 0) return

    const line = getMeme().lines[getMeme().selectedLineIdx];
    if (!line.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    gStartPos = pos
    renderLine()
    renderMeme()
}

function onUp() {
    setLineDrag(false)

    document.body.style.cursor = 'pointer'
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}
function renderLines() {
    const currMeme = getMeme()

    currMeme.lines.forEach((img, idx) => {
        drawText(img.txt, currMeme.lines[idx].pos.x, currMeme.lines[idx].pos.y, idx)

        if (getMeme().lines[idx].isChoose) {
            drawRect(20, currMeme.lines[getMeme().selectedLineIdx].pos.y - 30)
        }
    })
}
function onFlexible() {
    let randomImgId = getRandomInt(0, getImgs().length - 1)
    setRandomOptions()
    onImgSelect(randomImgId)
    onSetColorStroke()
    onSetColor()
}
function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.rect(x, y, 400, 70)
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
    gCtx.closePath()
}

function drawText(txt, x, y, idx) {
    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = getMeme().lines[idx].align
    gCtx.lineWidth = 2
    gCtx.font = `${getMeme().lines[idx].size} ${getMeme().lines[idx].font}`
    gCtx.fillStyle = getMeme().lines[idx].color
    gCtx.fillText(txt, x, y)
    gCtx.strokeStyle = getMeme().lines[idx].strokeColor
    gCtx.strokeText(txt, x, y)
    gCtx.closePath()
}

function onChangeTxtSide(value) {
    setTxtSide(value)
    renderMeme()
}

function onChangeOption(value, key) {
    if (getMeme().lines.length === 0) return
    console.log('hey');
    setChangeByUser(value, key)
    renderMeme()
}

function onChangeFontSize(value) {

    if (value === 'plus') {
        if (gFontSizeCount > 80) return
        gFontSizeCount++
    } else {
        if (gFontSizeCount < 20) return
        gFontSizeCount--

    }
    setFontSize()

    renderMeme()
}

function onAddLine(value) {
    if (getMeme().lines.length > 5) return
    document.querySelector('[name="text-meme"]').value = ''
    setNewLine(value)
    getMeme().lines.forEach((line, idx) => lineLocation(idx))
    renderMeme()
}

function onReplaceLine() {
    let currMeme = getMeme()
    if (!currMeme.lines.length) return
    setReplaceLine()
    renderMeme()

}

function onRemoveLine() {
        let currMeme = getMeme()

    if (currMeme.lines.length === 0) return
    if (!currMeme.lines[currMeme.selectedLineIdx].isChoose) return
    if (currMeme.selectedLineIdx === currMeme.lines.length && currMeme.selectedLineIdx) {
        currMeme.selectedLineIdx--
    }
    currMeme.lines.splice(currMeme.selectedLineIdx, 1)

    renderMeme()

}


function onChangeFont(font) {
    setFont(font)
    if (!getMeme().lines[getMeme().selectedLineIdx].isChoose) return

    renderMeme()
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-image.jpg'
}

function uploadImg() {
    const elWebBtn = document.querySelector('.web-btn')
    elWebBtn.style.display = 'none'
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg")

    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)


        document.querySelector('.share-container').innerHTML = ` 
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
            <img style="height:36.8px ;width:36.8px ;" src="/img/ICONS/facebook.png" >   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess)
}
function resizeCanvas() {
    var canvas = document.getElementById('my-canvas');
    var heightRatio = 1.1;
    canvas.height = canvas.width * heightRatio;

}
function onChangeLineHeight(value) {
    if (!getMeme().lines[getMeme().selectedLineIdx]) return
    if (!getMeme().lines[getMeme().selectedLineIdx].isChoose) return
    if (value === 'up') {
        getMeme().lines[getMeme().selectedLineIdx].pos.y -= 10
    }
    if (value === 'down') {
        getMeme().lines[getMeme().selectedLineIdx].pos.y += 10


    }
    renderMeme()

}


function renderLine() {
    const line = getMeme().lines[getMeme().selectedLineIdx]
    const { pos, color, size } = line
    drawText(line.txt, pos.x, pos.y, getMeme().selectedLineIdx)

}
function drawEmojy(txt, x, y) {
    gCtx.beginPath()
    gCtx.textBaseline = 'middle'
    gCtx.textAlign = 'center'
    gCtx.lineWidth = 2
    gCtx.font = 40 + 'px'
    // gCtx.fillStyle = getMeme().lines[idx].color
    // gCtx.fillText(txt, x, y)
    gCtx.strokeStyle = 'black'
    gCtx.strokeText(txt, x, y)
    gCtx.closePath()
}

function onPutEmoji() {
    let emojis = setEmoji()
    let strHTML = `  ${emojis.join('')}`
    document.querySelector('.emojis').innerHTML = strHTML


}

function onEmoji(ev) {
    let emoji = ev.srcElement.innerHTML
    gIsEmoji = true
    gCurrEmoji = emoji
    renderMeme()
}
function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''

    var reader = new FileReader()

    reader.onload = (event) => {
        var img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0])
} renderImg

function renderImg(img) {
    gUserImg = img
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}
