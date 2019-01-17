<b>Live demo for this app</b>: https://tokyosuite.github.io/minesweeper2/

This is a playable version of minesweeper. I still haven't gottten the "0 automatically expanding effect" (if you click on an empty square, then all empty squares including the "border 1s" will automatically be uncovered).

<a href="url"><img src="http://url.to/image.png" align="left" height="48" width="48" ></a>


![Minesweeper](minesweeper.png?|width=48)

All the logic is encapsulated solely in the App.js file. The main logic is the following: 

1) Create an _NUMBER_ X _NUMBER_ (e.g. 3x3, 9x9, etc.) grid by creating an array of sub arrays. So if we have a 9x9 grid, we have an array with 9 subarrays, each subarray containing 9 elements. Each element in the sub array is then assigned either a "0" (not a bomb) or a "1" (bomb).
  a) Determining whether or not a tile contains a bomb is done using a math helper function (that utilizes JS's Math.random())
  
2) For all "0" tiles (non-bomb) tiles, the number is determined by counting the number of adjacent tiles with bombs on them. Depending on the location of the tile (e.g. corner, side or interior), we need to count a different number of neighboring tiles. For example, if our "0" tile was in the upper left corner, we only need to check whether the tile on its right, the tile directly below it, and the tile below-right contains a bomb (as shown below, 'C' stands for 'to check'). 

  [ ] [C] <br/>
  [C] [C] 
  
  a) So several helper functions were created to check and compute the final number on the tile by summing up all the neighboring bombs (there is quite a bit of redundancy in the code...hope to trim this stuff down in the future). 
  
3) Finally, we create a state that contains two properties: surfaceLevel and minesweeper. The surface level matrix is an array of "empty" elements which represent the uncovered tiles in the beginning of the game. When a user clicks on a button, one of two things occur: 
  
  Case 1: Tile clicked is not a bomb. 
  The state is updated by replacing a single element in the surfaceLevel matrix. This represents the tile being "turned". 
  
  Case 2: Tile clicked is a bomb. 
  The entire surfaceLevel matrix is replaced with the minesweeper matrix, visually representing all of the tiles being overturned and a "game over". 
  
4) Finally, the code for generating a minesweeper field and setting up the state is bundled into a restartGame() function handler, which is invoked when the Restart button is pressed. 

