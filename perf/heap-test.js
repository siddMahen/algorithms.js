var heap = require("../").heap;

var h = new heap();

for(var i = 1; i < 100000; i += 100){
    var start = process.hrtime();
    h.insert(~~(Math.random() * i), Math.random());
    var diff = process.hrtime(start);
    console.log(diff[1]);
}
