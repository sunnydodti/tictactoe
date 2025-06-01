var board: any[] = [9, 9, 9, 9, 9, 9, 9, 9, 9]
var turnS: boolean[] = [false, true]
var count: number = 0

var scoreBoard:object = {
    X : 0,
    O : 0,
    Draw: 0
} 

var moves: object = {
    false: 'X',
    true: 'O',
    blank: ' '
}

function markChoice(key: any, turn: any) {
    count += 1
    board[key] = turn
    
    let turnLabel = <InnerHTML>document.getElementById('turn')
    let tmp: any = !turn
    turnLabel.innerHTML = "Turn: " + moves[tmp] + "'s"
    
    let currentTile = document.getElementById(key) as HTMLElement
    currentTile.setAttribute('value',moves[turn])
    console.log(count , ' : ',   moves[turn] , ' : ' , key);
}

function colorizeWinner(t1, t2, t3) {
    let tile1 = document.getElementById(t1) as HTMLElement
    let tile2 = document.getElementById(t2) as HTMLElement
    let tile3 = document.getElementById(t3) as HTMLElement

    let tiles = [tile1, tile2, tile3]

    tiles.forEach(tile => {
        tile.style.backgroundColor = '#065c08'
        tile.style.border = 'none'
        tile.style.borderRadius = '2px'
    });
}

function evaluateGame(turn: number) {
    const winConditions:number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    
    for (const key in winConditions) {
        let condition:number[] = winConditions[key]
        
        let tile1 = board[condition[0]]   
        let tile2 = board[condition[1]]   
        let tile3 = board[condition[2]]
        
        
        if (tile1 == 9 || tile2 == 9 || tile3 == 9) {
            continue
        }
        if (tile1 == turn && tile2 == turn && tile3 == turn) {
            colorizeWinner(condition[0], condition[1], condition[2])
            return true
        }
    }
    return false
}

function updateScoreBoard(win:boolean, turn: any){
    if (!win){
        scoreBoard['Draw'] += 1
        
        let drawScore = document.getElementById('draw-count') as HTMLElement
        drawScore.innerHTML = scoreBoard['Draw']
        return
    }
    
    let winner = moves[turn]
    scoreBoard[winner] += 1
    
    let winnerScore = document.getElementById(winner) as HTMLElement
    winnerScore.innerHTML = scoreBoard[winner]
}

function resetGame() {
    console.log('The game has been reset')
    board = [9, 9, 9, 9, 9, 9, 9, 9, 9]
    count = 0
    
    let turnLabel = <InnerHTML>document.getElementById('turn')
    turnLabel.innerHTML = "Turn: X's"
    
    for (const i in board) {
        let tile = document.getElementById(i) as HTMLElement

        tile.style.backgroundColor = ''    
        tile.style.border = 'none'
        tile.style.borderRadius = '2px'
        
        tile.setAttribute('value', moves['blank'])        
    }
}

function evaluateChoice(key: any) {
    if (board[key] === 9) {
        var turn: any = turnS[count%2]
        markChoice(key, turn)
        
        let result:any
        if (count >= 5){
            result = evaluateGame(turn)
        }

        if (result){
            updateScoreBoard(result, turn)
            console.log(moves[turn], ' Wins')
            // resetGame()
            setTimeout(resetGame, 1000)
            
        }
        
        if (count === 9 && !result) {
            if (!result){
                console.log('its a draw')
                updateScoreBoard(result, turn)
            } 
            // resetGame()
            setTimeout(resetGame, 1000)
        }
    }
}

function onMouseHover() {
    this.style.background = 'rgb(200, 200, 200)'
    // this.style.background = 'rgb(100, 100, 100)'
}
function onMouseOut() {
    this.style.background = 'gray'
}