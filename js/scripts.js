//define characteristics of relevant Pokemon
let pokemonList = 
    [{name: 'Bulbasaur', height: 0.7 , types: ['grass','poison']}, 
    {name: 'Venonat', height: 1 , types: ['bug','poison']}, 
    {name: 'Xatu', height: 1.5 , types: ['grass','flying']
    }
];

//write Pokemon name and height, commenting on tallest
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.1) {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") "+ 'Wow, that\'s big!');}
    else { 
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") ") 
    }
}