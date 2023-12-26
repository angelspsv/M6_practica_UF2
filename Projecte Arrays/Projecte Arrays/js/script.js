// ////////////////////////////
// //      Part 0            //
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
	dades = data.pokemon;		
	
	//console.log(dades)
	//console.log(dades[0].name);
});


// MUNICIPIS
fetch("js/data/municipis.json")
.then((response) => response.json())
.then((data) => {
	dades = data.elements;		
	
	//console.log(dades)
	//console.log(dades[0].municipi_nom)
});


// MOVIES
fetch("js/data/movies.json")
.then((response) => response.json())
.then((data) => {
	dades = data.movies;		
	
	//console.log(dades)
	//console.log(dades[0].title)
});


// METEORITS
fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;		
	
	//console.log(dades)
	//console.log(dades[0].name)

});

*/

// ////////////////////////////
// //      Part 1            //
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

//funció que ordena mots de forma ascendent
function OrdenaASC(){
	let entrada = document.getElementById("espai_per_text").value;
	document.getElementById("mostra_mots_ordenats").innerHTML = TextToArray(entrada);
}


//funció que rep un text i retorna un array de mots
//la funció comprova quin és el separador dins del text, espai en blanc o la coma
function TextToArray(text){
	let myArr = [];
	let coma = CheckComa(text);
	if(coma){
		//si el separador és una coma
		myArr = text.split(", ");
	} else {
		//si el separador és un espai
		myArr = text.split(" ");
	}
	return myArr.sort();
}

//funció que recorre el text buscant coma
function CheckComa(text){
	for(let i=0; i<text.length; i++){
		if(text.charAt(i) == ","){
			return true;
		}
	}
	return false;
}


//funció que ordena descendentment els mots que rep
function OrdenaDSC(){
	let entrada2 = document.getElementById("espai_per_text").value;
	let arr_tmp = TextToArray(entrada2);
	document.getElementById("mostra_mots_ordenats").innerHTML = arr_tmp.reverse();
}


//funció que cerca un fragment dins d'un array
function CercaPokemon(){
	let nom_poke = document.getElementById("espai_per_nom_pokemon").value;
	//treballar amb el nom del pokemon i l'array de pokemons que ja tinc
	//en l'array de pokemons el nom te aquesta estructura: 'Aaaaaaaa'
	let lletra = nom_poke.charAt(0).toUpperCase();
	let temp = (nom_poke.toLowerCase()).slice(1);
	let nom_cercat = lletra + temp;
	document.getElementById("resposta_poke").innerHTML = CercaEnArray(nom_cercat);
}

//funció que cerca el nom del pokemon dins de l'array que ja teniem
function CercaEnArray(text){
	for(let i=0; i<dadesPokemon.length; i++){
		if(text == dadesPokemon[i].name){
			return "Aquest pokemon existeix!";
		}
	}
	return "Aquest pokemon no existeix!";
}


//funció que administra un array
//demana un número i el afegeix a l'array
//fa el càlcul de la mitja i el retorna
function MitjanaDelArray(){
	let number = document.getElementById("num_entrat").value;
	let arr_nums = [2, 5];
	arr_nums.push(parseInt(number));
	let mitja = (Suma(arr_nums)/(arr_nums.length)).toFixed(2);
	document.getElementById("la_mitja").innerHTML = `La mitja de tots el números de l'array és: ${mitja}`;
}

function Suma(arr){
	let suma = 0;
	for(let i=0; i<arr.length; i++){
		suma += arr[i];
	}
	return suma;
}

//funció que recorre un String cencant un espai en blanc
function CheckSpace(text){
	for(let i=0; i<text.length; i++){
		if(text.charAt(i) == " "){
			return true;
		}
	}
	return false;
}

//Programa que rep un String i el retorna ordenat ascendentment o descendentment depenent si l'usuari
//prem el botó ASC o el botó DSC
function orderList(nu){
	let arr_str = [];
	let entrada3 = document.getElementById("cadena").value;
	if (CheckComa(entrada3)){
		arr_str = entrada3.split(", ");
	} else {
		if (CheckSpace(entrada3)){
			arr_str = entrada3.split(" ");
		} else {
			arr_str = entrada3.split('');
		}
	}
	if (nu == 1){
		arr_str.sort();
	} else if (nu == 2) {
		arr_str.sort();
		arr_str.reverse();
	}
	document.getElementById("texto_ordenado").innerHTML = arr_str;
}


//Fer una funció anomenada searchList() i que retorni la posició d'un element buscat pel prompt, 
//entenc que s'ha de cercar l'element dins d'un array
//En aquest cas i per aquest exercici faré servir l'array de pokemons
let mi_arr_prueba = ["angel", "marta", "laura", "miriam", "daniel"];
let elem = document.getElementById("cerca_element").value;
document.getElementById("posicio_element").innerHTML = searchList(mi_arr_prueba, elem);

function searchList(array, elemento){
	let position_element = array.indexOf(elemento);
	if (position_element == -1){
		return "cap element trobat";
	} else {
		return `l'element cercat s'ha trobat a la posició ${position_element}. Hi pot haver més elemets amb aquest nom`;
	}
	//NO LLEGA A FUNCIONAR. DEBE DEVOLVER RESPUESTA POR PROMPT
}
//array.indexOf() retorna la 1a posició de la 1a referència trobada i si no, -1
//array.findIndex() lo mateix que indexOf()
/*

	<br><span>Entra l'element que vols cercar:</span>
	<input type="text" id="cerca_element">
	<button onclick="searchList(my_array, element)">Cerca'l</button>
	<div id="posicio_element"></div>

*/