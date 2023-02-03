console.log(diff([1, 2, 3, 4, 5], [3, 4, 1])); // [2, 5]

function diff(search: number[], parametr: number[]) {
   const arr2 = new Set(parametr)
   return search.filter((el) => !arr2.has(el))
}