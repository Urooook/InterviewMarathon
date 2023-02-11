const obj12 = {
    a: {
        b: [1, 2, { d: 4}],
        '': {c: 2}
    }
};

/* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
console.log(collapse(obj12));

function collapse(tree: any, prefix: string = ''): string {
    let res = '';

    for(const el of Object.keys(tree)) {
        if(typeof tree[el] === 'object' && tree[el] !== null){
            const currentRes = collapse(tree[el], `${prefix}${el}.`);
            res += currentRes;
        } else if(el === '') {
            res += `.. ${el}`;
        } else {
            res += `'${prefix}${el}': ${tree[el]}, `;
        }
    }

    return res;
}