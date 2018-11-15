/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  var matrix = board.rows();

  
  let placeRooks = function(array) {
    let placementCounter = 0;
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {  
        board.togglePiece(i,j);
        placementCounter++;
        if (board.hasAnyRooksConflicts() === true) {
          board.togglePiece(i,j);
          placementCounter--;
        } else if (placementCounter === n) {
          break;
        }
      }
    }
    return array;
  }

  matrix = placeRooks(matrix)

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return matrix;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  var solutionCount = 0;
  var board = new Board({n:n});
  var matrix = board.rows();
  var counter = 0;

  function findSolutions(array, row){

    for (let i = 0; i < array.length; i++) {

      board.togglePiece(row, i)
      counter++
      if (board.hasAnyRooksConflicts() === true) {
        board.togglePiece(row, i)
        counter--
      } else if (counter === n) {
        solutionCount++
        counter--
        board.togglePiece(row, i)
        return
      } else {
        findSolutions(array, row+1);
        
        board.togglePiece(row, i)
        counter--
      }
    }
  }

  findSolutions(matrix, 0)

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
