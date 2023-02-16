console.log(extractQuotes('Это строка в "кавычках\'" и `"эта"` тоже, а это "хитрая строка\\""')); // ["кавычках'", '"эта"', 'хитрая строка\\"']

function extractQuotes(str: string) {
   return [...str.matchAll(/(['"`])((?:\\\1|.)*?)\1/g)].map(([_1,_,str]) => str)
}