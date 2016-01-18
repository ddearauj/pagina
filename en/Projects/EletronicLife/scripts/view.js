define(
	//array of dependencies

	["helpers", "world"],

	function (helpers, world) {
		return {
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

			}

			View.prototype.findAll = function(ch) {
				var found = [];
				for (var dir in directions) {
					if (this.look(dir) == ch) {
						found.push(dir);
					}
				}
				return found;
			}

			View.prototype.find = function(ch) {
				var found = this.findAll(ch);
				if (found.length == 0) { 
					return null
				}
				else {
					return randomElement(found);
				}
			}
		}
	}
);