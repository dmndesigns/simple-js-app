//define characteristics of relevant Pokemon
var pokemonRepository = (function () {
    var pokemonList = [
    {
        name: 'Bulbasaur', 
        height: 0.7 , 
        types: ['grass','poison']
    }, 

    {
        name: 'Venonat',
        height: 1 , 
        types: ['bug','poison']
    }, 

    {
        name: 'Xatu', 
        height: 1.5 , 
        types: ['grass','flying']
    }
];

function getAll() {
    return pokemonList;
} 

function add(pokemon) {
    pokemonList.push(pokemon);
}

return {
    getAll: getAll,
    add: add
};

})();

//write Pokemon name and height, commenting on tallest
pokemonRepository.getAll().forEach(function(pokeHeight) {
    if (pokeHeight.height > 1.1) {   
    document.write(pokeHeight.name + " (height: " + pokeHeight.height + ") " + 'Wow, that\'s big!' + "<br>") 
    }
    else {
        document.write(pokeHeight.name + " (height: " + pokeHeight.height + ") " + "<br>")
    }
}
)

