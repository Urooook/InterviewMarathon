function laughq() {
    console.log('Ha-ha!')
}

function throttle(fn: () => void, delay: number): (...args) => void {
    let timer,
        lastArgs;
    return function wrapper (...args) {

        lastArgs = args;
        if(timer == null) {
            fn.apply(this, args);

            timer = setTimeout(() => {
                timer = null;

                if(lastArgs !== args) {
                    wrapper.apply(this, lastArgs);
                }
            }, delay);
        }
    }
}


const throttledLaugh = throttle(laughq, 300);

throttledLaugh(1);
throttledLaugh(2);
throttledLaugh(3);
throttledLaugh(4);
throttledLaugh(5);

