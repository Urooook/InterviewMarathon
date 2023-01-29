const alphabet = new Map();

const alphabets = {36: alphabet};

for(let i = '0'.codePointAt(0), j = 0; i<= '9'.codePointAt(0); i++, j++) {
    alphabet.set(String.fromCodePoint(i), j)
}

for(let i = 'A'.codePointAt(0), j = 10; i<= 'Z'.codePointAt(0); i++, j++) {
    alphabet.set(String.fromCodePoint(i), j)
}

function parseSymbol(symbol: string, radix: number = 10) {
    if(radix> alphabet.size || radix < 2){
        throw new TypeError('Radix Error');
    }

    let a = alphabets[radix];

    if(a == null) {
        a = new Map([...alphabet].slice(0, radix));
        alphabets[radix] = a;
    }

    return a.get(symbol.toUpperCase()) ?? NaN
}

function myParseInt(num:string, radix: number = 10): any {
    const chunks = [];
    let sign = 1;

    for(const [i, s] of num.split('').entries()) {
        if(s=== '-') {
            if(i === 0) {
                sign = -1
            } else {
                break;
            }
        } else {
            const value = parseSymbol(s, radix);

            if(Number.isNaN(value)) {
                break;
            } else {
                chunks.push(value);
            }
        }
    }

    if(chunks.length === 0) {
        return NaN;
    }

    let res = 0;

    chunks.reverse();
    chunks.forEach((val, i) => {
        res += val * (radix ** i);
    });

    return sign * res;
}

console.log(myParseInt('-10', 2));  // -2
console.log(myParseInt('FFP', 16)); // 255
console.log(myParseInt('--20'));    // NaN