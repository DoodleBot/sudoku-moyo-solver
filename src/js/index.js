$(function() {
	var counters = [];
	var $board = $('.board');

	function init(values, owners) {
		var i,
			ii;

		// create multi-dimensional array (9x9, each cell containing a counter data object)
		for(i = 0; i < values.length; i++) {
			var rowArray = [];

			for(ii = 0; ii < values[i].length; ii++) {
				rowArray.push(createCounter(values[i][ii], owners[i][ii]));
			}
			counters.push(rowArray);
		}

		console.log(counters);

		updateOptions();
	}

	function createCounter(value, owner) {
		return {
			value: value ? value : 0,
			owner: owner ? owner : 0
		};
	}

	function placeCounter(row, col, value, owner) {
		var counter = {
			value: value,
			owner: owner
		};

		counters[row][col] = counter;
		updateOptions();
	}

	/*
	 * Runs a check on each 0 value counter and updates the option array for each.
	 * @function
	 * @return void
	 */
	function updateOptions() {
		var i,
			ii;

		for(i = 0; i < counters.length; i++) {
			for(ii = 0; ii < counters[i].length; ii++) {
				if(counters[i][ii].value !== 0) {
					continue;
				}
				var box = reverseArray(checkBox(i, ii));
				var row = reverseArray(checkRow(i));
				var col = reverseArray(checkColumn(ii));
				var options = counters[i][ii].options = repeatedValueArray(box.concat(row, col), 3);
				console.log(i, ii, options);
			}
		}

		updateView();
	}

	function updateView() {
		var i,
			ii;

		for(i = 0; i < counters.length; i++) {
			for(ii = 0; ii < counters[i].length; ii++) {
				if(counters[i][ii].value === 0) {
					$board.append('<div>(' + i + ',' + ii + ') ' + counters[i][ii].options + '</div>');
				}
			}
		}
	}

	function checkBox(row, col) {
		var i,
			ii,
			val,
			uniqueValues = [],
			megaRow = Math.floor(row / 3),
			megaCol = Math.floor(col / 3),
			megaRowStart = megaRow * 3,
			megaRowEnd = megaRowStart + 2,
			megaColStart = megaCol * 3,
			megaColEnd = megaColStart + 2;

		for(i = megaRowStart; i <= megaRowEnd; i++) {
			for(ii = megaColStart; ii <= megaColEnd; ii++) {
				val = counters[i][ii].value;

				if(val !== 0) {
					uniqueValues.push(val);
				}
			}
		}

		return uniqueValues;
	}

	function checkRow(row) {
		var i,
			val,
			uniqueValues = [];

		for(i = 0; i < counters[row].length; i++) {
			val = counters[row][i].value;

			if(val !== 0) {
				uniqueValues.push(val);
			}
		}

		return uniqueValues;
	}

	function checkColumn(column) {
		var i,
			val,
			uniqueValues = [];

		for(i = 0; i < counters.length; i++) {
			val = counters[i][column].value;

			if(val !== 0) {
				uniqueValues.push(val);
			}
		}

		return uniqueValues;
	}

	/*
	 * Reverse the values in an array.
	 * @param {array} arr - the array to reverse.
	 * @param {number} min - the bottom number.
	 * @param {number} max - the top number.
	 */
	function reverseArray(arr, min, max) {
		var i,
			ii,
			match = false,
			revArr = [];

		min = min ? min : 1;
		max = max ? max : 9;

		for(i = min; i <= max; i++) {
			for(ii = 0; ii < arr.length; ii++) {
				if(arr[ii] === i) {
					match = true;
					break;
				}
			}

			if(!match) {
				revArr.push(i);
			} else {
				match = false;
			}
		}

		return revArr;
	}

	/*
	 * Removes duplicate values from array.
	 * @return {array}
	 */
	function uniqueArray(arr) {
		var i,
			ii,
			match = false,
			uniqueArr = [];

		for(i = 0; i < arr.length; i++) {
			for(ii = 0; ii < uniqueArr.length; ii++) {
				if(uniqueArr[ii] === arr[i]) {
					match = true;
					break;
				}
			}

			if(!match) {
				uniqueArr.push(arr[i]);
			} else {
				match = false;
			}
		}

		return uniqueArr;
	}

	/*
	 * Reduces an array to only the values that occur the required amount of times
	 * @param {array} arr
	 * @param {number} required - number of times a value must occur to be recorded.
	 * @return {array}
	 */
	function repeatedValueArray(arr, required) {
		var i,
			ii,
			count = 0,
			min = 1,
			max = 9,
			newArr = [];

			for(i = min; i <= max; i++) {
				for(ii = 0; ii < arr.length; ii++) {
					if(arr[ii] === i) {
						count++;
					}
				}

				if(count >= required) {
					newArr.push(i);
				}

				count = 0;
			}

			return newArr;
	}

	init([
		[0,0,0,6,0,0,9,0,0],
		[0,0,8,9,3,0,2,0,0],
		[2,9,0,0,0,0,0,3,0],
		[0,0,0,0,6,0,0,9,8],
		[0,4,0,5,9,1,0,7,0],
		[3,7,0,0,2,0,0,0,0],
		[0,5,0,0,0,0,0,8,1],
		[0,0,1,0,5,4,7,0,0],
		[0,0,3,0,0,6,0,0,0]
	], [
		[2,2,2,1,1,1,2,2,2],
		[2,2,2,1,1,1,2,2,2],
		[2,2,2,1,1,1,2,2,2],
		[2,2,2,0,0,0,1,1,1],
		[2,2,2,0,0,0,1,1,1],
		[2,2,2,0,0,0,1,1,1],
		[1,1,1,2,2,2,1,1,1],
		[1,1,1,2,2,2,1,1,1],
		[1,1,1,2,2,2,1,1,1]
	]);
});
