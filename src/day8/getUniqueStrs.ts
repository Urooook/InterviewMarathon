console.log(getUniqueStrs1(['atoe', 'otea', 'ben', 'enb', 'baz', 'foo'])); // ['baz', 'foo']

function sortStr(str: string) {
     return str.split('').sort((a,b) => a.codePointAt(0) - b.codePointAt(0)).join('');
}

function getUniqueStrs(args: string[]): string[] {
    const res: string[] = [];

    const values = new Map();

    args.forEach((str) => {
        const prepareStr = sortStr(str)
        values.set(prepareStr, str);
    });

    const sortStrings = args.map((el) => sortStr(el))

    for(let i = 0; i<sortStrings.length; i++) {
        const elem = sortStrings[i];
        let total = 0;

        for(let j = 0; j<sortStrings.length; j++) {
            if(sortStrings[j] === elem){
               total++;
            }
        }

        if(total == 1) {
            res.push(elem)
        }
    }
    const resValues = []
    for(const el of res){
        resValues.push(values.get(el))
    }

    return resValues;
}

function getUniqueStrs1(args: string[]): string[] {
    const values = new Map();

    args.forEach((str) => {
        const prepareStr = [...str].sort().join('');
        if(values.has(prepareStr)) {
            values.get(prepareStr).counter++;
        } else {
            values.set(prepareStr, { counter: 1, str })
        }
    });

    return [...values.values()].filter(({counter}) => counter === 1).map(({str}) => str)
}