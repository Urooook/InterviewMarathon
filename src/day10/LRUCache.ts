class LRUCache {
    #cache = new Map();
    #size;

    constructor(value: number) {
        this.#size = value;
    }

    set(key:string, val: number) {
        if(this.#cache.has(key)) {
            this.#cache.delete(key);
        } else if(this.#cache.size === this.#size) {
            const first = this.#cache.keys().next().value;
            this.#cache.delete(first);
        }
        this.#cache.set(key, val);
    }

    get(key: string) {
        const item = this.#cache.get(key);
        if(item) {
            this.#cache.delete(key);
            this.#cache.set(key, item);
        }
        return item;
    }

    has(key: string) {
        if(!this.#cache.has(key)) {
            return false;
        }

        const item = this.#cache.get(key);
        this.#cache.delete(key);
        this.#cache.set(key, item);
        return true;
    }
}

const cache = new LRUCache(3); // Размер кеша

cache.set('key1', 1);
cache.set('key2', 2);
cache.set('key3', 3);

console.log(cache.get('key1')); // 1

cache.set('key4', 4);

console.log(cache.has('key2')); // false