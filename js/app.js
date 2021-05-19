"use strict";
var gBoard;
var gLevel = {
  size: 4,
  mines: 2,
};
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};
function initGame() {
  gBoard = buildBoard();
  //renderBoard(gBoard);
  printMat(gBoard,'.board-container');
  gGame.isOn = true;
  setMinesNegsCount(gBoard);
}
// function setDifficult(size,numMines){
//     gLevel={
//         size:size,
//         mines:numMines
//     };
//     init();
//   }

function buildBoard() {
  var board = createMat(4, 4);
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var cell = {
        minesAroundCount:0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
      board[i][j] = cell;
      
      
    }
  }
  board[0][3].isMine=true;
  board[2][2].isMine=true;
  console.table(board);
  return board;
}
function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>';
    for (var j = 0; j < mat[0].length; j++) {
      var tdId='cell-' + i + '-' + j;
      strHTML += `<td id="${tdId}" class="cell" onclick="${cellClicked(this)}"> </td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>';
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function countMines(cellI,cellJ){
  var countMines=0;
    for (var i = cellI- 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ- 1; j <=cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isMine === true) {
              countMines++
            }

        }
    }
    return countMines;
}
function setMinesNegsCount(board){
  for(var i=0;i<gBoard.length;i++){
    for(var j=0;j<gBoard[0].length;j++){
      var cell=board[i][j];
      if(cell.isMine===true)continue;
      cell.minesAroundCount=countMines(i,j)
    }
  }
}
function cellClicked(elCell){
if(elCell.isMine===true){
  gameOver();
  alert('Game Over');
  return;
}
if(j){}

}
getCellCoord()

function getCellCoord(strCellId) {
  var coord = {};
  var parts = strCellId.split('-');
  coord.i = +parts[1];
  coord.j = +parts[2];
  return coord;
}
function gameOver(){

}