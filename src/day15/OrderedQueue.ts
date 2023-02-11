class LNode {
    data;
    next;
    prev;

    constructor(data) {
        this.data = data;
    }
}

class LL {
    #first;
    #last;

    insert(data) {
        const node = new LNode(data);
        if(this.#isEmpty()) {
            this.#first = node;
        } else {
            this.#last.next = node;
            node.prev = this.#last;
        }
        this.#last = node;
    }

    insertBefore(data, comparator) {
        const node = new LNode(data);
        if(this.#isEmpty()) {
            this.#first = node;
            this.#last = node;
        } else {
            let previus = null
            let current = this.#first
            let wasInsert = false;
            while(current != null) {
                if(comparator(current.data, node.data) <= 0) {

                        if(previus) {
                            previus.next = node;
                        } else {
                            this.#first = node
                        }
                        node.next = current
                        current.prev = node;
                        wasInsert = true
                        break;

                }
                previus = current
                current = current.next
            }
            if(!wasInsert) {
                this.#last.next = node;
                node.prev = this.#last;
                this.#last = node
            }
        }
    }

    deleteFirst() {
        const node = this.#first?.data;
        if(node.next == null) {
            this.#last = null;
        } else {
            this.#first.next.prev = null;
        }

        this.#first = this.#first.next;
        return node;
    }

    #isEmpty() {
        return this.#first == null;
    }

    get items(): Iterable<any> {
        let current = this.#first;
        return {
            *[Symbol.iterator](): Iterator<any> {
                while (current) {
                    yield current.data;
                    current = current.next
                }
            }
        }
    }
}

class OrderedQueue {
    #state = new LL();
    #comparator

    constructor(comparator?) {
        if(comparator){
            this.#comparator = comparator;
        }
    }

    push(data) {
        if(this.#comparator){
            this.#state.insertBefore(data, this.#comparator);
        } else {
            this.#state.insert(data);
        }
    }

    pop() {
        return this.#state.deleteFirst();
    }

    get items() {
        return [...this.#state.items];
    }
}

const queue123 = new OrderedQueue((a, b) => a - b);

queue123.push(1);
queue123.push(5);
queue123.push(2);
queue123.push(-1);
queue123.push(5);
queue123.push(2);
queue123.push(-1);
queue123.push(5);

console.log(queue123.pop());  // 5
console.log(queue123.pop());  // 5

console.log(queue123.pop());  // 5
console.log(queue123.pop());  // 2
console.log(queue123.pop());  // 2


