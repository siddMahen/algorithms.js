var bloom = require("../bloom").bloom;

var chf = function(){
    var a = ~~(Math.random() * 1000000) + 1;
    var b = ~~(Math.random() * 1000000);
    return function(x){
        return ((((a * x) + b) % 1000007) % 100000);
    }
}

var hl = [ chf(), chf(), chf() ];
var h = new bloom(100000, hl);

for(var i = 1; i < 100000; i += 100){
    var times = [];

    var start = process.hrtime();
    h.insert(~~(Math.random() * i));
    var diff = process.hrtime(start);
    times.push(diff[1]);

    var start = process.hrtime();
    h.contains(~~(Math.random() * i));
    var diff = process.hrtime(start);
    times.push(diff[1]);

    console.log(times[0], times[1]);
}
