define(
	//array of dependencies
	function () {
		return {
			// since the World object has a wall element, when we call the elementFromChar method it can't look for a undefined object
			// so we create the wall function, that, like a wall, it does, well... nothing

			function wall() {}
		}
	}
);