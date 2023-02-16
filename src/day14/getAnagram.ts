console.log(getAnagram('cat')); // ['cta', 'atc', 'act', 'tca', 'tac']

function getAnagram(str: string) {
    const values = new Set();

    function changePosition(a:number, b: number, s: string) {
        return s.split('').map((el, i) => {
            if(i === a) {
                return s[b]
            }
            if(i === b) {
                return s[a]
            }
            return el;
        }).join('');
    }

    function ff(word: string) {
        let currIndex = 0;
        while(true) {
            if(currIndex + 1 < word.length) {
                const res = changePosition(currIndex, currIndex+1, word);
                if(!values.has(res) && res !== str) {
                    values.add(res)
                    ff(res)
                }
                currIndex++;
            } else {
                break;
            }
        }
    }

    ff(str);

    return [...values];
}