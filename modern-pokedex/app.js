const searchInput=document.querySelector("#poke-input");
const searchBtn=document.querySelector(".btn-search");
const pokeContainer=document.querySelector(".poke-container");
const pokeCount=151;
const colors = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#d6b3ff",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
    ice: "#e0f5ff ",
};
//es5
async function initPokemon(){
    for( let i=1;i<=pokeCount;i++){
        await getPokemon(i);
    }
};

//es6

const getPokemon=async (id)=>{
    let url=`https://pokeapi.co/api/v2/pokemon/${id}`;
    let res=await fetch(url);
    let data=await res.json();
    createPokeBox(data);

}
function createPokeBox(pokemon){
    let name=pokemon.name[0].toUpperCase()+pokemon.name.slice(1);
    let id=pokemon.id.toString().padStart(3,'0');
    let weight=pokemon.weight;
    let type=pokemon.types[0].type.name
    let color=colors[type];
    if(weight>=1000){
        a=`<p class="poke-weight">${weight/1000} ton</p>`
    }
    else{
        a=`<p class="poke-weight">${weight}kg</p>`
    }
    let code=`<div class="poke-box" style="background-color:${color};">
    <img src="https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${id}.png" alt="">
    <h4 class="poke-name">${name}</h4>
    <p class="poke-id">#${id}</p>
    ${a}
    <p class="poke-type">Type: ${type}</p>
</div>`
    document.querySelector(".poke-container").insertAdjacentHTML("beforeend",code)
    
}

searchInput.addEventListener("input",function(e){
    const search=searchInput.value.toLowerCase();
    console.log(search);
    const pokeNames = document.querySelectorAll('.poke-name');

    for (let pokeName of pokeNames){
        pokeName.parentElement.style.display='block';
        if(!pokeName.innerHTML.toLowerCase().includes(search)){
            pokeName.parentElement.style.display='none';
        }

    }

})
initPokemon();