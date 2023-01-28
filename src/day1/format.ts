type userObjType = {
    name: string
    age: number
}

const format = (str: string, userObj: userObjType): string => {
    return str.replace(/\$\{([a-zA-Z0-9* ]+)}/g, (_, $1) => {
        if(userObj[$1] != null) {
            return String(userObj[$1])
        } else {
            return Function(...Object.keys(userObj), `return ${$1}`)(...Object.values(userObj));
        }
    })
}

const a = format('Hello ${name}! My age is ${age * 2}.', {name: 'Bob', age: 12}); // 'Hello Bob! My age is 24.'
console.log(a)