'use strict'
let gRandomLines = ['I sometimes eat Falafel', 'im soryy', 'happy for you', 'its real when i', 'i miss you hony', 'whem your mom', 'im so scared', 'oh Hug me baby', 'i love you', 'you so pretty', 'can i touch?', 'its really you?!', 'you a littel..', 'are you pretty like', 'donkey baby donkey']

function setRandomOptions() {
    let newLines = [
        {
            txt: gRandomLines[getRandomInt(0, 15)],
            size: getRandomInt(20, 80) + 'px',
            align: 'center',
            color: `${getRandomColor()}`,
            strokeColor: `${getRandomColor()}`,
            isChoose: false,
            font: 'impact',
            lineHeigth: 50,
            isDrag: false,
            pos: 50

        },
        {
            txt: gRandomLines[getRandomInt(0, 15)],
            size: getRandomInt(20, 80) + 'px',
            align: 'center',
            color: `${getRandomColor()}`,
            strokeColor: `${getRandomColor()}`,
            isChoose: false,
            font: 'impact',
            lineHeigth: 300,
            isDrag: false,
            pos: 300

        }]
    newLines.splice(0, getRandomInt(0, 1))

    return getMeme().lines = newLines
}
