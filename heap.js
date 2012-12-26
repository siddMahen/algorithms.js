
/*
 * An implementation of a heap or priority queue data structure.
 *
 * @param {Array} tree
 *
 * The array will be heapified during initialization. Note that
 * this is a log factor faster than adding all of the element
 * via insertion.
 *
 * This heap supports O(lgn) insertions and delete-mins as well
 * as heapification in O(n).
 *
 * @api public
 */

function heap(tree){
    if(!(this instanceof heap))
        return new heap(tree);

    this.tree = tree || [];

    if(tree){
        var leaves = ~~(tree.length/2);
        while(leaves >= 0){
            this.bubbleDown(leaves);
            leaves--;
        }
    }
}

/*
 * Insert an object into the heap.
 *
 * @param {Object} obj
 * @param {Number} key
 *
 * Non-unique keys are allowed.
 *
 * @api public
 */

heap.prototype.insert = function(obj, key){
    var tree = this.tree;

    // push the object into the tree
    tree.push({ "key": key, "obj": obj });

    var len = tree.length - 1,
        parent = ~~(len/2),
        child = len;

    if(len === 0)
        return;

    // because we added a key, the heap property
    // may not hold

    // keep swapping parent-child pairs
    // until the heap property is restored
    while(key < tree[parent]["key"]){
        var tmp = tree[parent];

        tree[parent] = tree[child];
        tree[child] = tmp;

        child = parent;
        parent = ~~(parent/2);
    }
}

/*
 * Peek at the minimum element in the heap.
 *
 * @returns {Object} the min element
 *
 * Unlike extract, peek does not delete the min element.
 * Furthermore, unlike all the other heap operations, this
 * runs in O(1) time.
 *
 * @api public
 */

heap.prototype.peek = function(){
    return this.tree[0];
}

/*
 * Deletes and returns the minimum element in the heap.
 *
 * @returns {Object} the min element
 *
 * The returned object takes the form:
 *
 * { key: k, obj: o }
 *
 * Where k is the key and o is the object supplied at
 * insert.
 *
 * @api public
 */

heap.prototype.bubbleDown = function(i){
    var tree = this.tree;

    // we've disturbed the heap propert, so it must
    // be restored
    var parent = i,
        lchild = (i * 2) + 1,
        rchild = (i * 2) + 2;

    // dangling children that are less than their parents
    if(lchild >= tree.length || rchild >= tree.length){
        if(tree[lchild]){
            if(tree[parent]["key"] > tree[lchild]["key"]){
                var tmp = tree[lchild];
                tree[lchild] = tree[parent];
                tree[parent] = tmp;
            }
        }

        // we've reached the bottom of the tree; exit
        return;
    }

    var p = tree[parent]["key"],
        r = tree[rchild]["key"],
        l = tree[lchild]["key"];

    // keep swapping the root of the tree with it's
    // children until the heap property is restored
    if(p > r || p > l){
        // get the min of the two children and find out
        // if we need to go right or left
        var mright = true,
            mkey = l > r ? (mright = true, r) : (mright = false, l);

        if(mright){
            // swap the right child and the parent
            var tmp = tree[rchild];
            tree[rchild] = tree[parent];
            tree[parent] = tmp;

            // recurse on the right child
            this.bubbleDown(rchild);
        }else{
            // swap the left child and the parent
            var tmp = tree[lchild];
            tree[lchild] = tree[parent];
            tree[parent] = tmp;

            // recurse on the left child
            this.bubbleDown(lchild);
        }
    }
}

heap.prototype.extract = function(){
    var tree = this.tree,
        len = tree.length - 1;

    // with less than 3 elements, no shuffling required
    if(len <= 2)
        return tree.pop();

    // swap the first and last elements of the tree
    var tmp = tree[0];
    tree[0] = tree[len];
    tree[len] = tmp;

    // now the min is at the end, so pop it
    var min = tree.pop();

    // bubble down and restore the heap invariant
    this.bubbleDown(0);

    return min;
}

/*
 * Delete the object at a specific key
 *
 * @param {Number} key
 *
 * If there are multiple objects with the same key,
 * the first will be removed.
 *
 * @api public
 */

heap.prototype.delete = function(key){
    var tree = this.tree;

    // we can keep deleting min until we delete
    // an object with the key === key,
    // but that would take at most 2nlgn time
    // which sucks
}

module.exports = heap;
