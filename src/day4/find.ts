function find(search: string, values: string[]): string[] {
    const findValues: string[] = [];

    for(const el of values) {
        let copy = search.split('')
        let currentEl = [];
        for(const char of el.split('')){
            if(char === copy[0]){
                currentEl.push(char);
                copy.shift();
            }
        }

        if(currentEl.join('') === search) {
            findValues.push(el);
            currentEl = [];
        }
    }

    return findValues;
}

// Another Realisation

function findPattern(pattern: string, string: string): boolean {
    const patternIter = pattern[Symbol.iterator]();

    let activePatternChar = patternIter.next();
    if(activePatternChar.done) return false;

    for (const char of string.split('')) {
        if(char === activePatternChar.value) {
            activePatternChar = patternIter.next()
        }
    }

    return activePatternChar.done;
}

function find1(pattern: string, values: string[]): string[] {
    return  values.filter((val) => findPattern(pattern, val))
}


console.log(find('kbza', [
    'kobezzza',
    'bob',
    'kibiza',
    'kobea'
])); // ['kobezzza', 'kibiza']