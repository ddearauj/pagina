define(
  //Array of dependencies
  ["helpers"],

  function (helpers) {
    
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
    return Grid;
  }
);
