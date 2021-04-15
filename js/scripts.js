let pokemonList = 
    [{name: 'Bulbasaur', height: 0.7 , types: ['grass','poison']}, 
    {name: 'Venonat', height: 1 , types: ['bug','poison']}, 
    {name: 'Xatu', height: 1.5 , types: ['grass','flying']
    }
];

for (let i = 0; i < pokemonList.length; i++)
    { document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ") 
    }

if (pokemonList.height > 1.1) {
    document.write('Wow, that\'s big!');
}