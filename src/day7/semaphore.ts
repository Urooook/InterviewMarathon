function createsAsyncSemaphore(func: () => void, ...args: string[]) {
    let myArgs= [...args]; // Проще на Setвсе, тогда сложность умеьшится
    return function (value?: string) {
        if(!value) return;
        if(myArgs.indexOf(value) !== -1) {
            myArgs= myArgs.filter((el) => el !== value);
        }
        if(myArgs.length === 0){
            func();
        }
    }
}

const semaphore = createsAsyncSemaphore(() => {
    console.log('Boom!');
}, 'foo', 'bar');

semaphore('foo');
semaphore('bar'); // 'Boom!'

// Эта функция не будет выполняться
semaphore();