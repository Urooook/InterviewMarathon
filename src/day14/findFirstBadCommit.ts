const commits = ['good', 'good', 'good', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad'];

const test = (commit) => commit === 'good';

console.log(findFirstBadCommit(commits, test)); // 3

function findFirstBadCommit(arr: string[], predicate: (arg) => boolean) {
    let left = 0;
    let right = arr.length;
    let res = -1

    while(left<right) {
        let mid = Math.floor((left+right) /2);
        if(!predicate(arr[mid])){
            res = mid;
            right = mid;
        } else if(predicate(arr[mid])) {
            left = mid +1;
        } else {
            right = mid-1;
        }
    }

    return res;
}