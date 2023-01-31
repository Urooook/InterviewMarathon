function promisify(func: any): (...args) => Promise<unknown> {
    return function (...args) {
        return new Promise((resolve, reject) => {
            const callback = (err: Error | null, value?: number) => {
                if(err !== null && err !== null) {
                    reject(err);
                } else {
                    resolve(value);
                }
            }

            func(...args, callback)
        })
    }
}

function cbDiv(a, b, cb) {
    if (b === 0) {
        cb(new TypeError('Нельзя делить на 0'));

    } else {
        console.log(cb)
        cb(null, a / b);
    }
}

const promiseDiv = promisify(cbDiv);

promiseDiv(1, 2).then(console.log);  // 0.5
promiseDiv(1, 0).catch(console.log); // TypeError('Нельзя делить на 0')