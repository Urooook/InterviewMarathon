function compare(obj1: any, obj2: any): boolean {
    let isCompare = false;
    let lengthCompare = Object.keys(obj1).length === Object.keys(obj2).length
    if(!lengthCompare) return false;

    const trueResults = [];

    for(const key of Object.keys(obj1)) {
        if(obj2.hasOwnProperty(key)) {
            if(typeof obj1[key] == 'object' && typeof obj2[key] == 'object') {
                const res = compare(obj1[key], obj2[key]);
                if(res) {
                    trueResults.push(true)
                } else {
                    break;
                }
            } else {
                if(obj1[key] === obj2[key]) {
                    trueResults.push(true);
                }
            }
        } else {
            break;
        }
    }

    if(trueResults.length === Object.keys(obj1).length) {
        isCompare = true;
    }

    return isCompare;
}
//
// function compare1(obj1: any, obj2: any): boolean {
//
// }

console.log(compare({a: 1, b: [1, 2, 3], c: true}, {a: 1, b: [1, 2, 3], c: true})); // true
console.log(compare({a: 1, b: [1, 2, {a:1, b:{c:2}}]}, {a: 1, b: [1, 2, {a:1, b:{c:22}}]}));    // false