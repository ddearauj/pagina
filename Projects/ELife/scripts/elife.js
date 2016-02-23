// Daniel de Araújo Pereira
// 07/01/2016
// 
// Eletronic Life Project from the Eloquent JavaScript Book
// I tried to use my on functions and implementation to achieve the same result
// 
// I plan to add other things as well: letting the user create their own map
//
//
//


/*
 *
 * plan is a matrix containing the world
 * each point - or location in the grid (x,y) can contain the following
 * # --> rock or wall
 * o --> creatures
 *
 */

var checkRun = false;

var plan = ["############################",
			 "#oo    #                   #",
			 "#           #o             #",
			 "#                          #",
			 "#          #    #          #",
			 "#                          #",
			 "#         ~                #",
			 "#         ##               #",
			 "#         ##               #",
			 "#                          #",
			 "#     #      o##     ##    #",
			 "#                          #",
			 "############################"];


/*****************************************
 *-----------UTILITIES----------------****
 *****************************************/


// to access the ij element in the matrix, we create a Vector object

// --- constructor for Vector --- //
function Vector(x, y) {
	this.x = x;
	this.y = y;
}

// --- methods for Vector --- //

// SUM
// vet is a Vector object that will be added --> this(x,y) + vet(x,y)
Vector.prototype.plus = function (vet) {
	return new Vector(this.x + vet.x, this.y + vet.y);
};


// --- interface --- //

//creates the diretions to which the creature will move
var directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

//generates a random number
function randomElement (vet) {
	return vet[Math.floor(Math.random() * vet.length)];
}

// array with the direction names
var directionNames = "n ne e se s sw w nw".split(" ");


//this function works to define how a Creature will turn
//the dir is the reference point and the n is the number of 45 degrees turns clockwise
function dirPlus(dir, n) {
	var index = directionNames.indexOf(dir);
	return directionNames[(index + n + 8) % 8];
}


//like a translator, creating an object element that has a type of the char that legend[ch] points to
function elementFromChar (legend, ch) {
	if (ch == " ") {
		return null;
	}

	var element = new legend[ch]();
	element.originChar = ch;
	return element;
}

function charFromElement (element) {
	if (element == null) {
		return " ";
	}
	else {
		//you can use the originChar property from element once it has been created in the elementFromChar
		return element.originChar;
	}
}

/*****************************************
 ------------Grid Object--------------****
 *****************************************/

// --- constructor to Grid Object --- //

function Grid (width, height) {
	this.matriz = new Array (height * width);
	this.height = height;
	this.width = width;
}

// --- methods for Grid --- //

//returns the boolean value to check if a Vector is inside the grid
Grid.prototype.isInside = function (vet) {
	return (vet.x >= 0 && vet.x < this.width && vet.y >= 0 && vet.y < this.height);
};

//getter

Grid.prototype.get = function(vet) {
	return this.matriz [vet.x + this.width * vet.y]; 
};

//setter

Grid.prototype.set = function(vet, valor) {
	this.matriz [vet.x + this.width * vet.y] = valor;
};


// by passing the context we are making it possible to make the this refer to the object we want to, much like the Array.prototype.forEach second argument
Grid.prototype.forEach = function(f, context) {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      var value = this.matriz[x + y * this.width];
    	if (value != null) {
        	f.call(context, value, new Vector(x, y));
    	}
    }
  }
};




/*****************************************
 -------Bouncing Creature Object------****
 *****************************************/

// --- BouncingCreature object constructor --- //
function BouncingCreature () {
	this.direction = randomElement(directionNames);
}

//perform the action defined
BouncingCreature.prototype.act = function (view) {
	if (view.look (this.direction) != " ") {
		this.direction = view.find(" ") || "s";
	}
		return {type: "move", direction: this.direction}
};

/*****************************************
 -------------World Object------------****
 *****************************************/

// world constructor
function World(map, legend) {
  this.grid = new Grid(map[0].length, map.length);
  this.legend = legend;

  // for each map(i,j) set the value of grid
  map.forEach(function(line, y) {
    for (var i = 0; i < line.length; i++)
      this.grid.set(new Vector(i, y), elementFromChar(legend, line[i]));
  }, this); // by passing "this" in the second argument of the forEach method, this now refers to constructed object and not to the global object
}

//gets the World object and converts to a String
World.prototype.toString = function() {
	var output = "";
	for (var y = 0; y < this.grid.height; y++) {
		for (var x  = 0; x < this.grid.width; x++){
			var element = this.grid.get(new Vector(x, y));
			output += charFromElement(element);
		}
		output+="\n";
	}
	return output;
};

// the turn in which the creatures have the option to act
// so it scans the whole grid by using the grids for each method, that looks for objects that have an act method
World.prototype.turn = function () {
	var acted = [];
	this.grid.forEach (function(creature, vet){
		if (creature.act && acted.indexOf(creature) == - 1) {
			acted.push(creature);
			this.letAct(creature, vet);
		}
	}, this);
};

World.prototype.letAct = function (creature, vet) {
	var action = creature.act(new View (this, vet));
	if (action && action.type == "move") {
		//so, if it is a move action
		var dest = this.checkDestination(action, vet);
		// first we check the destination. If it is true and the grid is " " (the grid.get returns null) then
		if (dest && this.grid.get(dest) == null) {
			this.grid.set(vet, null); //the ij position becomes " "
			this.grid.set(dest, creature); // the ij position of dest now has "o" (creature)
		}

	}
};

World.prototype.checkDestination = function (action, vet) {
	if (directions.hasOwnProperty(action.direction)) { //check if the direction is on the array we defined earlier
		var dest = vet.plus(directions[action.direction]); //vet + directions[action.direction]
		if (this.grid.isInside(dest)) {
			return dest;
		}
	}
};

/*****************************************
 -------------View Object-------------****
 *****************************************/

function View (world, vet) {
 	this.world = world;
 	this.vet = vet;
}

View.prototype.look = function (dir) { //returns the char from the element
	var whereTo = this.vet.plus(directions[dir]);
	if (this.world.grid.isInside(whereTo)) {
		return charFromElement(this.world.grid.get(whereTo));
	}
	else {
		return "#" //as walls do literally nothing, we can treat everything that is outside of the world as a wall
	}

};

View.prototype.findAll = function(ch) {
	var found = [];
	for (var dir in directions) {
		if (this.look(dir) == ch) {
			found.push(dir);
		}
	}
	return found;
};

View.prototype.find = function(ch) {
	var found = this.findAll(ch);
	if (found.length == 0) { 
		return null
	}
	else {
		return randomElement(found);
	}
};

/*****************************************
 -------------Wall  Object------------****
 *****************************************/

// since the World object has a wall element, when we call the elementFromChar method it can't look for a undefined object
// so we create the wall function, that, like a wall, it does, well... nothing

function Wall() {}

/*****************************************
 ----------Wallfollower Critter-------****
 *****************************************/

function Follower () {
  this.dir = "s";
}

Follower.prototype.act = function(view) {
  var start = this.dir;
  if (view.look(dirPlus(this.dir, -3)) != " ")
    start = this.dir = dirPlus(this.dir, -2);
  while (view.look(this.dir) != " ") {
    this.dir = dirPlus(this.dir, 1);
    if (this.dir == start) break;
  }
  return {type: "move", direction: this.dir};
};




var mundo; //= new World(plan, {"#": Wall,
		//					 "~": Follower,
		//					 "o": BouncingCreature});
