class Parent {
    foo() {
        console.log('It works!');
    }
}

class Example extends Parent {}

function partial(parent, additionally) {
    Object.setPrototypeOf(additionally, Object.getPrototypeOf(parent.prototype))
    Object.defineProperties(parent.prototype, Object.getOwnPropertyDescriptors(additionally));
}

partial(Example, {
    foo() {
        super.foo();
        console.log('Yeaaah');
    },

    get bar() {
        return Math.random();
    }
});



const example = new Example();
console.log(example)

example.foo(); // It works! Yeaaah

console.log(example.bar); // Случайное число
console.log(example.bar); // Случайное число
console.log(example.bar); // Случайное число