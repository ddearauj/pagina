define (
	//Array of dependencies (in this case, vector.js)
	["vector"],

	//the return function
	function (vector) {
		//defining the module
		return {
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
			}

			//generates a random number
			function randomElement (vet) {
				return vet[Math.floor(Math.random() * vet.length)];
			}

			// array with the direction names
			var directionNames = "n s e w ne nw se sw".split(" ");


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
		}
	}
);