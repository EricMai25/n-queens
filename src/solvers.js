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
  n=4
  var solution = []; //fixme
  let board = new Board({n:n})
  let matrix = board.rows();
  let placeRooks = function(array) {

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        if ((board.hasRowConflictAt(j) === false) && (board.hasColConflictAt(j) === false)) {
          if ((board.hasAnyRowConflicts() === false) && (board.hasAnyColConflicts()=== false)) {
            array[i][j] = 1;
            //placeRooks(array.slice(1))
          }
        }
      }   
    }
  }
  
  //   if (!this.hasRowConflictAt(i) && !this.hasColConflictAt(i)){
  //   return array.push
  // }
  placeRooks(matrix)


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme



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
