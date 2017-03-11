$(document).ready(function() {
	var fieldHeight = 6,
		fieldWidth = 5,
		mineNumber = 10,
		field = $('#mineField');
	
	field.addClass('field');
	
	for (var i = 1; i <= fieldHeight; i++) {
		for (var j = 1; j <= fieldWidth; j++) {
			var cell = $("<div/>");
			cell.attr("id", "cell_" + i + "-" + j);
			cell.append("<div class='cell-info'/>");
			cell.addClass('cell');
			field.append(cell);
		}
		
		field.append("<div class='nl'/>");
	}
	
	for (var n = 0; n < mineNumber; n++) {
		generate_and_set_mine();
	}
	
	function generate_and_set_mine() {
		var cellH = Math.round(Math.random()*(fieldWidth - 1)) + 1,
			cellV = Math.round(Math.random()*(fieldHeight - 1)) + 1;
		
		set_mine(cellH, cellV);	
	}
	
	function set_mine(h, v) {
		if ($('#cell_'+v+'-'+h).hasClass('mine')) {
			generate_and_set_mine();
		} else {
			$('#cell_'+v+'-'+h).addClass('mine');
		}
	}
	
	$(".cell").click(function() {
		if ($(this).hasClass('mine')) {
			field.find(".cell-info").css('display', 'block');
			$(this).find(".cell-info").text('x');
			$(".cell").unbind("click");
		} else {
			var cellInfo = $(this).attr('id');
			
			cellInfo = cellInfo.split("_");
			cellInfo = cellInfo[1].split("-");
			
			var mN = getMineNumber(parseInt(cellInfo[0]), parseInt(cellInfo[1]));
			$(this).find('.cell-info').css('display', 'block').text(mN);
			
			if ($(".cell-info:visible").length == fieldHeight*fieldWidth-mineNumber) {
				field.find(".mine .cell-info").css('display', 'block').css('backgroundColor', 'green');
				$(".cell").unbind("click");	
			}
		}
	});
	
	function getMineNumber(v, h) {
		var n = 0;
		
		for (var i = v-1; i <= v+1; i++) {
			for (var j = h-1; j <= h+1; j++) {
				if ($('#cell_'+i+'-'+j).hasClass('mine')) {
					n++;
				}
			}
		}
		
		return n;
	}
});