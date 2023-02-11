console.log(intersectRanges('1-2; 4-6; 9-11', '1-5; 10-14; 15')); // 1-2; 4-5; 10-11

function fullArr(str: string): number[] {
    const arr = str.split('-');
    let cursor = Number(arr[0]);

    if(!arr[1]) {
        return [cursor]
    } else {
        const res = [];
        for(let i = cursor; i< Number(arr[1]) + 1; i++) {
            res.push(i)
        }
        return res;
    }
}

function intersectRanges(str1: string, str2: string) {
    const firstRange = [];
    const secondRange = [];
    const res = [];
    str1.split(';').forEach((el) => {
        fullArr(el.trim()).forEach((item) => firstRange.push(item))
    })
    str2.split(';').forEach((el) => {
        fullArr(el.trim()).forEach((item) => secondRange.push(item))
    })

    let base, prev;
    let isLast;

    for(let i=0; i< firstRange.length; i++) {
        const el = firstRange[i];
        isLast = firstRange.length - 1;

        if(base == null && secondRange.indexOf(el) !== -1) {
            res.push(String(el));
            base = el;
            prev = el;
            continue;
        }

        if(el === prev + 1) {
            if(isLast && secondRange.indexOf(el) !== -1) {
                res[res.length-1] += `-${el}`;
            } else {
                prev = el;
            }
            continue;
        }

        if(base !== prev && secondRange.indexOf(el) !== -1) {
            res[res.length-1] += `-${prev}`;
        }

       if(secondRange.indexOf(el) !== -1) {
           res.push(String(el));
           base = el;
           prev = el;
       }

    }

    return res.join(', ')
}