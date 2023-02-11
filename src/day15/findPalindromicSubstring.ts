console.log(findPalindromicSubstring('adaabbabla')); // 'abba'
console.log(findPalindromicSubstring('blablur'));    // null

function findPalindromicSubstring(str: string) {
    const chars = [...str];
    let res = '',
       currentRes = '';

   for(let i=0; i<chars.length; i++) {
       currentRes += chars[i];
       if(i !== chars.length - 1) {
           for(let j=i+1; j<chars.length; j++){
               currentRes += chars[j];
               if(currentRes === currentRes.split('').reverse().join('')){
                   if(currentRes.length > res.length){
                       res = currentRes
                   }
               }
           }
       }
       currentRes = '';
   }
    if(res === ''){
        return null;
    } else {
        return res;
    }
}