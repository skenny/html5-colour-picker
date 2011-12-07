$(document).ready(function() {
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
    
    // auto-select text
    $('input[type=text]').click(function() { this.select(); });
    
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
});

