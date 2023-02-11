console.log(myParseFloat('10'));      // 10
console.log(myParseFloat('-10.2'));   // -10.2
console.log(myParseFloat('6e-2'));    // 0.06
console.log(myParseFloat('--20'));    // NaN

const enum State {
    INITIAL = 'INITIAL',
    EXP = 'EXP',
    INITIAL_MINUS = 'INITIAL_MINUS',
    EXP_MINUS = 'EXP_MINUS',
    INT_CHUNK = 'INT_CHUNK',
    DEC_CHUNK = 'DEC_CHUNK',
    DOT = 'DOT',
    EXP_NUMBER = 'EXP_NUMBER',
}

function myParseFloat(str: string) {
    let res = '';
    let wasExp = false;

    let state = State.INITIAL;

    for(const symbol of str.split('')) {
        switch (symbol) {
            case '-': {
                if(state !== State.INITIAL && state !== State.EXP){
                    return NaN;
                }

                if(state === State.INITIAL){
                    state = State.INITIAL_MINUS;
                } else {
                    state = State.EXP_MINUS;
                }

                break;
            }
            case 'e': {
                if(state !== State.INT_CHUNK && state !== State.DEC_CHUNK || wasExp) {
                    return NaN;
                }
                wasExp = true;
                state = State.EXP;
                break;
            }
            case '.': {
                if(state !== State.INT_CHUNK && state !== State.DEC_CHUNK) {
                    return NaN;
                }

                state = State.DOT;
                break;
            }
            default: {
                if(!/\d/.test(symbol)){
                    return NaN;
                }

                if(state === State.DOT){
                    state = State.DEC_CHUNK
                } else if( state === State.EXP){
                    state = State.EXP_NUMBER;
                } else {
                    state = State.INT_CHUNK;
                }
            }
        }
        res += symbol;
    }
    if(wasExp) {
        const d = res.split('e-');
        let num = Number(d[0]);
        let range = Number(d[1]);
        while(range > 0) {
            num /= 10;
            range--;
        }
        res = String(num);
    }
    return res;
}