/*******************************************************
An implementation of Genetic Algorithms to create 
evolving/mutating AI to play Tetris.

Author:- Raman Tehlan
Date of creation:- 29/08/2017
********************************************************/
//console.log()

let nextShapeDisplay = document.getElementById("nextShape")
let scoreDisplay = document.getElementById("score")
let speedDisplay = document.getElementById("speed")
let movesDisplay = document.getElementById("moves")
let gameDisplay = document.getElementById("game")

// Grid of tetris
// (length,height)
let grid = createMatrix(12,22)

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

// To store the current shape and it's position in grid
let activeShape = {x:0, y:0, shape:undefined}
// To store the score
let score = 0
// To store all the possible intervals
let intervals = [500, 150, 1, 0]
// To store the milliseconds for interval 
let interval = intervals[0]
// To store the speed 
let speeds = ["Slow", "Medium", "Fast", "Super Fast"]
// To store the next shape
let nextShape
// To store the number of shapes/moves used
let moves = 0
let bagIndex = 0
let rndSeed = 1
let bag = []

// To call the inception function on load
document.onLoad = inception()

/***************************************************
Functions start here
***************************************************/

// To start the process/games
function inception(){	
	// Generate new shape and assign it's x and y  
	activeShape.shape = generateShape();
 	activeShape.x = Math.floor(grid[0].length / 2) - Math.ceil(activeShape.shape[0].length / 2)
 	activeShape.y = 0
 	// push new shape to grid
	// Generate next shape and display it
	nextShape = generateShape()
	displayNextShape()
	// Increase moves
	moves++
	let loop = function(){
		score++
		pushShape()
		displayGrid()
		displayDetails()
	}
	let repeat = setInterval(loop, interval)
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
	for (let r = 0; r < activeShape.shape.length; r++) 
 		for (let c = 0; c < activeShape.shape[r].length; c++) 
 			if (activeShape.shape[r][c] !== 0)
 				grid[activeShape.y + r][activeShape.x + c] = activeShape.shape[r][c]
}

// To generate a random shape for the next chance
function generateShape(){
	return shapesMap[Math.floor(Math.random() * 7 )]
}


/*******
 matrix functions
*******/

// To create a new empty matrix
function createMatrix(length , height){
	// To store the new matrix
	let matrix = new Array()
	for(let h = 0; h < height; h++)
		matrix.push(createRow(length))
	return matrix
}

function createRow(length){
	let row = new Array()
	for(let l = 0; l < length; l++)
		row.push(0)
	return row
}

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
		output += "|" + replaceAll(grid[r].toString(), "," , "&nbsp;") + "|<Br>"
	for (let c = 0; c < colors.length; c++)
 			output = replaceAll(output, "&nbsp;" +(c + 1), "&nbsp;<font color=\"" + colors[c] + "\">" + (c + 1) + "</font>")
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
	scoreDisplay.innerHTML = score
	movesDisplay.innerHTML = moves
	speedDisplay.innerHTML = getSpeed(interval)
}

/******
Other functions
******/

// To replace a word/character with another in a string 
function replaceAll(heap, search, replacement){
	return heap.replace(new RegExp(search, 'g'), replacement)
}

// To get the speed in words using interval
function getSpeed(currentInterval){
	return speeds[intervals.indexOf(currentInterval)]
}


