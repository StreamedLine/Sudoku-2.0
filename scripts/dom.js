var board_size = {
	box_count: 3,
	box_width: 3,
	setBoxCount: function setBoxCount(num) {
		//regexp tests for number
		this.box_count = num;
	},
	setBoxWidth: function setBoxWidth(num) {
		//regexp tests for number
		this.box_width = num;
	}
};

function install_board_dom(boxW, boxC) {
	var $table = $('#sudoku'),
	   	width = boxW * boxC,
	   	row;
	
	for (var i = 0; i < width; i++) {
		$row = $('<tr></tr>');
		for (var j = 0; j < width; j++) {
			$row.append($(`<td>${j}</td>`));
		}
		$table.append($row);
	}
}

function draw_table_borders(boxW, boxC) {
	$('tr').each(function(j, tr) {
		var $td = $(tr).find('td');

		if ((j+1) % boxW*boxC == 0 && j < $('tr').length - 1) {
			$td.css({"border-bottom": "3px solid black"})
		} else {
			console.log((j+1) % boxW*boxC - 1)
		}

		for (var i = 0; i < (boxW*boxC - 1); i++) {
			if ((i+1) % boxW == 0) {
				$($td[i]).css({"border-right": "3px solid black"})
			} 
		}
	});
}

$('#em').change(function () {
	document.body.style.fontSize = $(this).val() + 'em';
})

install_board_dom(board_size.box_width, board_size.box_count);
draw_table_borders(board_size.box_width, board_size.box_count);