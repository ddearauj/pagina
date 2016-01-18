define(
	//array of dependencies
	["view", "helpers"],

	function (view, helpers) {
		return {
			// --- BouncingCreature object constructor --- //
			function Critter () {
				this.direction = randomElement(directionNames);
			}

			//perform the action defined
			Critter.prototype.act = function (view) {
				if (view.look (this.direction) != " ") {
					this.direction = view.find(" ") || "s";
				}
					return {type: "move", direction: this.direction}
			}
		}
	}
);