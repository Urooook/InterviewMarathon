console.log(reduce([1, 3, 6, 8, 7, 11, 45, 46, 2])); // 1-3, 6-8, 11, 45-46

function reduce(arr) {
    const sortArr = arr.sort((a, b) => a - b);
    let base, prev;
    const res = [];

    for(let i =0; i< sortArr.length; i++) {
        const el = arr[i],
        isLast = i === sortArr.length-1;

        if(base == null) {
            res.push(String(el));
            base = el;
            prev = el;
            continue;
        }

        if(el === prev + 1) {
            if(isLast) {
                res[res.length-1] += `-${el}`;
            } else {
                prev = el;
            }
            continue;
        }

        if(base !== prev) {
            res[res.length-1] += `-${prev}`;
        }

        res.push(String(el));
        base = el;
        prev = el;
    }

    return res.join(', ');
}