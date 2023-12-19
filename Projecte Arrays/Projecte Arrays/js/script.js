// ////////////////////////////
// //      Exercici 0        //
// ////////////////////////////

let dadesPokemon;
let dadesMunicipis;
let dadesMeteorits;
let dadesPelicules;

//funció per fer el fetch i obtenir les dades des del fitxer json
function fetchData(url) {
  return fetch(url)
    .then((response) => response.json());
}

// POKEMONS
fetchData("js/data/pokemon.json")
  .then((data) => {
    dadesPokemon = data.pokemon;
  });

// MUNICIPIS
fetchData("js/data/municipis.json")
  .then((data) => {
    dadesMunicipis = data.elements;
  });

// METEORITS
fetchData("js/data/earthMeteorites.json")
  .then((data) => {
    dadesMeteorits = data;
  });

// MOVIES
fetchData("js/data/movies.json")
  .then((data) => {
    dadesPelicules = data.movies;
  });

//L'únic mode d'obtenir o treure les dades fora del fetch() inicial ha sigut amb el procediment Promise.all
//em vaig trobar amb aquest problema que quan obtenia l'array de la consulta, aquest només era vàlid a dins de cada fetch() mentre que a fora la variable noms_pokemons estava buida
Promise.all([
  fetchData("js/data/pokemon.json"),
  fetchData("js/data/municipis.json"),
  fetchData("js/data/earthMeteorites.json"),
  fetchData("js/data/movies.json")
])
  .then(([pokemonData, municipisData, meteoritsData, peliculesData]) => {
    dadesPokemon = pokemonData.pokemon;
    dadesMunicipis = municipisData.elements;
    dadesMeteorits = meteoritsData;
    dadesPelicules = peliculesData.movies;

    //Ara cridem la funció per mostrar les dades per la consola amb console.table()
    mostraDades();
  });

//Aquesta funció crea un objecte a partir dels 4 arrays obtinguts de les 4 consultes extretes dels fitxers json
function mostraDades() {
	let dades = [];
	for (let i = 0; i < Math.max(dadesPokemon.length, dadesMunicipis.length, dadesMeteorits.length, dadesPelicules.length); i++) {
    	let fila = {
        	"Pokemon": i < dadesPokemon.length ? dadesPokemon[i].name : "",
        	"Municipis": i < dadesMunicipis.length ? dadesMunicipis[i].municipi_nom : "",
        	"Pel·lícules": i < dadesPelicules.length ? dadesPelicules[i].title : "",
        	"EarthMeteorite": i < dadesMeteorits.length ? dadesMeteorits[i].name : ""
    	};
    dades.push(fila);
	}
	console.table(dades);
}

/*
//Codi original donat a l'exercici
// POKEMONS
fetch("js/data/pokemon.json")
.then((response) => response.json())
.then((data) => {
	dadesPokemon = data.pokemon;		
	
	//console.log(dades)
	//console.log(dades[0].name);
});


// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dadesMunicipis = data.elements;		
	
	//console.log(dades)
	//console.log(dades[0].municipi_nom)
});


// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dadesMovies = data.movies;		
	
	//console.log(dades)
	//console.log(dades[0].title)
});


// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dadesMeteorits = data;		
	
	//console.log(dades)
	//console.log(dades[0].name)

});

*/

// ////////////////////////////
// //      Exercici 1        //
// ////////////////////////////

//funció de proba per l'opció reload
function MostraText(){
	let text7 = document.getElementById("agafa_text").value;
	document.getElementById("text_aqui").innerHTML = text7;
}

//botó per reiniciar la pàgina amb la funcionalitat location.reload()
function ReloadWindow(){
	location.reload();
}