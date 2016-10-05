
// MENU TOGGLING

(function(){

	var $menuBtn = $('#menuBtn'),
		$controlPage = $('.controlPage'),
		hiding = true;

	$controlPage.on('click', function(event) {
		event.stopPropagation();
	})

	$menuBtn.on('click', function(event){
		event.stopPropagation();
		if (hiding) {
			$controlPage.fadeIn("fast");	
			hiding = false;
		} else {
			$controlPage.fadeOut("fast");	
			hiding = true;
		}		
	});

	$('body').on('click', function() {
		if (!hiding) {
			$controlPage.fadeOut("slow");	
			hiding = true;
		}
	});
}());


// SUDOKU GRID DRAWING AND DOM ARRAY CREATION

function init_dom (box_count, box_width){

	var boardArr = [];

	var board_size = {
		box_count: box_count,
		box_width: box_width,
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
		   	row, td;
		
		for (var i = 0; i < width; i++) {
			$row = $('<tr></tr>');
			for (var j = 0; j < width; j++) {
				td = $(`<td>${j}</td>`);
				$row.append(td);
				boardArr.push(td);
			}
			$table.append($row);
		}
	}

	function draw_table_borders(boxW, boxC) {
		$('tr').each(function(j, tr) {
			var $td = $(tr).find('td');

			if ((j+1) % boxW*boxC == 0 && j < $('tr').length - 1) {
				$td.css({"border-bottom": "3px solid black"})
			}

			for (var i = 0; i < (boxW*boxC - 1); i++) {
				if ((i+1) % boxW == 0) {
					$($td[i]).css({"border-right": "3px solid black"})
				} 
			}
		});
	}

	(function(){
		function changeBoardSize() {
			document.body.style.fontSize = $(this).val() + 'em';
		}

		$('#em').change(changeBoardSize);
		$('#em').on('mousemove', changeBoardSize);
	}());

	install_board_dom(board_size.box_width, board_size.box_count);
	draw_table_borders(board_size.box_width, board_size.box_count);

	return {
		domArr :boardArr,
		box_count: box_count,
		box_width: box_width
	}
}


var board_dom = init_dom(3, 3)

