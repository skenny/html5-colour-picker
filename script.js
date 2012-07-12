$(document).ready(function() {
	var mouseIsDown = false;
	var mouseDownX = 0;
	var mouseDownY = 0;

    var viewModel = {
        red: ko.observable(128),
        green: ko.observable(128),
        blue: ko.observable(128)
    };

    viewModel.hex = ko.dependentObservable({
        read: function() {
	        return toHex(this.red(), this.green(), this.blue());
        },
        write: function(value) {
            var decimals = toDecimal(value);
            this.red(decimals[0]);
            this.green(decimals[1]);
            this.blue(decimals[2]);
        },
        owner: viewModel
    });
    
    viewModel.rgb = ko.dependentObservable(function() {
        return 'rgb(' + this.red() + ',' + this.green() + ',' + this.blue() + ')';
    }, viewModel);
    
    ko.applyBindings(viewModel);

	autoSizeCanvas();
	
	$(window).bind("resize", function() { autoSizeCanvas(window); });
    $('#canvas').mousedown(function(e) { mouseDown(e); });
	$('#canvas').mouseup(function(e) { mouseUp(e); });
	$('#canvas').mousemove(function(e) { mouseMove(e); });
		
    // auto-select text
    $('input[type=text]').click(function() { this.select(); });
	
	// enable fullscreen canvas (latest chrome, ff only)
	if (typeof webkitRequestFullScreen == 'function') {
		$('#canvas')[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); // chrome
	}	
	if (typeof mozRequestFullScreen == 'function') {
		$('#canvas')[0].mozRequestFullScreen(); // ff
	}

	function autoSizeCanvas() {
		$("#canvas").css("width", $(window).width() + "px");
		$("#canvas").css("height", ($(window).height() - $('#toolbar').height()) + "px"); 
	}
	
	function toHex(red, green, blue) {
		var redHex = parseInt(red).toString(16).toUpperCase();
		var greenHex = parseInt(green).toString(16).toUpperCase();
		var blueHex = parseInt(blue).toString(16).toUpperCase();

		if (redHex.length === 1) { redHex = "0" + redHex; }
		if (greenHex.length === 1) { greenHex = "0" + greenHex; }
		if (blueHex.length === 1) { blueHex = "0" + blueHex; }
		
		return '#' + redHex + greenHex + blueHex;
	}
	
	function toDecimal(hex) {
	    if (hex[0] == '#') {
	        hex = hex.substring(1);
	    }
	    
	    return [
	        parseInt(hex.substring(0, 2), 16),
	        parseInt(hex.substring(2, 4), 16),
            parseInt(hex.substring(4, 6), 16)
	    ];
	}
	
	function mouseDown(e) {
		if (e.button == 0) {	// left
			mouseIsDown = true;
			mouseDownX = e.pageX;
			mouseDownY = e.pageY;
		}
	}
	
	function mouseUp(e) {
		if (e.button == 0) {	// left
			mouseIsDown = false;
			
			$('#canvas').drawRect({
			  fillStyle: viewModel.hex(),
			  x: mouseDownX, 
			  y: mouseDownY,
			  width: e.pageX - mouseDownX,
			  height: e.pageY - mouseDownY
			});
		}
	}
	
	function mouseMove(e) {
		if (!mouseIsDown) { return; }
		var x = e.pageX;
		var y = e.pageY;
	}

});

