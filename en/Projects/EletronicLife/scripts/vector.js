define(
	//Array of dependencies (in this case, null)

	//the function
	function () {
		//return a function or object to define the vector method
		return {

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
			}
		}
	}
);