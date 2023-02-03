const tree = {
    value: 1,
    children: [
        {
            value: 2,
            children: [{value: 4, children: [{value: 6}]}]
        },
        {
            value: 3,
            children: [{value: 5}]
        }
    ]
};

function width(body: any) {
    const queue = [body];
    const res = [];

    while(queue.length > 0) {
        const node = queue.shift();
        if(node.value) {
            res.push(node.value);
        }

        if(node.children?.length) {
            node.children.forEach((el) => queue.push(el))
        }
    }

    return res;
}

function width2(body: any) {
    const queue = [body];
    const res = [];
    const iter = queue[Symbol.iterator]();
    let item = iter.next()

    while(!item.done) {

        if(item.value?.value) {
            res.push(item.value.value);
        }

        if(item.value?.children?.length) {
            item.value.children.forEach((el) => queue.push(el))
        }
        item = iter.next();
    }

    return res;
}


console.log(width2(tree)); // 1 2 3 4 5 6