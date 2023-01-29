## Установка свойства по сложному пути в объекте

Необходимо написать функцию, которая бы устанавливало переданное значение объекту по заданному пути.

```js
const obj = {};

setByPath(obj, 'foo.bar', 1);
setByPath(obj, 'foo.bla', 2);

console.log(obj); // {foo: {bar: 1, bla: 2}}
```

## Нахождение максимальной глубины в дереве

Необходимо написать функцию, которая бы возвращала максимальную глубину заданного дерева.

```js
const obj = {
  value: 'foo',
  children: [
    {
      value: 'bar'
    },

    {
      value: 'bla',
      children: [{value: 'baz'}]
    }
  ]
};

console.log(maxDepth(obj)); // 2
```

## Реализация функции аналогичной parseInt

Необходимо написать функцию, которая бы повторяло поведение parseInt.

```js
console.log(myParseInt('10'));      // 10
console.log(myParseInt('-10', 2));  // -2
console.log(myParseInt('FFP', 16)); // 255
console.log(myParseInt('--20'));    // NaN
```
