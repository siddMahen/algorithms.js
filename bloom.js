
/*
 * Implements the bloom filter data structure.
 *
 * Bloom filters support constant time insertions and
 * lookups in a space efficient manner.
 *
 */

var bloom = function(size, hashlist){
    this.vector = new Uint8Array(size);
    this.hashlist = hashlist;
}

/*
 * Insert an object into the bloom filter.
 *
 * @param {Object} obj
 *
 * @api public
 */

bloom.prototype.insert = function(obj){
    var hlist = this.hashlist,
        size = this.vector.length;

    for(var i = 0; i < hlist.length; i++){
        var ind = hlist[i](obj) % size;
        this.vector[ind] = 1;
    }
}

/*
 * Checks whether the filter contains the object.
 *
 * @param {Object} obj
 *
 * @api public
 */

bloom.prototype.contains = function(obj){
    var hlist = this.hashlist,
        size = this.vector.length;

    for(var i = 0; i < hlist.length; i++){
        var ind = hlist[i](obj) % size;
        if(!this.vector[ind])
            return false;
    }

    return true;
}

exports.bloom = bloom;

/*
 * Implements a stochastic variant of the bloom filter.
 *
 * This mitigates the problem of "filling up" the bloom filter
 * until the false positive rate is 100%. Given k uniformly random
 * hash functions, and m bits in the bit vector, you can store
 * at maximum n = m/k objects with a false positive rate of 0%.
 * However, this is normally far too small, and often you have
 * no choice but to fix m and k.
 *
 * @api public
 */

var sbloom = function(size, err, del, hl){
    this.vector = new Uint8Array(size);
    this.hashlist = hl;
    this.errLimit = err;
    this.delLimit = del;
}

sbloom.prototype.insert = function(obj){
    var hlist = this.hashlist,
        size = this.vector.length;

    // Insert the object
    for(var i = 0; i < hlist.length; i++){
        var ind = hlist[i](obj) % size;
        this.vector[ind] = 1;
    }

    // var lim = ~~(this.delLimit * Math.random());

    // Perform random deletions
    for(var j = 0; j < this.delLimit; j++){
        var rnd = ~~(Math.random() * (size - 1));
        this.vector[rnd] = 0;
    }
}

sbloom.prototype.contains = function(obj){
    var hlist = this.hashlist,
        size = this.vector.length,
        errs = 0;

    for(var i = 0; i < hlist.length; i++){
        if(!this.vector[hlist[i](obj) % size])
            errs++;
    }

    if(errs > this.errLimit)
        return false;

    return true;
}

exports.sbloom = sbloom;
