console.log(calc('12+5*2/(60-58)-5')); // 12

function calc(str: string) {
    str = str.replace(/\d+|[*/+\-()]/g, ' $& ').trim();

    const lexems = str.split(/\s+/)
    // console.log(lexems);
    const priorities = {
        '(': -1,
        ')': -1,
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }

    const
        stack = [],
        queue = [];

    for(const lexem of lexems) {
        if(/\d+/.test(lexem)){
            if(/\D/.test(lexem)) return NaN;

            queue.push(parseInt(lexem))
        } else if( lexem === '(') {
            stack.push(lexem)
        } else if( lexem === ')') {
           while(true) {
               if(stack.length === 0) {
                    return NaN;
               }

               const head = stack.pop();
               if(head === '(') {
                   break;
               }
               queue.push(head);
           }
        } else {
            if(priorities[lexem] === null) {
                return NaN;
            }

            if(stack.length > 0 && stack[stack.length - 1] !== '('){
                while (priorities[stack[stack.length - 1]] > priorities[lexem]) {
                    queue.push(stack.pop())
                }
            }
            stack.push(lexem)
        }
    }

    while (stack.length > 0) {
        queue.push(stack.pop())
    }
    console.log(stack, queue)
    const exprStack = [];

    while(queue.length>0) {
        const head = queue.shift();

        if(typeof head === 'number') {
            exprStack.push(head)
        } else {
            if(exprStack.length < 2) {
                return NaN;
            }

            switch (head) {
                case '+': {
                    exprStack.push(exprStack.pop() + exprStack.pop())
                    break;
                }
                case '-': {
                    const op2 = exprStack.pop();
                    exprStack.push(exprStack.pop() - op2)
                    break;
                }
                case '*': {
                    exprStack.push(exprStack.pop() * exprStack.pop())
                    break;
                }
                case '/': {
                    const op2 = exprStack.pop();
                    exprStack.push(exprStack.pop() / op2)
                    break;
                }
            }
        }
    }

    return exprStack[0] ?? NaN
}