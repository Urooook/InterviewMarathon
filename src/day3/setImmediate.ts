const [setImmediate, clearImmediate] = (() => {
    const callbacks = new WeakMap();

    const set = (cb: () => void) => {
        const key =  {};
        callbacks.set(key, cb);

        queueMicrotask(() => {
            const func = callbacks.get(key);
            if(typeof func === 'function') {
                func();
            }
        });

        return key;
    }

    const clear = (key: any) => {
        callbacks.delete(key);
    }

    return [set, clear];
})();

setTimeout(() => {
    console.log(3);
}, 0);

setImmediate(() => {
    console.log(1);
});

const timer = setImmediate(() => {
    console.log(2);
});

clearImmediate(timer);