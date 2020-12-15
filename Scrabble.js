// TRY THREE

// References used:
// https://www.elated.com/res/File/articles/development/javascript/jquery/drag-and-drop-with-jquery-your-essential-guide/card-game.html

// [ ] Have main set of scrabble tiles using given
// json file. Randomly select 7 tiles for a hand. (4)
// [ ] Make letter tiles drag-and-droppable
// onto Scrabble squares (4)
// [ ] Program can tell which letter tile is placed
// on which square (4)
// [ ] At least two bonus squares (4)
// [ ] Score calculation, including bonus (4)
// [ ] Player can play as many words as they want
// until they hit the reset button or quit (3)
// [ ] Board clears after each round (3)
// [ ] Program gives player appropriate number of
// tiles to make hand have seven tiles again (3)
// [ ] Score kept cumulatively until reset (3)
// [ ] Tiles can only be dragged from rack to
// board - dragging elsewhere will return to rack (2)
// [ ] Tile cannot be moved once placed on board (2)
// [ ] Every letter after first must be placed directly
// adjacent to another letter, otherwise will return
// to rack (2)
// [ ] Can always restart game (2)

// ARRAY FROM GIVEN FILE IN .ZIP FROM BLACKBOARD:
/*  File:  /~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Pieces_AssociativeArray_Jesse.js
 *  Jesse M. Heines, UMass Lowell Computer Science, heines@cs.uml.edu
 *  Copyright (c) 2015 by Jesse M. Heines.  All rights reserved.  May be freely
 *    copied or excerpted for educational purposes with credit to the author.
 *  updated by JMH on November 21, 2015 at 10:27 AM
 *  updated by JMH on November 25, 2015 at 10:58 AM to add the blank tile
 *  updated by JMH on November 27, 2015 at 10:22 AM to add original-distribution
 */
let ScrabbleTiles = [] ;
ScrabbleTiles["A"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["B"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["C"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["D"] = { "value" : 2,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["E"] = { "value" : 1,  "original-distribution" : 12, "number-remaining" : 12 } ;
ScrabbleTiles["F"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["G"] = { "value" : 2,  "original-distribution" : 3,  "number-remaining" : 3  } ;
ScrabbleTiles["H"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["I"] = { "value" : 1,  "original-distribution" : 9,  "number-remaining" : 9  } ;
ScrabbleTiles["J"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["K"] = { "value" : 5,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["L"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["M"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["N"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["O"] = { "value" : 1,  "original-distribution" : 8,  "number-remaining" : 8  } ;
ScrabbleTiles["P"] = { "value" : 3,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Q"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["R"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["S"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["T"] = { "value" : 1,  "original-distribution" : 6,  "number-remaining" : 6  } ;
ScrabbleTiles["U"] = { "value" : 1,  "original-distribution" : 4,  "number-remaining" : 4  } ;
ScrabbleTiles["V"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["W"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["X"] = { "value" : 8,  "original-distribution" : 1,  "number-remaining" : 1  } ;
ScrabbleTiles["Y"] = { "value" : 4,  "original-distribution" : 2,  "number-remaining" : 2  } ;
ScrabbleTiles["Z"] = { "value" : 10, "original-distribution" : 1,  "number-remaining" : 1  } ;
// ScrabbleTiles["_"] = { "value" : 0,  "original-distribution" : 2,  "number-remaining" : 2  } ;

// Initialize score variables.
let currentScore = 0;   // Running total
let wordScore = 0;      // Score of ONLY current word

//dictionary
let dictionary = []
// Variable to keep track of number of letter tiles left
// to be dealt to player before game ends- should be 100
// tiles total. Will decrease by 7 when first hand is
// dealt (will seem instant to player). CHANGE TO 100 IF IMPLEMENT BLANKS
let tilesLeft = 98;

// Double word: determines if word value
// will be doubled. Set to false by default, will
// change to true if tile is placed on doubleWord space.
let doubleWord = false;

// Create string for and data structure (array) to hold
// the word from the current turn. Will start with empty spaces.
// Giving the array seven spaces, which is the maximum
// number of letters per word for this implementation of
// the game.
let turnWord = "";
let turnWordArray = ["", "", "", "", "", "", ""];

start();

// Start function: Should run when page is loaded/reloaded,
// and then continuously.
function start(){
    console.log("START FUNCTION CALLED");
    // Used to print scores and number of tiles left to screen.
    // Scores should start at 0.
    // $(#currentScore).text(0);
    // $(#wordScore).text(0);

    // Number of tiles should start at number of total tiles-
    // will be updated using the function that deals tiles.
    // $(#tilesLeft).text(100);

    // Function to deal tiles
    dealTiles();

    // Function to "bounce" tiles (return to hand if not
    // dragged onto a space on the board)
    bounceTile();
}

// Check for button presses here?


// Check reset button for button press - if pressed, call reset
document.getElementById("btnReset").addEventListener("click", function() {
  // Reset function:
  // Should reset wordScore and currentScore to 0.
  // Should also reset playerHandTiles (player's hand)
  // and clear the board. Should run when page is
  // loaded/reloaded and when reset button is pressed.
  function resetGame() {
      console.log("RESET FUNCTION CALLED");
      wordScore = 0;
      currentScore = 0;
      turnWord = "";
      turnWordArray = ["", "", "", "", "", "", ""];
      tilesLeft = 98;
      doubleWord = false;
  }
});

// Check submit button for button press - if pressed, call submit
document.getElementById("btnSubmit").addEventListener("click", function() {
  // Submit -
  // If include dictionary checking, should go here
  // and block submission
  // Should reset board and "doubleWord" boolean at its
  // end. Should call "findTotalScore".
  function submitWord() {
      console.log("SUBMIT WORD FUNCTION CALLED");

  }
});


// Randomize scrabble tiles:
// IMPLEMENT ARRAY USING JSON FILE HERE??


// Create spaces on board:
// Include at least two bonus spaces.
// IMPLEMENT HERE
// EDIT: Just need array to line up. did this part using CSS And HTML


// Function to deal tiles to player.
// Randomly chooses neededTiles tiles to add to the
// player's hand, and then subtracts neededTiles from
// tilesLeft, then resets neededTiles to 0. neededTiles
// is the number of tiles that a player needs to be dealt
// for their number of tiles to equal 7.
function dealTiles() {
    console.log("DEAL TILES CALLED");
}

// Handling for dropping a tile onto a space.
// Check to make sure is placed directly next to another tile.
// Do NOT allow user to move tile once placed.
// Should call "checkTile".
// Use $(this).droppable( 'disable' ); to make tile stay put.
function tilePlaced() {
    console.log("TILE PLACED CALLED");
}

// Determine what tile was placed on which square.
// If on double letter space, should multiply current tile
// value by 2.
// If on double word space, should set "doubleWord" to true.
// Will be multiplied by 2 in btnSubmit.
function checkTile() {
    console.log("CHECK TILE CALLED");
}

// Forces tile back to rack if not dropped onto
// place on board
function bounceTile() {
    console.log("BOUNCE TILE CALLED");
}


// Calculate cumulative score - add value of word
// score to "currentScore" variable.
function findTotalScore() {
    console.log("FIND TOTAL SCORE CALLED");
    if (doubleWord == true) {
        wordScore = wordScore * 2;
        currentScore = currentScore + wordScore;
    }
    else {
       currentScore = currentScore + wordScore;
    }
    // Word score variable should be reset to 0 for
    // next word.
    wordScore = 0;
}
function checkInDictionary(word){
    return dictionary.findIndex(dicword => dicword == word.toUpperCase())
}
// As with JSON, use the Fetch API & ES6
fetch('words.txt')
  .then(response => response.text())
  .then(data => {
    dictionary = data.split('\n');
    console.log("Words loaded", dictionary)
  });

// Where to include drag functions?  https://www.youtube.com/watch?v=C22hQKE_32c
