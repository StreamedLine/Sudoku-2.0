// board_dom = {
// 	domArr :boardArr,
// 	box_count: box_count,
// 	box_width: box_width
// }

// board_data = {
// 	mainArr: mainArr,
// 	horizontals: horizontals,
// 	verticals: verticals,
// 	groups: groups
// }
//(function(){



//VALIDATE LINE OR BOARD

//Check individual line or group
function validateArr(arr) {
	return arr.every(function(each, i){
		if (each.val == 0) {return true}
		return arr.every(function(el, j) {
			if (i == j) {return true}
			return el.val != each.val;
		});
	});
}

//Check entire board
function validatePuzzle(data) {
	var horizontals = data.horizontals,
		verticals = data.verticals,
		groups = data.groups;

	return [horizontals, verticals, groups].every(function(each){
		return each.every(function(arr){
			return validateArr(arr);
		});
	});
}

//return all possible values for position
function possibleVals(data, index) {
	var mainArr = data.mainArr, 
		vertArr = data.verticals[mainArr[index].v],
		horizArr = data.horizontals[mainArr[index].h],
		groupArr = data.groups[mainArr[index].g]
		numList = arrFromOne(horizArr.length);

	function filterNums(arr, numArr) {
		return numArr.filter(function(num){
			return arr.every(function(each){return each.val != num})
		});
	}

	numList = filterNums(vertArr, numList);
	numList = filterNums(horizArr, numList);
	numList = filterNums(groupArr, numList);

	return numList;
}

function generatePuzzle(dom, data) {
	var width = data.horizontals.length,
		horizontals = data.horizontals,
		verticals = data.verticals,
		groups = data.groups,
		values = arrFromOne(width);

	horizontals.forEach(function(line){
		line.forEach(function(each){
			// var vals = possibleVals(data, each.id);
			// if (vals.length > 0) {
			// 	each.val = vals[0];
			// } else {
			// 	each.val = '';
			// }
		});
	});

	dom.domArr.forEach(function(each,i){
		each.text(data.mainArr[i].val)
	});
}

generatePuzzle(board_dom, board_data);


init_dom.userReset.generatePuzzle = generatePuzzle;
//}());
