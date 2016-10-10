// board_dom = {
// 	domArr :boardArr,
// 	box_count: box_count,
// 	box_width: box_width
// }

function sudokuStructure(dom) {

	function getHorizontals(arr) {
		var width = dom.box_count * dom.box_width,
			horizontals = [],
			counter = -1;

		for (var i = 0; i < arr.length; i++) {
			if (i % width == 0) {
				counter++
				horizontals.push([]);
			} 
			horizontals[counter].push(arr[i]);
		};

		return horizontals
	}

	function getVerticals(arr) {

	}

	var board_logic = function() {
		var horizontals = [],
			verticals = [],
			groups = [],
			domArr = dom.domArr,
			mainArr = [],
			boxWidth = dom.box_width,
			width = dom.box_count * boxWidth;

		mainArr = domArr.map(function(el, i){
			return {
				id: i,
				dom: el
			}
		});

		horizontals = getHorizontals(mainArr);
		// verticals = getVerticals()
		// groups = getGroups()

		return {
			mainArr: mainArr,
			horizontals: horizontals,
			verticals: verticals,
			groups: groups
		}
	};

	return board_logic()

}

var board_data = sudokuStructure(board_dom);

init_dom.userReset = function(box_count, box_width) {
	//unlock init function (avoids endless recursion)
	init_dom.postInit = false;
	//initializes dom
	board_dom = init_dom(box_count, box_width);
	//relocks init to ensure data update (if user resets dom)
	init_dom.postInit = true;
	//creates fresh data structure to reflect new dom
	board_data = sudokuStructure(board_dom);
};