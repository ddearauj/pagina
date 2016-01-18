// Daniel de Araújo Pereira
// 07/01/2016
// 
// Eletronic Life Project from the Eloquent JavaScript Book
// I tried to use my on functions and implementation to achieve the same result
// 
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

require (
	//array of dependencies
	["world", "wall", "critter"],

	function (world) {
		var checkRun = false;

		var plan = ["############################",
					 "#oo    #                   #",
					 "#           #o             #",
					 "#                          #",
					 "#               #          #",
					 "#                          #",
					 "#                          #",
					 "#                          #",
					 "#                          #",
					 "#                          #",
					 "#     #      o##     ##    #",
					 "#                          #",
					 "############################"];

		 var mundo = new World(plan, {"#": Wall,"o": BouncingCreature});
	}

);

