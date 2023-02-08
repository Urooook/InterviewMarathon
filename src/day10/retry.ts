retry(() => Promise.reject(1), {retry: 3, delay: (n) => n * 1000}).then(console.log, console.error);

function retry(cb: () => Promise<any>, parametrs: any) {
    let count = 0;
    function caller(cb: () => Promise<any>, parametrs: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if(parametrs.retry <= 0) reject(new Error('Error1'));

            setTimeout(() => {
                count++;
                cb().then((res) => resolve(res)).catch(() => caller(cb, {retry: parametrs.retry - 1, delay: parametrs.delay}))

            }, parametrs.delay(count))
        })
    }

    return caller(cb, parametrs);
}