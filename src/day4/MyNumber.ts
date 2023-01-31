class MyNumber {
    #state;
    constructor(val: number) {
        this.#state = val;
    }

    add(val: number) {
        this.#state += val;
        return this;
    }

    sub(val: number) {
        this.#state -= val;
        return this;
    }

    mult(val: number) {
        this.#state *= val;
        return this;
    }

    div(val: number) {
        this.#state /= val;
        return this;
    }

    [Symbol.toPrimitive]() {
        return this.#state;
    }

}

const num = new MyNumber(10);

// @ts-ignore
console.log(num.add(2).mult(2).sub(1) - 5); // 18