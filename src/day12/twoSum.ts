console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]

function twoSum(arr: number[], search: number) {
   let state = new Map();

   for(let i =0; i< arr.length; i++) {
       const el = arr[i];
       const diff = search - el;
       if(state.has(diff)){
           return [state.get(diff), i]
       } else {
           state.set(el, i)
       }
   }

   return -1;
}