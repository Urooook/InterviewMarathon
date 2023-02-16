async function* makeAsync(iter) {
    yield* iter;
}

// [1, 'a', '.'] [2, 'b', '.']
(async () => {
    for await (const el of zip1(makeAsync(new Set([1, 2])), makeAsync(['a', 'b', 'z']), makeAsync('...'))) {
        console.log(el);
    }
})();

async function* zip1(...iterables: AsyncIterable<any>[]) {
    const iterators = Array.from(iterables).map((iter) => iter[Symbol.asyncIterator]());

    while(true) {
        const res = Array.from(iterators);

        for(const [i, iter] of iterators.entries()) {
            const {value, done} = await iter.next();

            if(done) {
                return;
            }

            res[i] = value

        }

        yield res;
    }
}
