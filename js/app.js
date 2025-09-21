var gBoard = []

var gLevel = {
    SIZE: 4,     
    MINES: 2     
}

// Current game state
var gGame = {
    isOn: false,        
    revealedCount: 0,   
    markedCount: 0,     
    secsPassed: 0,
    minesPlaced: false
}
window.onload = initGame
function initGame() {
    console.log('initGame called')
    gBoard = []
    gGame.isOn = true

    gGame.revealedCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    gGame.minesPlaced = false
    document.querySelector('.restart-button').innerText = '😃'
    buildBoard()
    console.log('Board built:', gBoard)
    renderBoard(gBoard)
    console.log('Board rendered')
    liveCount = 3
    document.querySelector('h2').innerText = `Lives: ${liveCount}`

}

function setLevel(size, mines) {
    gLevel.SIZE = size
    gLevel.MINES = mines
    initGame()
}

function buildBoard() {
    for (var i = 0; i < gLevel.SIZE; i++) {
        gBoard[i] = []
        for (var j = 0; j < gLevel.SIZE; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            gBoard[i][j] = cell
        }
    }
}

function placeMines(avoidi, avoidj) {
    var minesPlaced = 0
    while (minesPlaced < gLevel.MINES) {
        var i = Math.floor(Math.random() * gLevel.SIZE)
        var j = Math.floor(Math.random() * gLevel.SIZE)
        if (!gBoard[i][j].isMine && !(i === avoidi && j === avoidj)) {
            gBoard[i][j].isMine = true
            minesPlaced++
        }
    }
}

function renderBoard(board) {
    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var cellClass = `cell cell-${i}-${j}`
            if (cell.isShown) {
                cellClass += ' revealed'
            } else {
                cellClass += ' unrevealed'
            }
            strHTML += `<td class="${cellClass}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j});return false;">`
            if (cell.isShown) {
                if (cell.isMine) {
                    strHTML += '💣'
                } else if (cell.minesAroundCount > 0) {
                    strHTML += cell.minesAroundCount
                } else {
                    strHTML += '&nbsp;'
                }
            } else if (cell.isMarked) {
                strHTML += '🚩'
            }
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    console.log('Generated HTML:', strHTML)
    var elContainer = document.querySelector('.board-container')
    console.log('Container found:', elContainer)
    elContainer.innerHTML = strHTML
}

function countNeighbors(i, j, board) {
    var count = 0
    for (var x = i - 1; x <= i + 1; x++) {
        for (var y = j - 1; y <= j + 1; y++) {
            if (x < 0 || x >= board.length || y < 0 || y >= board[0].length) continue
            if (board[x][y].isMine) count++
        }
    }
    return count
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            if (cell.isMine) continue
            cell.minesAroundCount = countNeighbors(i, j, board)
        }
    }
}

function expandNeighbors(i, j) {
    for (var x = i - 1; x <= i + 1; x++) {
        for (var y = j - 1; y <= j + 1; y++) {
            if (x < 0 || x >= gLevel.SIZE || y < 0 || y >= gLevel.SIZE) continue
            if (x === i && y === j) continue
            if (gBoard[x][y].isShown || gBoard[x][y].isMarked || gBoard[x][y].isMine) continue

            console.log('Expanding neighbor:', x, y, 'minesAroundCount:', gBoard[x][y].minesAroundCount)
            gBoard[x][y].isShown = true
            gGame.revealedCount++

            if (gBoard[x][y].minesAroundCount === 0) {
                expandNeighbors(x, y)
            }
        }
    }
}

function initializeGameOnFirstClick(i, j) {
    if (!gGame.minesPlaced) {
        placeMines(i, j)
        setMinesNegsCount(gBoard)
        gGame.minesPlaced = true
    }
}

function handleMineHit() {
    console.log('You hit a mine!')
    liveCount--
    document.querySelector('h2').innerText = `Lives: ${liveCount}`

    if (liveCount === 0) {
        console.log('Game Over!')
        gGame.isOn = false
        document.querySelector('.restart-button').innerText = '🤯'

        for (var x = 0; x < gLevel.SIZE; x++) {
            for (var y = 0; y < gLevel.SIZE; y++) {
                if (gBoard[x][y].isMine) {
                    gBoard[x][y].isShown = true
                }
            }
        }
    }
}

function checkWinCondition() {
    if (gGame.revealedCount === gLevel.SIZE * gLevel.SIZE - gLevel.MINES) {
        document.querySelector('.restart-button').innerText = '😎'
        console.log('Congratulations! You win!')
        gGame.isOn = false
    }
}

function cellClicked(elCell, i, j) {
    if (gBoard[i][j].isShown || gBoard[i][j].isMarked || !gGame.isOn) return

    initializeGameOnFirstClick(i, j)

    gBoard[i][j].isShown = true
    gGame.revealedCount++
    console.log('Cell clicked:', i, j)

    if (gBoard[i][j].minesAroundCount === 0 && !gBoard[i][j].isMine) {
        expandNeighbors(i, j)
    }

    renderBoard(gBoard)

    if (gBoard[i][j].isMine) {
        handleMineHit()
        renderBoard(gBoard)
    } else {
        checkWinCondition()
    }
}

function cellMarked(elCell, i, j) {
    if (gBoard[i][j].isShown || !gGame.isOn) return

    gBoard[i][j].isMarked = !gBoard[i][j].isMarked
    console.log('Cell marked/unmarked:', i, j, 'isMarked:', gBoard[i][j].isMarked)

    renderBoard(gBoard)
}

