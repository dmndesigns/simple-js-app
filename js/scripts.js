//define characteristics of relevant Pokemon
let pokemonRepository = (function () {
    let pokemonList = [];
    let modalContainer = document.querySelector('#modal-container');
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
      if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);
      }
    }

  function getAll() {
    return pokemonList;
  };

  function addListItem(pokemon){
    let pokemonList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener('click', function(event){showDetails(pokemon)
    }); 
}

  function loadList() {
    return fetch(apiUrl).then (function (response) {
        return response.json();
    }).then(function (json) {
      json.results.forEach(function (item, index) {
          let pokemon = {
              name: item.name,
              detailsUrl: item.url,
              imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+1}.png',
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
  
  function showModal(pokemon) {
    modalContainer.classList.add('is-visible')
    modalContainer.innerText = '';
    let modal = document.createElement ('div');
    modal.classList.add('modal');
    modalContainer.appendChild(modal);

    let modalName = document.createElement('h1');
    modalName.classList.add('modal-name')
    modalName.innerText = pokemon.name;
    modal.appendChild(modalName);

    let modalHeight = document.createElement('p');
    modalHeight.innerText = 'Height: ' +  pokemon.height + ' meters';
    modal.appendChild(modalHeight);

    let modalTypes = document.createElement('div');
    modalTypes.classList.add('modal-types');
    pokemon.types.forEach(function(item) {
      let typesText = document.createElement('p');
      typesText.innerText = 'Type: ' + item.type.name;
      typesText.classList.add('type-name');
      modal.appendChild(modalTypes);
      modalTypes.appendChild(typesText);
    });

    let modalImage = document.createElement('img');
    modalImage.src = pokemon.imageUrl;
    modalImage.classList.add('modal-img');
    modal.appendChild(modalImage);

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    window.addEventListener('keydown', (e) => {if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
    }
    });
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
    });
    modal.appendChild(closeButtonElement);
  }

  function hideModal() {
      modalContainer.classList.remove('is-visible');
  }
  
  function showDetails(pokemon) {
    loadDetails (pokemon).then(function (){showModal(pokemon);
    console.log(pokemon);
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



