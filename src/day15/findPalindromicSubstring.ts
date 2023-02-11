console.log(findPalindromicSubstring('adaabbabla')); // 'abba'
console.log(findPalindromicSubstring('blablur'));    // null

function findPalindromicSubstring(str: string) {
   const result = [];
   const chars = [...str];
   let currentRes = '';
   for(let i=0; i<chars.length; i++) {
       currentRes += chars[i];
       if(i !== chars.length - 1) {
           for(let j=i+1; j<chars.length; j++){
               currentRes += chars[j];
               if(currentRes === currentRes.split('').reverse().join('')){
                   result.push(currentRes)
               }
           }
       }
       currentRes = '';
   }
    if(result.length === 0){
        return null;
    } else {
        let max = 0;
        let value;
        for(let i=0; i<result.length; i++){
            if(result[i].length > max) {
                max = result[i].length;
                value = result[i];
            }
        }

        return value;
    }
}