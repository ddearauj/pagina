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
 * mapa is a matrix containing the world
 * each point - or location in the grid (x,y) can contain the following
 * # --> rock or wall
 * o --> creatures
 *
 */

var mapa = 
[
"############################",
 "#      #                   #",
 "#          o#              #",
 "#                          #",
 "#               #          #",
 "#                          #",
 "#                          #",
 "#                          #",
 "#                          #",
 "#                          #",
 "#     #      ##     ##     #",
 "#                    o     #",
 "############################"
];

// to access the ij element in the matrix, we create a coordinate functions

// --- constructor for coordenada --- //
function Coordenada(xi, yi) {
	this.x = xi;
	this.y = yi;
}

// --- functions for coordenada --- //


// SUM
// coord is a Coordenada object that will be added --> this(x,y) + coord(x,y)
Coordenada.prototype.soma = function (coord) {
	this.x = this.x + coord.x;
	this.y += coord.y;
}




