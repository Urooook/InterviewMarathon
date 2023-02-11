console.log(getCentury(864)); // 20

function getCentury(num: number): number {
    return Math.ceil(num/100);
}