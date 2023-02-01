type setObject = {
    keyListener: 'on' | 'once',
    handler: () => void
}

class EventEmitter {
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

const ee = new EventEmitter();

ee.once('foo', console.log); // Сработает только один раз

ee.on('dad', console.log)


ee.emit('dad', 3);
ee.emit('dad', 4);

ee.emit('foo', 1);
// ee.emit('foo', 2);


// ee.off('foo', console.log); // Отмена конкретного обработчика события по ссылке
ee.off('foo');              // Отмена всех обработчиков этого события
console.log(ee.length)