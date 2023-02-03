console.log(dasherize2('createDocumentFragment')); // 'create-document-fragment'
console.log(dasherize2('SuperMAN'));               // 'super-man'
console.log(dasherize2('VirtualDOMFragment'));     // 'virtual-dom-fragment'

function dasherize(value: string): string {
    return value.replace(/([a-z][A-Z]|\d[a-zA-Z])|((?<!\b)[A-Z][a-z])/g, (str, before, after) => {

        if(before) {
            const [prev, next] = before.split('')
            return `${prev}-${next}`
        }
        return `-${after}`;
     }).toLowerCase()
}

function dasherize2(value: string): string {
    const chars = [...value];
    const iter = chars[Symbol.iterator]();

    let item = iter.next(),
        wasBig = false,
        isFirst = true,
        res = '';

    while(!item.done) {
        if(/[A-Z]/.test(item.value)) {
            if(isFirst) {
                res += item.value;
            } else {
                res += wasBig ? item.value : `-${item.value}`
            }
            wasBig = true

        } else {
            const prev = res[res.length - 1];
            const sup = res[res.length- 2];
            if(prev && sup && /[A-Z]/.test(prev) && /[A-Z]/.test(sup)){
                res = res.slice(0,-1)
                res += `-${prev}${item.value}`
            }else {
                res += item.value;
            }
            wasBig = false
        }

        if(isFirst){
            isFirst = false;
        }

        item = iter.next()
    }

    return res.toLowerCase();
}