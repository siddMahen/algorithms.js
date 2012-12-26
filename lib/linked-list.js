

/*
 * An implementation of a linked list data structure.
 *
 *
 *
 */

var linkedList = function(array){
    if(!(this instanceof linkedList))
        return new linkedList(array);

    this.head = null;
    this.tail = null;
    this.length = 0;

    if(array){
        for(var i = 0; i < array.length; i++){
            this.push(array[i]);
        }
    }
}

// Insert front
linkedList.prototype.prepend = function(obj){
    if(!this.head){
        // create a head node
        this.head = {
            prev: null,
            data: obj,
            next: null
        }

        // set the tail to the head node
        this.tail = this.head;
    }else{
        var tmp = this.head;
        this.head = {
            prev: null,
            data: obj,
            next: tmp
        }

        tmp.prev = this.head;
    }

    this.length += 1;
}

linkedList.prototype.unshift = linkedList.prototype.prepend;

// Insert back
linkedList.prototype.append = function(obj){
    if(!this.head) return this.unshift(obj);

    this.tail.next = {
        prev: this.tail,
        data: obj,
        next: null
    };

    this.tail = this.tail.next;
    this.length += 1;
}

linkedList.prototype.push = linkedList.prototype.append;

// Remove front
linkedList.prototype.shift = function(){
    if(!this.head) return;
    var tmp = this.head;
    this.head = this.head.next;
    this.head.prev = null;
    this.length -= 1;
    return tmp.data;
}

// Remove back
linkedList.prototype.pop = function(){
    if(!this.tail) return;
    var tmp = this.tail;
    this.tail = this.tail.prev;
    this.tail.next = null;
    this.length -= 1;
    return tmp.data;
}

// Traverse
linkedList.prototype.traverse = function(fn){
    if(!this.head) return;
    var curr = this.head;

    for(var i = 0; i < this.length; i++){
        if(fn(curr.data)) return;
        curr = curr.next;
    }
}

linkedList.prototype.delete = function(fn){
    if(!this.head) return;
    var curr = this.head;

    do{
        if(fn(curr.data)){
            if(curr.prev) curr.prev.next = curr.next;
            if(curr.next) curr.next.prev = curr.prev;
            this.length -= 1;
            return;
        }
    }while(curr = curr.next);
}

// Exports
module.exports = linkedList;
