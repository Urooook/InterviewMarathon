console.log(zipStr('abbaabbafffbezza')); // abafbeza

function zipStr(str: string): string {
    return str.replaceAll(/(\w+?)(?=\1)/g, '')
}

function zipStr1(str: string): string {

    return '';
}