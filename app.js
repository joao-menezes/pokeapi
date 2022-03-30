let load_more = document.querySelector('#load_more');
let more_info = document.querySelectorAll('more-info');
var open_pokedex = document.getElementById('open_pokedex');
let value = 20

open_pokedex.addEventListener('click', () => {
    delay_display();
})

function delay(n){
    return new Promise(function(time){
        setTimeout(time,n*1000);
    });
}

async function delay_display(){
    let pokedex = document.getElementById('container');
    pokedex.style.display = 'block';
    open_pokedex.style.top = '0px';
    open_pokedex.style.left = '0px';
    open_pokedex.style.width = '100%';
    open_pokedex.style.height = '100%';
    open_pokedex.innerHTML = 'Loading...';
    open_pokedex.style.cursor = 'default';
    await delay(1)
    fetchPokemon()
    open_pokedex.style.opacity = '0';
    await delay(1)
    open_pokedex.style.display = 'none';
    await delay(.4)
    load_more.style.display = 'block';
}

function show_infos(a) {
    let infos = document.getElementsByClassName('infos');
    let card_description = document.getElementsByClassName('card-description');
    let a_info = a - 1

    if (infos[a_info].style.display == 'grid') {
        card_description[a_info].style.transform = 'translate(0px, 0px)'
        infos[a_info].style.display = 'none';
        more_info.innerText = '!';
    } else {
        infos[a_info].style.display = 'grid';
        card_description[a_info].style.transform = 'translate(0px, -150px)'
        more_info.innerText = '_';
    }
}

function click_load() {
    load_more.addEventListener('click', () => {
        load_more.style.backgroundImage = 'url(load.gif)';
        load_more.innerText = '';
        setTimeout(() => {
            load_more.style.backgroundImage = 'none';
        }, 1500);
            if(value + 20 > 151){
                value += 20 - ((value + 20) - 151);
                load_more.setAttribute('disabled', 'disabled');
                load_more.style.cursor = 'not-allowed';
                load_more.innerHTML = 'No more pokemon to load';
            }else{
                value += 20;
                console.log(value);
                setTimeout('fetchPokemon()', 0);
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
            if (pokemon.name === 'cloyster') {
                pokemon.name = 'Vagina';
            }
            acc += `<li class="poke_card ${types[0]} "/>

                    <p class="number">N°${pokemon.id}</p>
                    
                    <div class="card-description">
                    <img class="pokemon-img" alt="${pokemon.name}" src="https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png" />
                    <h1 class="card-title">${pokemon.name}<h1>
                    </div>
                    
                    <div class="infos" id="infos">
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