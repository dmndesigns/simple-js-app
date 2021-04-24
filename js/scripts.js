//define characteristics of relevant Pokemon
let pokemonRepository = (function () {
    let pokemonList = [
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
};

function showDetails(pokemon) {
    console.log(pokemon);
};


function addListItem(pokemon){
    let allPokemon = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listpokemon.appendChild(button);
    allPokemon.appendChild(listpokemon);
    button.addEventListener('click', function(event){showDetails(pokemon)
    }); 
}
return {
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails
};
})();

pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon)
});




