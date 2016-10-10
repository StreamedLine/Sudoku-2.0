function getInt(str) {
	var nummer  = new RegExp(/\d/),
		num = nummer.exec(str);

	return num ? Number(num) : 3;
}