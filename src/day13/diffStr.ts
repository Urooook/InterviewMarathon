console.log(diffStr('bob', 'rob'));           // 1 (одна замена)
console.log(diffStr('австрия', 'австралия')); // 2 (два удаления)

function diffStr(a:string, b: string) {
    const char1 = [...a];
    const char2 = [...b];

    function l(chars1, chars2) {
        if(chars1.length === 0) {
            return chars2.length;
        }

        if(chars2.length === 0) {
            return chars1.length;
        }

        const [h1, ...t1] = chars1,
              [h2, ...t2] = chars2;

        if(h1 === h2) {
            return l(t1, t2);
        }

        return 1+ Math.min(l(chars1, t2), l(t1, chars2), l(t1,t2))
    }

    return l(char1, char2)
}