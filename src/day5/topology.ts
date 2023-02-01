const skills = [
    {
        name: 'fireball',
        need: ['firehands', 'magicspell']
    },

    {
        name: 'firehands'
    },

    {
        name: 'magicspell'
    },

    {
        name: 'inferno',
        need: ['fireball', 'crazymind']
    },

    {
        name: 'crazymind',
        need: ['magicspell']
    }
];

/*
[
  {
    name: 'firehands'
  },

  {
    name: 'magicspell'
  },

  {
    name: 'crazymind',
    need: ['magicspell']
  }

  {
    name: 'fireball',
    need: ['firehands', 'magicspell']
  },

  {
    name: 'inferno',
    need: ['fireball', 'crazymind']
  }
]
*/

function sort(arr, comparator) {
    const map = new Map(arr.map((el) => {
        const [key, dependencies  = []] = comparator(el);
        return [
            key,
            {
                dependencies,
                marked:false,
                value: el,
            }
        ]
    }));

    const queue = [];

    function traverse(obj) {
         obj.forEach((el) => {
             if(el.marked) return;
             console.log(obj)
             if(el.dependencies.length > 0) {
                 traverse((new Map(el.dependencies.map((key) => [key, map.get(key)]))))
             }

             el.marked = true;
             queue.push(el.value);
         })
    }

    traverse(map);

    arr.forEach((_, i) => {
        arr[i] = queue[i]
    })

    return arr;
}

console.log(sort(skills, ({name, need}) => [name, need]));