
//COMPLETE DOCUMENT.BODY RESIZE
//allows for easier gameplay and mobile compatibility
(function(){
	function changeBoardSize() {
		document.body.style.fontSize = $(this).val() + 'em';
	}

	$('#em').change(changeBoardSize);
	$('#em').on('mousemove', changeBoardSize);
}());


// MENU 

(function(){

	// MENU TOGGLING
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

	// UPDATE GRID SIZE
	$('#applyGridSize').on('click', function(){
		if (confirm('This will reset the board. This is not reversible.')) {
			var $gridInputs = $(".gridSize"),
			boxC = extractInt($gridInputs[0].innerHTML),
			boxW = extractInt($gridInputs[1].innerHTML);

			board_dom = init_dom(boxC, boxW);
		}
	});

	// LABELS HIGHLIGHT CONTENTEDITABLE DIVS WHEN CLICKED 
	// its an ugly hack because the caret is placed before the text not after
	$('label').on('click', function() {
		console.log($(this).next().focus())
	});
}());


// SUDOKU GRID DRAWING AND DOM ARRAY CREATION

function init_dom (box_count, box_width){

	//if this isn't the initial dom creation 
		//data structure needs to be manually reset with init_dom.userReset
	if (init_dom.postInit) {
		init_dom.userReset(box_count, box_width);
		return
	} else {
		init_dom.postInit = true;
	}

	//will contain table td dom elements
	var boardArr = [];

	//creates the dom (actual sudoku board)
	function install_board_dom(boxW, boxC) {
		var $table = $('#sudoku'),
		   	width = boxW * boxC,
		   	row, td;
		
		$table.html('');

		for (var i = 0; i < width; i++) {
			$row = $('<tr></tr>');
			for (var j = 0; j < width; j++) {
				td = $('<td></td>');
				$row.append(td);
				boardArr.push(td);
			}
			$table.append($row);
		}
	}

	//creates the unique sudoku borders
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

	//call above functions and populate the boardArr array
	install_board_dom(box_width, box_count);
	draw_table_borders(box_width, box_count);

	return {
		domArr :boardArr,
		box_count: box_count,
		box_width: box_width
	}
}


var board_dom = init_dom(3, 3)

