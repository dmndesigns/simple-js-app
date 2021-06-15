//get characteristics of relevant Pokemon
let pokemonRepository = (function () {
  let pokemonList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object') {
    pokemonList.push(pokemon);
    }
  }
  
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.list-group');
    let listPokemon = document.createElement('li');
    listPokemon.classList.add('list-group-item');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('btn-primary');
    button.setAttribute('data-target', '#pokemonModal', 'data-toggle', 'modal');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener('click', function(event){showDetails(pokemon)
    }); 
  }

  function loadList() {
    return fetch(apiUrl).then (function (response) {
      return response.json();
    })
    .then(function (json) {
      json.results.forEach(function (item, index) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
          imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png',
        };
      add(pokemon);
      });
    })

    .catch(function (e) {
      console.error(e);
    })
  }
      
  function loadDetails(item) {
    let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
        })
    .then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    })
      
    .catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');

    modalTitle.empty();
    modalBody.empty();

    let pokemonName = $('<h1>' + pokemon.name + '</h1>');
    let pokemonImage = $('<img class ="modal-img" style=width:50%">');
    pokemonImage.attr('src', pokemon.imageUrl);
    let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + ' meters' + '</p>');
    let pokemonTypes = document.createElement('span');
    let types = 'Type: ';
    pokemon.types.forEach(function(item) {
    types += item.type.name + ' ';
    });
    pokemonTypes.innerHTML = types;

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImage);
    modalBody.append(pokemonHeight);
    modalBody.append(pokemonTypes);

    $('#pokemonModal').modal('toggle');
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
