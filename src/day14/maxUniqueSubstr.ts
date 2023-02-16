console.log(maxUniqueSubstr('aab'));      // ab
console.log(maxUniqueSubstr('abcabcbb')); // abc
console.log(maxUniqueSubstr('bbbbb'));    // b
console.log(maxUniqueSubstr('pwwkew'));   // wke

function maxUniqueSubstr(str: string) {
    let res = '';
    const values = []
    const chars = [...str];
    const iter = chars[Symbol.iterator]();
    let item = iter.next();
    let i =0;

    while(!item.done) {
        if(res === '') {
            res += item.value;
        } else {
            if(res.indexOf(item.value) === -1) {
                res += item.value
            } else {
                values.push(res);
                res = `${item.value}`;
            }
        }
        if(i === chars.length - 1) {
            values.push(res)
        }

        i++
        item = iter.next();
    }

    let retVal = '';
    values.forEach((el) => {
        if(el.length > retVal.length) {
            retVal = el;
        }
    });
    return retVal;
}