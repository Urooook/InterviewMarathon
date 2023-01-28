type resultType = {
    status: string,
    value?: any,
    reason?: any
}

function allSettled<T>(iterable: Iterable<T>): Promise<resultType[]> {
    const tasks: any[] = Array.from(iterable);

    if(tasks.length === 0) Promise.resolve([]);

   return new Promise((resolve) => {
       const results: resultType[] = new Array(tasks.length);
       let done = 0;

       for(let i = 0; i< tasks.length; i++) {
           tasks[i] = Promise.resolve(tasks[i]);
           tasks[i].then((value) => {
               results[i] = { status: 'fulfilled', value};
               done++;

               if(done === tasks.length){
                   resolve(results);
               }
           }).catch((reason) => {
               results[i] = { status: 'rejected', reason };
               done++;

               if(done === tasks.length){
                   resolve(results);
               }
           })
       }
   })
}

allSettled([1, Promise.resolve(2), Promise.reject(3)]).then(([v1, v2, v3]) => {
    console.log(v1); // {status: 'fulfilled', value: 1}
    console.log(v2); // {status: 'fulfilled', value: 2}
    console.log(v3); // {status: 'rejected', reason: 3}
});