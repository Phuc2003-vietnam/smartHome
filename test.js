class Interval {
	constructor(start, end) {
		this.start = start
		this.end = end
	}
}

function isIntersect(arr, n) {
	// Sort intervals in increasing order of start time
	arr.sort(function (i1, i2) {
		return i1.start - i2.start
	})
	console.log(arr)

	// In the sorted array, if start time of an interval
	// is less than end of previous interval, then there
	// is an overlap
	for (let i = 1; i < n; i++) if (arr[i - 1].end > arr[i].start) return true

	// If we reach here, then no overlap
	return false
}

let arr1 = [
	new Interval(1, 3),
	new Interval(7, 9),
	new Interval(4, 6),
	new Interval(10, 13),
]
let n1 = arr1.length
if (isIntersect(arr1, n1)) console.log("yes");
else console.log("no");

// let arr2 = [ new Interval(6, 8),
// new Interval(1, 3),
// new Interval(2, 4),
// new Interval(4, 7) ];
// let n2 = arr2.length;

// if (isIntersect(arr2, n2))
// 	document.write("Yes<br>");
// else
// 	document.write("No<br>");

// This code is contributed by rag2127
