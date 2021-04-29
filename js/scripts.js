//define characteristics of relevant Pokemon
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

    function add(pokemon) {
      if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);
      }
    }

    function getAll() {
    return pokemonList;
};

function showDetails(pokemon) {
    loadDetails (pokemon).then(function (){console.log(pokemon);
});
}

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

function loadList() {
    return fetch(apiUrl).then (function (response) {
        return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
          let pokemon = {
              name: item.name,
              detailsUrl: item.url
          };
          add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
}

function loadDetails(item) {
  let url = item.detailsUrl;
  return fetch(url).then(function (response) {
      return response.json();
  }).then(function (details) {
    item.imageUrl = details.sprites.front_default;
    item.height = details.height;
    item.types = details.types;
  }).catch(function (e) {
      console.error(e);
  });
}

return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
};
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});



