function sort(arr: number[]): number[] {
    const a = performance.now()
    const div = arr.filter((el) => el%2 === 0).sort((a,b) => b-a);
    const b = arr.map((el) => el % 2 === 0 ? div.pop() : el)
    console.log(performance.now() - a);
    return b
}

function sort2(arr: number[]): number[] {
    const a = performance.now()
    for(let i =0; i< arr.length-1; i++){
        let min;
        for( let j=i; j<arr.length; j++) {
            if(arr[i] % 2 === 0){
                if(!min) {
                    min = j
                }
                if(arr[j] < arr[min]){
                    min = j;
                }
            }
        }
        if(min) {
            let a = arr[min];
            arr[min] = arr[i];
            arr[i] = a;
        }
    }
    console.log(performance.now() - a);
    return arr;
}


console.log(sort2([7, 1, 4, 2, 9, 8, 6, 2])); // [7, 1, 2, 2, 9, 4, 6, 8]