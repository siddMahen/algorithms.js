var heap = require("./heap");

/*
 * The Heap Sort algorithm.
 *
 *
 * @api public
 */

var heapSort = function(array, cmp){

}

exports.heapSort = heapSort;

/*
 * The Merge Sort algorithm.
 *
 * @param {Array} array
 * @param {Function} cmp
 *
 * @returns {Array} sortedArray
 *
 * The cmp function should accept two parameters a, b as input and
 * return true if a < b, and false otherwise.
 *
 * Worst case performance: time O(nlgn), space O(n).
 *
 * MergeSort works by recursively splitting an input array into halves
 * until the subarrays can quickly be sorted. Once both arrays of size
 * n/2 have been sorted, they are "merged" in O(n) time to return the
 * final completely sorted array of size n.
 *
 * @api public
 */

var mergeSort = function(array, cmp){
    if(array.length === 1)
        return array;

    var split = Math.ceil(array.length/2),
        lh = mergeSort(array.slice(0, split), cmp),
        rh = mergeSort(array.slice(split), cmp),
        lhc = 0,
        rhc = 0;

    for(var i = 0; i < array.length; i++){
        if(lh[0] && rh[0]){
            if(cmp(lh[0], rh[0])){
                array[i] = lh.shift();
            }else{
                array[i] = rh.shift();
            }
        }else{
            if(lh[0] && !rh[0]){
                array[i] = lh.shift();
            }else{
                array[i] = rh.shift();
            }
        }
    }

    return array;
}

exports.mergeSort = mergeSort;

/*
 * The Quick Sort algorithm.
 *
 * @param {Array} array
 * @param {Function} cmp
 *
 * @returns {Array} sortedArray
 *
 * The cmp function should accept two parameters a, b as input and
 * return true if a < b, and false otherwise.
 *
 * Average case performance: time O(nlgn), space O(n).
 * Worst case performance: time O(n^2), space O(n).
 *
 * QuickSort works by randomly selecting a pivot element from the array and
 * partitioning the input into two subarrays whose elements are all less than
 * or greater than or equal to the pivot. The subarrays are then recursively
 * sorted and appended around the pivot element to return a sorted version of
 * the original array.
 *
 * @api public
 */

var quickSort = function(array, cmp){
    if(array.length <= 1)
        return array;

    var point = Math.round((array.length - 1) * Math.random()),
        pivot = array.splice(point, 1)[0],
        lh = [],
        rh = [];

    for(var i = 0; i < array.length; i++){
        var e = array[i];
        if(cmp(pivot, e)){
            lh.push(e);
        }else{
            rh.push(e);
        }
    }

    return quickSort(rh, cmp).concat(pivot).concat(quickSort(lh, cmp));
}

exports.quickSort = quickSort;
