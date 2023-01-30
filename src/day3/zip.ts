function zip (
    ...iterables: Iterable<unknown>[]
): IterableIterator<unknown> {
    const iterators = Array.from(iterables).map((iter) => iter[Symbol.iterator]())
    return {
        [Symbol.iterator]() {
            return this;
        },

        next() {
            const result = iterators.map((it) => it.next())

            return {
                value: result.map((res) => res.value).filter((res) => res !== undefined),
                done: result.every((res) => res.done)
            }
        }
    }
}

console.log(...zip(new Set([1, 2]), ['a', 'b', 'z'], '...'))