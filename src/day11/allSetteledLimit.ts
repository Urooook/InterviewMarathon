allSettledLimit([
    () => Promise.reject(2),
    () => fetch('//some-data-2'),
    () => fetch('//some-data-3'),
    () => fetch('//some-data-4')
], 2).then(console.log);

function allSettledLimit(data: any, limit: number): Promise<any> {
    return new Promise((resolve) => {
        const results = new Array(data.length);
        const fns= [...data];

        if(fns.length === 0) {
            resolve(results);
            return;
        }

        let iter = fns.entries();
        let count = 0;
        function force() {
            const {value: [i, fn] = [], done} = iter.next();
            if(done) return;
            let promise;
            try {
                promise = Promise.resolve(fn());
            } catch(err) {
                promise = Promise.reject(err);
            } finally {
                promise.then((res) => {
                    results[i] = {
                        status: 'fulfilled',
                        value: res,
                    };
                    count++;
                    if(count === data.length) {
                        resolve(results);
                    } else {
                        force();
                    }
                }).catch((err) => {
                    results[i] = {
                        status: 'rejected',
                        reason: err,
                    };
                    count++;
                    if(count === data.length) {
                        resolve(results);
                    } else {
                        force();
                    }
                })
            }

        }

        for (let i =0; i< limit; i++) {
            force()
        }

    })
}