var sort = require("../"),
    mergeSort = sort.mergeSort,
    quickSort = sort.quickSort;

var cmp = function(a, b){ return a < b; };
var a = [100];

for(var i = 1; i < 100000; i += 100){
    var times = [];

    a.push(~~(Math.random() * 10000));

    var start = process.hrtime();
    mergeSort(a, cmp);
    var diff = process.hrtime(start);
    times.push(diff[1]);

    var start = process.hrtime();
    quickSort(a, cmp);
    var diff = process.hrtime(start);
    times.push(diff[1]);

    console.log(times[0], times[1]);
}
