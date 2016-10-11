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
		var width = dom.box_count * dom.box_width,
			verticals = pushToArr([], width, function(){return [] }),
			counter = 0;

		for (var i = 0; i < width; i++) {
			for (var j = 0; j < width; j++) {
				verticals[j].push(arr[counter]);
				counter++;
			};
		};

		return verticals
	}

	function getGroups(arr) {
		var gWidth = dom.box_width, //makes the var name shorter
			gCount = dom.box_count, // ^^^
			gLength = gWidth * gWidth, // how many boxes in each group
			width = gCount * gWidth, // how wide is the grid
			groups = pushToArr([], gCount * gCount, function(){return [] }), //create empty array of arrays
			counter = 0, // help keep track
			groupIndex = 0, hr=[];

		hr = arr.map(function(unit, i) {
			var place = gWidth,
			    iters = 0;
			while (counter >= place) {
				place += gWidth;
				iters++;
			}
			counter++
			if (counter==width) {counter = 0};
			return iters;
		});

		for (var i = 0; i < arr.length; i++) {
			groupIndex = hr[i];
			while (groups[groupIndex].length == gLength) {groupIndex += gCount }
			arr[i].group = groupIndex;
			groups[groupIndex].push(arr[i]);
		};

		return groups
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
		verticals = getVerticals(mainArr);
		groups = getGroups(mainArr)

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