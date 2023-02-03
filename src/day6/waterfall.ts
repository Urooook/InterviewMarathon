function waterfall(callbacks: Iterable<any>, finalCallback: (...args: any) => void) {
    const iter = callbacks[Symbol.iterator]();
    let args = [];

    function next() {
        const step = iter.next();
        if(step.done) {
            finalCallback(null, ...args);
            return;
        }

        step.value(...args, (err, ...nextArgs) => {
            if(err != null) {
                finalCallback(err);
                return;
            }
            args = nextArgs;
            next()
        })
    }

 next();
}

waterfall([
    (cb) => {
        cb(null, 'one', 'two');
    },

    (arg1, arg2, cb) => {
        console.log(arg1); // one
        console.log(arg2); // two
        cb(null, 'three');
    },

    (arg1, cb) => {
        console.log(arg1); // three
        cb(null, 'done');
    }
], (err, result) => {
    console.log(result); // done
});

// waterfall(new Set([
//     (cb) => {
//         cb('ha-ha!');
//     },
//
//     (arg1, cb) => {
//         cb(null, 'done');
//     }
// ]), (err, result) => {
//     console.log(err);    // ha-ha!
//     console.log(result); // undefined
// });