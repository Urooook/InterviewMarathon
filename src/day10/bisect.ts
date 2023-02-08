console.log(bisect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,15,16,17,18], (val) => 4 - val));   // 3
console.log(bisect([1, 2, 3, 4, 5, 6, 7], (val) => 234 - val)); // -1

function bisect(arr: number[], cb: (val: number) => number): number {
    let min = 0;
    let max = arr.length -1

    while(true) {
        let center = Math.floor((max+min)/2)

        if(cb(arr[center]) === 0) {
            return center;
        } else if(min > max) {
            return -1;
        } else {
            if(cb(arr[center]) > 0){
                min = center + 1;
            } else {
                max = center - 1;
            }
        }
    }

    return -1;
}

function bisect1(arr: number[], cb: (val: number) => number): number {
    if(!arr.length) return -1;

    let center = Math.floor(arr.length/2);

    if(cb(arr[center]) === 0) return center;
    if(cb(arr[center]) > 0) return bisect1(arr.slice(center + 1), cb)
    if(cb(arr[center]) < 0) return bisect1(arr.slice(0, center), cb)
}