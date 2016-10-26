function extractInt(str) {
	var nummer  = new RegExp(/\d+/),
		num = nummer.exec(str);

	return num ? Number(num) : 3;
}

function pushToArr(arr, num, rtVal) {
	for (var i = 0; i < num; i++) {
		arr.push(rtVal());
	};
	return arr
}

function arrFromOne(num) {
	var arr = [];
	for (var i = 1; i <= num; i++) {
		arr.push(i)
	};
	return arr;
}

function randZeroTo(num) {
	return Math.floor(Math.random() * num)
}