const obj = {};

function setByPath(body: any, ...args: any) {
    const nameS = args[0].split('.')

    if (nameS.length === 0) return;

    const key = nameS.shift();
    if (nameS.length > 0) {
        if (!body.hasOwnProperty(key)) {
            body[key] = {}
        }
        if(body.hasOwnProperty(key) && nameS.length > 1) {
            body[key] = {}
        }
        setByPath(body[key], nameS.join('.'), args[1])
    } else {
        body[key] = args[1]
    }
}

setByPath(obj, 'foo.bar', 1);
setByPath(obj, 'foo.bla', 2);
setByPath(obj, 'lol', 2);
setByPath(obj, 'foo.bla.lol.kek', 7);
setByPath(obj, 'foo.bar', 7);

console.dir(obj, {depth:null}); // {foo: {bar: 1, bla: 2}}