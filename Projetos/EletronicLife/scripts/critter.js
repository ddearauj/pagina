define(
	//array of dependencies
	["view", "helpers"],

	function (view, helpers) {
		return {
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
			}
		}
	}
);