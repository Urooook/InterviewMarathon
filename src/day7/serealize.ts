// @ts-ignore
const original = {
    myDate: new Date(),
    mySet: new Set([1, 2, 3]),
    myMap: new Map([
        [new Date(), {a: 1}]
    ])
};
const str = serialize(original);
console.log(parse(str))
function serialize(obj: any): string {
    const toJSON = Date.prototype.toJSON
    delete Date.prototype.toJSON;

  try {
      return JSON.stringify(obj, (key, value) => {
          if(value instanceof Date) {
              return `[[DATA]]:Date;${value.valueOf()}`
          }

          if(value instanceof Set || value instanceof Map) {
              return `[[DATA]]:${value.constructor.name};${serialize([...value])}`
          }

          return value;
      })
  } finally {
      Object.defineProperty(Date.prototype, 'toJSON', {
          configurable: true,
          writable: true,
          enumerable: false,
          value: toJSON
      })
  }
}

function parse(str: string) {
    return JSON.parse(str, (key, value) => {
        if(typeof value === 'string' && value.startsWith('[[DATA]]')) {
            const [_, type, data] = /^\[\[DATA]]:(.*?);(.*)/.exec(value)
            return Function('data', `return new ${type}(data)`)(parse(data))
        }

        return value;
    })
}

// const s = '(Date) myDate: "2023-02-03T15:58:01.742Z" (Set) mySet: 1 2 3 (Map) myMap: (Date) 0: "2023-02-03T15:58:01.742Z" (Object) 1: {"a":1}'
//
// for(const key of Object.keys(obj)) {
//     res+= `(${obj[key].constructor.name}) `
//     if(typeof obj[key][Symbol.iterator] === 'function') {
//         if(!param) res+= `${key}: `;
//         for(const child of obj[key]) {
//             if(typeof child[Symbol.iterator] === 'function'){
//                 res += `${serialize(child, true)} `
//             } else {
//                 if(typeof child === 'object'){
//                     res += `${JSON.stringify(obj[key])} `;
//                 } else {
//                     res += `${child} `
//                 }
//             }
//         }
//     } else if(Array.isArray(obj[key])){
//         res += `${serialize(obj[key], true)} `
//     } else {
//         res += `${key}: ${JSON.stringify(obj[key])} `;
//     }
// }