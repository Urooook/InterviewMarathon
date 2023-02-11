const i = iterate1({
    value: 1,
    children: [{value: 2}, {value: 3, children: [{value: 4}]}]
});

console.log(i.next()); // {value: 1, done: false}
console.log(i.next()); // {value: 2, done: false}
console.log(i.next()); // {value: 3, done: false}
console.log(i.next()); // {value: 4, done: false}
console.log(i.next()); // {value: undefined, done: true}

function iterate(tree: any) {
    const queue = [tree];
    const results = [];

    while(queue.length) {
        const node = queue.shift();
        if(node?.value) {
            results.push(node.value);
        }
        if(node?.children?.length) {
            for(const el of node.children) {
                queue.push(el);
            }
        }
    }
    return Object.assign(tree, {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            return {
                value: results.shift(),
                done: results.length === 0
            }

        }
    })
}

function* iterate1(tree: any) {
    yield tree.value;

    if(!Array.isArray(tree.children)) {
        return;
    }

    for(const child of tree.children) {
        yield* iterate1(child)
    }
}