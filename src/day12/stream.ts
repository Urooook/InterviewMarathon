class EventEmitter1 {
    #state = new Map();

    once(key: string, handler: () => void) {
        this.#state.set(key, { keyListener: 'once', handler});
    }

    on(key: string, handler: () => void) {
        this.#state.set(key, { keyListener: 'on', handler});
    }

    emit(key: string, value: any) {
        const handlerObj = this.#state.get(key);

        if(handlerObj?.keyListener === 'once') {
            this.#state.delete(key);
        };
        if(!handlerObj?.handler) {
            throw new Error('Dont find this key');
        } else {
            handlerObj.handler(value);
        }
    }

    off(key: string, handler?: () => void) {
        if(handler) {
            this.#state.delete(key)
        } else {
            for(const el of this.#state.keys()) {
                if(el === key) {
                    this.#state.delete(el);
                }
            }
        }
    }

    get length() {
        return this.#state.size;
    }
}


const ee1 = new EventEmitter1();

(async () => {
    for await (const e of stream(ee1, 'foo')) {
        console.log(e); // 1 2 3
    }
})();
// ee1.on('foo', console.log)

ee1.emit('foo', 1);
ee1.emit('foo', 2);
ee1.emit('foo', 3);

function stream(emitter: any, action: string) {
    const resolvers = [];
    const values = [];

    emitter.on(action, (...args) => {
        if(resolvers.length > 0) {
            const resolver = resolvers.shift();
            resolver({done: false, value: args})
        } else {
            values.push(args)
        }
    })

    return {
        [Symbol.asyncIterator]() {
            return this;
        },

        async next() {
            return new Promise((resolve) => {
                if(values.length > 0) {
                    resolve({done: false, value: values.shift()})
                } else {
                    resolvers.push(resolve)
                }
            })
        }
    }
}
