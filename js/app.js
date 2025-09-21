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
    secsPassed: 0      
}
window.onload = initGame
function initGame() {
    console.log('initGame called')
    gBoard = []
    gGame.isOn = true
    gGame.revealedCount = 0
    gGame.markedCount = 0
    gGame.secsPassed = 0
    buildBoard()
    console.log('Board built:', gBoard)
    renderBoard(gBoard)
    console.log('Board rendered')
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
    placeMines()
    setMinesNegsCount(gBoard)
}

function placeMines() {
    var minesPlaced = 0
    while (minesPlaced < gLevel.MINES) {
        var i = Math.floor(Math.random() * gLevel.SIZE)
        var j = Math.floor(Math.random() * gLevel.SIZE)
        if (!gBoard[i][j].isMine) {
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
            strHTML += `<td class="${cellClass}" onclick="cellClicked(this, ${i}, ${j})" oncontextmenu="cellMarked(this, ${i}, ${j});return false;">`
            if (cell.isShown) {
                if (cell.isMine) {
                    strHTML += '💣'
                } else if (cell.minesAroundCount > 0) {
                    strHTML += cell.minesAroundCount
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

function cellClicked(elCell, i, j) {

    if (gBoard[i][j].isShown || gBoard[i][j].isMarked || !gGame.isOn) return
    gBoard[i][j].isShown = true
    gGame.revealedCount++
    console.log('Cell clicked:', i, j)
    renderBoard(gBoard)
}

function cellMarked(elCell, i, j) {
    console.log('Cell marked:', i, j)
}