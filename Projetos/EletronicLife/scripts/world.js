define(
	//array of dependencies
	["critter", "grid", "helpers"],

	function (critter, grid, helpers) {
		return {

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
			}

			// the turn in which the critters have the option to act
			// so it scans the whole grid by using the grids for each method, that looks for objects that have an act method
			World.prototype.turn = function () {
				var acted = [];
				this.grid.forEach (function (critter, vet){
					if (critter.act && acted.indexOf(critter) == - 1) {
						acted.push(critter);
						this.letAct(critter, vet);
					}
				}, this);
			}

			World.prototype.letAct = function (critter, vet) {
				var action = critter.act(new View (this, vet));
				if (action && action.type == "move") {
					//so, if it is a move action
					var dest = this.checkDestination(action, vet);
					// first we check the destination. If it is true and the grid is " " (the grid.get returns null) then
					if (dest && this.grid.get(dest) == null) {
						this.grid.set(vet, null); //the ij position becomes " "
						this.grid.set(dest, critter); // the ij position of dest now has "o" (critter)
					}

				}
			}

			World.prototype.checkDestination = function (action, vet) {
				if (directions.hasOwnProperty(action.direction)) { //check if the direction is on the array we defined earlier
					var dest = vet.plus(directions[action.direction]); //vet + directions[action.direction]
					if (this.grid.isInside(dest)) {
						return dest;
					}
				}
			}
		}
	}
);