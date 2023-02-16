console.log(isPalindrome1('bob'));  // true
console.log(isPalindrome1('abba')); // true
console.log(isPalindrome1('a'));    // false
console.log(isPalindrome1('azt'));  // false

function isPalindrome(str: string): boolean {
    return str.length <= 1 ? false : str === str.split('').reverse().join('');
}

function isPalindrome1(str: string): boolean {
   const chars = [...str];
   if(chars.length <= 1) return false;
   for(let i=0, j=chars.length-1; i<j; i++, j--) {
       if(chars[i] !== chars[j]){
           return false;
       }
    }

   return true;
}