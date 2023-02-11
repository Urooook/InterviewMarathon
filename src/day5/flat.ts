function flat(arr: any[], depth: number = 1) {
    const res = [];
    const stack = [
        [depth, arr[Symbol.iterator]()]
    ];

    while (stack.length > 0) {
        const [depth, iter] = stack.pop();
         // @ts-ignore
        for (const el of iter) {
             if(!Array.isArray(el) || depth <= 0) {
                 res.push(el);
             } else {
                 stack.push([depth, iter]);
                 // @ts-ignore
                 stack.push([depth - 1, el[Symbol.iterator]()]);
                 break;
             }
         }
    }

    return res;

}

console.log(flat([[1, 3], [[1]], 2]));    // [1, 2, [1], 2]
// console.log(flat([[1, 2], [[1]], 2], 2)); // [1, 2, 1, 2]
// console.log(flat([[1, 2], [[[1]]], 2], 3)); // [1, 2, 1, 2]
// console.log(flat([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]], Infinity))
