class LinkedList {
    #first = null
    #last = null

    #isEmpty() {
        return this.#first === null;
    }

    insertLast(data) {
        const val = new LinkedNode(data);
        if(this.#isEmpty()){
            this.#first = val;
        } else {
            this.#last.next = val;
            val.prev = this.#last;
        }
        this.#last = val;
    }

    deleteFirst() {
        const curr = this.#first?.data;
        if(curr.next == null) {
            this.#last = null
        } else {
            this.#first.next.prev = null;
        }
        this.#first = this.#first.next;
        return curr;
    }
}

class LinkedNode {
    data;
    prev;
    next;
    constructor(data) {
        this.data = data;
    }
}

class Queue {
    list = new LinkedList();

    push(val) {
        this.list.insertLast(val);
    }

    pop() {
        return this.list.deleteFirst();
    }
}

const queue = new Queue();

queue.push(1);
queue.push(2);
queue.push(3);

console.log(queue.pop()); // 1
console.log(queue.pop()); // 2
console.log(queue.pop()); // 3
