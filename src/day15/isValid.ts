console.log(isValid('(hello{world} and [me])'));  // true
console.log(isValid('(hello{world)} and [me])')); // false
console.log(isValid(')'));                        // false

function isValid(str: string): boolean {
    const stack = [];

    for (const char of str.split('')) {
        if(char === '(' || char === '{' || char === '[') {
            stack.push(char)
        }

        if(char === ')' || char === '}' || char === ']'){
            const last = stack.pop();
            if(char === ')' && last !== '(' || char === '}' && last !== '{' || char === ']' && last !== '[') {
                return false;
            }
        }
    }

    return true;
}