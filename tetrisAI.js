/*******************************************************
An implementation of Genetic Algorithms to create 
evolving/mutating AI to play Tetris.

Author:- Raman Tehlan
Date of creation:- 29/08/2017
********************************************************/

/******
Elements of HTML to display data
******/
let gameDisplay = document.getElementById("game")
let nextShapeDisplay = document.getElementById("nextShape")
let scoreDisplay = document.getElementById("score")
let speedDisplay = document.getElementById("speed")
let movesDisplay = document.getElementById("moves")

// To store the current shape and it's position in grid
let activeShape = {x:0, y:0, shape:undefined}
// To store the score
let score = 0
// To store the milliseconds for interval 
let intervalTime = 500
// To store the speed 
let speeds = ["Slow", "Medium", "Fast", "Super Fast"]
// To store the next shape
let nextShape

// Grid of tetris
let grid = [
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0],
]

// Shapes used in tetris
let shapes = {
	I: [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
	J: [[2,0,0], [2,2,2], [0,0,0]],
	L: [[0,0,3], [3,3,3], [0,0,0]],
	O: [[4,4], [4,4]],
	S: [[0,5,5], [5,5,0], [0,0,0]],
	T: [[0,6,0], [6,6,6], [0,0,0]],
	Z: [[7,7,0], [0,7,7], [0,0,0]]
}

// This is to access the shape using number
let shapesMap = [shapes.I, shapes.J, shapes.L, shapes.O, shapes.S, shapes.T, shapes.Z]
// Colors for shapes, arranged according to there shape number
let colors = ["FF4759", "D38CFF", "518EBC", "FFEA82", "53D504", "68D624", "F7B060"]

// To call the inception function on load
document.onLoad = inception()

/***************************************************
Functions start here
***************************************************/

// To start the process/games
function inception(){	
	activeShape.shape = generateShape()

	nextShape = generateShape()
	displayNextShape()

	let loop = function(){
		pushShape()
		updateScore()
	}
	let interval = setInterval(loop, intervalTime)
}


/*******
Play functions
*******/

// To take action on key pressed
window.onkeydown = function(){
	let key = String.fromCharCode(event.keyCode)
}

// To push the shape in the grid
function pushShape(){
	displayGrid()
}

// To generate a random shape for the next chance
function generateShape(){
	return shapesMap[Math.floor(Math.random() * 7 )]
}


/*******
 matrix functions
*******/

// To return the transpose of matrix
function transposeMatrix(matrix , times){
	 return matrix[0].map(function(col, i){
		return matrix.map(function(row){
			return row[i]
		})
	})
}

// To return the rotated matrix
function rotateMatrix(matrix , times){
	for(let t = 0; t < times; t++){
		matrix = transposeMatrix(matrix)
	  	for(let i = 0; i < matrix.length; i++)
			matrix[i].reverse()
	}
	return matrix
}


/*******
Display functions 
*******/

// To display the grid
function displayGrid(){
	let output = ""
	for(let r = 0; r < grid.length; r++)
		output += "[" + grid[r] + "] <Br>"
	gameDisplay.innerHTML = output
}

// To display next shape
function displayNextShape(){
	let output = ""
	for(let r = 0; r < nextShape.length; r++)
		output +=  replaceAll(replaceAll(nextShape[r].toString() , "," , "&nbsp;") , "0" , "&nbsp;" ) + "<Br>"
	nextShapeDisplay.innerHTML = output
}

// To display details about the game
function displayDetails(){

}

/******
Other functions
******/

function replaceAll(heap, search, replacement){
	return heap.replace(new RegExp(search, 'g'), replacement)
}



