var bl = require("./bloom"),
    bloom = bl.bloom,
    sbloom = bl.sbloom;

var chf = function(){
    var a = ~~(Math.random() * 10000) + 1;
    var b = ~~(Math.random() * 10000);
    return function(x){
        return ((((a * x) + b) % 10007) % 1000);
    }
}

var hl = [
    chf(),
    chf(),
    chf(),
    chf(),
    chf(),
    chf(),
];

var sb = new sbloom(1000, 1, 3, hl);
var nb = new bloom(1000, hl);

// Here is the test
// Check false positives
// Insert another 100, 1000, or 10000 elements
// Check false negatives

var test = [ 100, 1000, 10000, 100000, 1000000 ];

for(var i = 0; i < test.length; i++){
    var t = test[i];

    // Insert 100, 1000 and 10000 elements respectively
    for(var j = 0; j < t; j++){
        sb.insert(j);
        nb.insert(j);
    }

    // Test False Positives and False Negatives
    var sfp = 0,
        nfp = 0,
        sfn = 0,
        nfn = 0;

    for(var k = t/2; k < (t + t/2); k++){
        if(k < t){
            // Testing false negatives
            if(!sb.contains(k)) sfn++;
            if(!nb.contains(k)) nfn++;
        }else{
            // Testing false positives
            if(sb.contains(k)) sfp++;
            if(nb.contains(k)) nfp++;
        }
    }

    var mr = function(a){ return ~~a };

    console.log("Problem size:", t);

    console.log("Stochastic:");
    console.log("False positive:", mr(sfp/(t/2) * 100), "%");
    console.log("False negative:", mr(sfn/(t/2) * 100), "%");

    console.log("Normal:");
    console.log("False positive:", mr(nfp/(t/2) * 100), "%");
    console.log("False negative:", mr(nfn/(t/2) * 100), "%");

    console.log("");
}
