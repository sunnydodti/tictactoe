var board = [9, 9, 9, 9, 9, 9, 9, 9, 9];
var turnS = [false, true];
var count = 0;
var scoreBoard = {
    X: 0,
    O: 0,
    Draw: 0
};
var moves = {
    "false": 'X',
    "true": 'O',
    blank: ' '
};

function markChoice(key, turn) {
    count += 1;
    board[key] = turn;
    var turnLabel = document.getElementById('turn');
    var tmp = !turn;
    turnLabel.innerHTML = "Turn: " + moves[tmp] + "'s";
    var currentTile = document.getElementById(key);
    currentTile.setAttribute('value', moves[turn]);
    console.log(count, ' : ', moves[turn], ' : ', key);
}

function colorizeWinner(t1, t2, t3) {
    var tile1 = document.getElementById(t1);
    var tile2 = document.getElementById(t2);
    var tile3 = document.getElementById(t3);
    var tiles = [tile1, tile2, tile3];
    tiles.forEach(function (tile) {
        tile.style.backgroundColor = '#065c08';
        tile.style.border = 'none';
        tile.style.borderRadius = '2px';
    });
}
function evaluateGame(turn) {
    var winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (var key in winConditions) {
        var condition = winConditions[key];
        var tile1 = board[condition[0]];
        var tile2 = board[condition[1]];
        var tile3 = board[condition[2]];
        if (tile1 == 9 || tile2 == 9 || tile3 == 9) {
            continue;
        }
        if (tile1 == turn && tile2 == turn && tile3 == turn) {
            colorizeWinner(condition[0], condition[1], condition[2]);
            return true;
        }
    }
    return false;
}
function updateScoreBoard(win, turn) {
    if (!win) {
        scoreBoard['Draw'] += 1;
        var drawScore = document.getElementById('draw-count');
        drawScore.innerHTML = scoreBoard['Draw'];
        return;
    }
    var winner = moves[turn];
    scoreBoard[winner] += 1;
    var winnerScore = document.getElementById(winner);
    winnerScore.innerHTML = scoreBoard[winner];
}
function resetGame() {
    console.log('The game has been reset');
    board = [9, 9, 9, 9, 9, 9, 9, 9, 9];
    count = 0;
    var turnLabel = document.getElementById('turn');
    turnLabel.innerHTML = "Turn: X's";
    for (var i in board) {
        var tile = document.getElementById(i);
        tile.style.backgroundColor = '';
        tile.style.border = 'none';
        tile.style.borderRadius = '2px';
        tile.setAttribute('value', moves['blank']);
    }
}
function evaluateChoice(key) {
    if (board[key] === 9) {
        var turn = turnS[count % 2];
        markChoice(key, turn);
        var result = void 0;
        if (count >= 5) {
            result = evaluateGame(turn);
        }
        if (result) {
            updateScoreBoard(result, turn);
            console.log(moves[turn], ' Wins');
            // resetGame()
            setTimeout(resetGame, 2000);
        }
        if (count === 9 && !result) {
            if (!result) {
                console.log('its a draw');
                updateScoreBoard(result, turn);
            }
            // resetGame()
            setTimeout(resetGame, 2000);
        }
    }
}
function onMouseHover() {
    this.style.background = 'rgb(200, 200, 200)';
    // this.style.background = 'rgb(100, 100, 100)'
}
function onMouseOut() {
    this.style.background = 'gray';
}
