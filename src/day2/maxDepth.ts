const obj1 = {
    value: 'foo',
    children: [
        {
            value: 'bar'
        },

        {
            value: 'bla',
            children: [{value: 'baz', children: [{value: 'baz', children: []}]}]
        }
    ]
};

function maxDepth(body: any): number {
   const stack = [body];
   let result = 0;

   while(stack.length > 0){
       const node = stack.pop();
       if(node.children !== undefined) {
           result++
       }
       if(node.children?.length) {
           stack.push(...node.children)
       }
   }

    return result
}

function maxDepth2(body: any): number {
    let max = 0;

    if(body.children) max++;

    function findDepth(children, startDepth) {
        children.forEach((el) => {
            if(el.children) {
               const depth = findDepth(el.children, startDepth + 1)
                if(depth>max) {
                    max = depth;
                }
            }
        })

        return startDepth;
    }

    findDepth(body.children, max)

    return max;
}

console.log(maxDepth2(obj1)); // 2