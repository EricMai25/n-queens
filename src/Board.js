// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        // console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        // console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        // console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var count = 0;
      this.rows()[rowIndex].forEach(function(item){
        if(item === 1){
          count ++
          }
      })
        if(count >1){
          return true;
        }else {
          return false;
        }
    },
    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var conflict = false
      for(var i = 0; i < this.rows().length; i++){
        if(conflict === false){
          conflict = this.hasRowConflictAt(i);  
        }
      }
        return conflict
    },

    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var matrix = this.rows();
      var counter = 0;
      
      for (var i = 0; i < matrix.length; i++) {
        if (matrix[i][colIndex] === 1) {
          counter++     
       }
      }
      if (counter > 1) {
        return true
      }else {
        return false
      }
  
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var matrix = this.rows();
      var conflict = false;
        // debugger
        for (var i = 0; i < matrix.length; i++) {
          if (conflict === false) {
            conflict = this.hasColConflictAt(i);
          }
        }
      
      return conflict; // fixme
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let matrix = this.rows();
      let counter = 0;
      let diagonalIdx = majorDiagonalColumnIndexAtFirstRow;
      for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][diagonalIdx] === undefined || matrix[i][diagonalIdx] === 0 ) {
          diagonalIdx++;
        } else {
          if (matrix[i][diagonalIdx] === 1) {
            counter++;
            diagonalIdx++;
          } 
        }
      }
      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let matrix = this.rows();    
      let allIndices = 0 - (this.rows().length - 2);
      let conflict = false;

      for (let i = allIndices; i < matrix.length - 1; i++) {
        if (conflict === false) {
          conflict = this.hasMajorDiagonalConflictAt(i)
        }
      }       
      return conflict;

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let matrix = this.rows();
      let counter = 0;
      let diagonalIdx = minorDiagonalColumnIndexAtFirstRow;

      for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][diagonalIdx] === undefined || matrix[i][diagonalIdx] === 0 ) {
          diagonalIdx--;
        } else {
          if (matrix[i][diagonalIdx] === 1) {
            counter++;
            diagonalIdx--;
          } 
        }
      }
      if (counter > 1) {
        return true;
      } else {
        return false;
      }
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let matrix = this.rows();    
      let allIndices = this.rows().length + 2;
      let conflict = false;
      for (let i = allIndices; i > 0; i--) {
        if (conflict === false) {
          conflict = this.hasMinorDiagonalConflictAt(i)
        }
      }       
      return conflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
