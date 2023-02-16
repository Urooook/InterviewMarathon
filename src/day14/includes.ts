console.log(includes('hello bob!', 'bob'));  // true
console.log(includes('abba', 'aba'));        // false

function includes(str1, str2){
    const chars1= [...str1];
    const chars2 = [...str2];

    for(let i=0; i<chars1.length; i++) {
        if(chars1[i] === chars2[0]) {
            let res = '';
            let j = 0
            while(j < chars2.length){
                res+= chars1[i+j];
                j++;
            }
            if(res === str2) return true;
        }
    }

    return false;
}