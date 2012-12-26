
// TODO: Replace this with a bst when available
var linkedList = require("./linked-list");

/*
 * Implements the hash table data structure.
 *
 * Hash tables supports O(1) insertions, deletions
 * and lookups.
 *
 */

var hashTable = function(size, hash){
    if(!(this instanceof hashTable))
        return new hashTable;

    this.table = Array(size);
    this.size = size;
    this.hash = hash;
}

hashTable.prototype.insert = function(key, val){
    var index = this.hash(key) % this.size,
        table = this.table;

    if(!table[index])
        table[index] = linkedList([{ key: key, val: val }]);
    else
        table[index]["append"]({ key: key, val: val });
}

hashTable.prototype.delete = function(key){
    var index = this.hash(key) % this.size,
        table = this.table;

    if(table[index]){
        table[index]["delete"](function(node){
            return node.key === key;
        });
    }
}

hashTable.prototype.lookup = function(key){
    var index = this.hash(key) % this.size,
        table = this.table;

    if(table[index]){
        var val = null;

        table[index]["traverse"](function(node){
            if(node.key === key){
                val = node.val;
                return true;
            }
        });

        return val;
    }
}

module.exports = hashTable;
