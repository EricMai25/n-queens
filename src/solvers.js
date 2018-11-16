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

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrix));
  return matrix;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  
  var solutionCount = 0;
  var board = new Board({n:n});
  var matrix = board.rows();
  var counter = 0;
  var skipIndex = [];

  function findSolutions(array, row){

    for (let i = 0; i < array.length; i++) {
      if (skipIndex.includes(i) === true) {
        continue;
      } else if (skipIndex.includes(i) === false) {
        skipIndex.push(i);
        board.togglePiece(row, i)
        counter++
      } 

      if (counter === n) {
        solutionCount++;
        counter--;
        skipIndex.pop();
        board.togglePiece(row, i)
        return
      } else{
        findSolutions(array, row+1);
        board.togglePiece(row, i)
        counter--
        skipIndex.pop();
      }
    }

    // for (let i = 0; i < array.length; i++) {
    //   board.togglePiece(row, i)
    //   counter++

    //   if (board.hasAnyRooksConflicts() === true) {
    //     board.togglePiece(row, i)
    //     counter--
    //   } else if (counter === n) {
    //     solutionCount++
    //     counter--
    //     board.togglePiece(row, i)
    //     return
    //   } else {
    //     findSolutions(array, row+1);
        
    //     board.togglePiece(row, i)
    //     counter--
    //   }
    // }
  }

  findSolutions(matrix, 0)
  // console.log(answersArray)
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // if (n === 0) {
  //   return [];
  // }

  var board = new Board({n:n});
  var matrix = board.rows();
  var counter = 0;
  var getOut = false

  function findSolutions(array, row){
    
    for (let i = 0; i < array.length; i++) {

      board.togglePiece(row, i)
      counter++
      if (board.hasAnyQueenConflictsOn(row, i) === true) {
        board.togglePiece(row, i)
        counter--
      } else if (counter === n) {
        console.log(array)
        getOut = true
        return array;
        
      } else {
        findSolutions(array, row+1);
        if(getOut === true){
          break;
        }
        board.togglePiece(row, i)
        counter--
      }
    }
    return array
  }
  

  matrix = findSolutions(matrix, 0)

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(matrix));
  return matrix;
};
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 0) {
    return 1;
  } 

  var solutionCount = 0;
  var board = new Board({n:n});
  var matrix = board.rows();
  var counter = 0;
  var skipIndexCol = [];
  var skipIndexMajorDiagonal = [];
  var skipIndexMinorDiagonal = [];

  function findSolutions(array, row){
    debugger;
    for (let i = 0; i < array.length; i++) {
      if ((skipIndexCol.includes(i)) || (skipIndexMajorDiagonal.includes(row - i)) || (skipIndexMinorDiagonal.includes(row + i))) {
        continue;
      } else {
        skipIndexCol.push(i);
        skipIndexMajorDiagonal.push(row - i);
        skipIndexMinorDiagonal.push(row + i);
        board.togglePiece(row, i);
        counter++
      } 

      if (counter === n) {
        solutionCount++;
        counter--;
        skipIndexCol.pop();
        skipIndexMajorDiagonal.pop();
        skipIndexMinorDiagonal.pop();
        board.togglePiece(row, i)
        return
      } else{
        findSolutions(array, row+1);
        board.togglePiece(row, i)
        counter--
        skipIndexCol.pop();
        skipIndexMajorDiagonal.pop();
        skipIndexMinorDiagonal.pop();
      }
    }
    


    // for (let i = 0; i < array.length; i++) {

    //   board.togglePiece(row, i)
    //   counter++
    //   if (board.hasAnyQueenConflictsOn(row, i) === true) {
    //     board.togglePiece(row, i)
    //     counter--
    //   } else if (counter === n) {
    //     solutionCount++
    //     counter--
    //     board.togglePiece(row, i)
    //     return
    //   } else {
    //     findSolutions(array, row+1);
        
    //     board.togglePiece(row, i)
    //     counter--
    //   }
    // }
  }
  

  findSolutions(matrix, 0)
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// function N(numberOfQueens, leftDiagonal, columns, rightDiagonal, solutionCount, allBitPattern, bitPatternRightMost) {
//   solutionCount = 0;
//   numberOfQueens = leftDiagonal ? numberOfQueens : (1 << numberOfQueens) - 1;
//   allABoard = ~(leftDiagonal | columns | rightDiagonal) & numberOfQueens;
// while (allBitPattern) allBitPattern ^= bitPatternRightMost = -allBitPattern & allBitPattern, solutionCount += N(numberOfQueens, (leftDiagonal | bitPatternRightMost) << 1, columns | bitPatternRightMost, (rightDiagonal | bitPatternRightMost)  >> 1);
//   return solutionCount += columns == numberOfQueens
// }


// function N(Q,u,ee,n,s,H,R){s=0;Q=u?Q:(1<<Q)-1;H=~(u|ee|n)&Q;while(H)H^=R=-H&H,s+=N(Q,(u|R)<<1,ee|R,(n|R)>>1);return s+=ee==Q