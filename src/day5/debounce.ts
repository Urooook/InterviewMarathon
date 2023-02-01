
function debounce(func:any, delay: number) {
    let timer = null;
    return function() {
        if(timer !== null) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func();
            timer = null;
        }, delay);

    }
}

function laugh() {
    console.log('Ha-ha!')
}

const debouncedLaugh = debounce(laugh, 300);

debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();
debouncedLaugh();