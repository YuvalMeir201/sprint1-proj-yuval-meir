function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function renderCount(count){
      var elCount=document.querySelector('.count');
      elCount.innerHTML=count;
  }
  function getEmptyPos(){
    var emptyPoss=[];
    for(var i=0;i<gBoard.length;i++){
        for(var j=0;j<gBoard[0].length;j++){
            if(gBoard[i][j].type===FLOOR&&gBoard[i][j].gameElement===null){
                emptyPoss.push({i:i,j:j});
            }
        }
    }
    return emptyPoss;
  
}

    // Returns the class name for a specific cell
    function getClassName(location) {
        var cellClass = "cell-" + location.i + "-" + location.j;
        return cellClass;
    }