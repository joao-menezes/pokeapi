let load_more = document.querySelector('#load_more');
let more_info = document.querySelectorAll('more-info');
let value = 20

function show_infos(a) {
    let infos = document.getElementsByClassName('infos');
    let a_info = a - 1

    if (infos[a_info].style.display == 'grid') {
        infos[a_info].style.display = 'none';
    } else {
        infos[a_info].style.display = 'grid';
    }
}

function click_load() {
    load_more.addEventListener('click', () => {
        load_more.style.backgroundImage = 'url(load.gif)';
            if(value + 20 > 151){
                value += 20 - ((value + 20) - 151);
            }else{
                value += 20;
                setTimeout('fetchPokemon()', 1000);
            }
        });
}

const fetchPokemon = () => {
    const url = id =>  `https://pokeapi.co/api/v2/pokemon/${id}`;

    click_load()

    const pokePromise = [];
    for (let i = 1; i <= value; i++) {
        pokePromise.push(fetch(url(i)).then(res => res.json()));
    }

    Promise.all(pokePromise)
    .then(pokemons => {
        const pokemonList = pokemons.reduce((acc, pokemon) => {
            const types = pokemon.types.map(typeinfo => typeinfo.type.name);
            acc += `<li class="card ${types[0]} "/>
                    <div class="card-description">
                    <p class="number">N°${pokemon.id}</p>
                    <img class="pokemon-img" alt="${pokemon.name}" src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" />
                    <h1 class="card-title">${pokemon.name}<h1>
                    </div>
                    
                    <div class="infos" id="infos">
                        <h1 class="card-text">${pokemon.name}</h1>
                        <p class="card-text">${pokemon.weight} weight</p>
                        <p class="card-text">${pokemon.height} height</p>
                        <p class="card-text">${pokemon.abilities.map(ability => ability.ability.name).join(' | ')}</p>
                    </div>

                    <div class="footer">
                    <button class="more-info" id="more-info" onclick="show_infos(${pokemon.id})">!</button>
                    <p class="types">${types.join(' | ')}</p>
                    </div>
                    </li>`;
            return acc;
        }, '');

        const ul = document.querySelector('ul').innerHTML = pokemonList; 
    })
}

fetchPokemon();