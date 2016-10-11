function getInt(str) {
	var nummer  = new RegExp(/\d/),
		num = nummer.exec(str);

	return num ? Number(num) : 3;
}

function pushToArr(arr, num, rtVal) {
	for (var i = 0; i < num; i++) {
		arr.push(rtVal());
	};

	return arr
}