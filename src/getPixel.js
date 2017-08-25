var fs = require('fs');
var getPixels = require("get-pixels")
var file = process.argv[2];
var ndarray = require("ndarray");
var x = parseInt(process.argv[3]); //col
var y = parseInt(process.argv[4]); //row

var formatNumberDigits = function (number, digits) {
	number = number.toString();
	if (number.length >= digits) {
		return number;
	}
	for (var i = number.length; i < digits; i++) {
		number = "0" + number;
	}
	return number;
};
if (file) {
	getPixels(file, function(err, pixels) {
		if(err) {
			console.log("Bad image path");
			return;
		}
		var data = ndarray(pixels.data, pixels.shape);
		var px = formatNumberDigits(pixels.get(x,y,0).toString(16), 2) +
			formatNumberDigits(pixels.get(x,y,1).toString(16), 2) +
			formatNumberDigits(pixels.get(x,y,2).toString(16), 2);
		console.log("got pixels at " + x + ',' +  y + ' pixel val = ' + px);
	})
}
//40,195 = 9f8663