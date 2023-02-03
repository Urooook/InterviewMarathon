class User {
    static _state = {}
    constructor(params) {
        this.name = params.name;
        this.age = params.age;
        this.skills = params.skills;
    }

    static name(name) {
        const {_state} = this
        return class extends this {
            static _state = {..._state, name}
        }
    }

    static age(age) {
        const {_state} = this
        return class extends this {
            static _state = {..._state, age}
        }
    }

    static skills(skills) {
        const {_state} = this
        return class extends this {
            static _state = {..._state, skills}
        }
    }

    static create() {
        return new this(this._state);
    }
}

const a = User.name('Bob').age(47).skills(['Coding']).create(); // User({name: 'Bob', age: 47, skills: ['Coding']})
console.log(a.name, a.age, a.skills)