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

//botó per reiniciar la pàgina amb la funcionalitat location.reload()
function ReloadWindow(){
	location.reload();
}


//Aquí faré la taula amb els 4 arrays i será l'usuari qui triarà les dades de quin array vol veure
function recogerValor() {
    let inputRadioSeleccionado = document.querySelector('input[name="grupo"]:checked');

    if (inputRadioSeleccionado) {
    	let valorSeleccionado = inputRadioSeleccionado.value;

		if (valorSeleccionado == "Pokemons"){
			printListPokes();
		} else if (valorSeleccionado == "Municipis"){
			printListMunicipis();
	  	} else if (valorSeleccionado == "Películes"){
			printListPelis();
		} else if (valorSeleccionado == "Meteorits"){
			printListMeteorits();
		}
    } else {
    	alert("Has de triar una opció");
    }
}


//funció per crear botons directament a JavaScript
function createButton(text, clickHandler) {
    let button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', clickHandler);
    return button;
}


//Visialització de l'array simplificat de pokemons amb només 3 atributs
function printListPokes() {
    let array_pokemons = ArrayEspecificDePokemons();
    let table = document.getElementById("array");

    //neteja la taula abans d'assignar les dades
    table.innerHTML = '';

    //generar la fila d'encapçalat
    let encabezado = document.createElement('tr');
    encabezado.innerHTML = `
        <td><b>Imatge</b></td>
        <td><b>Nom</b></td>
        <td class="pes"><b>Pes</b></td>
    `;
    table.appendChild(encabezado);

	// generar dos botons per ordenar la taula ascendentment o descendentment
	let ascButton = createButton("ASC", () => orderList('asc'));
    let descButton = createButton("DSC", () => orderList('desc'));
    table.parentNode.insertBefore(ascButton, table);
    table.parentNode.insertBefore(descButton, table);

    // Afegir les files, pokemon per fila
    for (let i = 0; i < array_pokemons.length; i++) {
        let pokemon = array_pokemons[i];
        let row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${pokemon.img}" alt="${pokemon.name}"></td>
            <td>${pokemon.name}</td>
            <td class="pes">${pokemon.weight}</td>
        `;
        table.appendChild(row);
    }
}



//Visialització de l'array simplificat de municipis amb només 3 atributs
function printListMunicipis() {
    let municipis_arr = CreaArrayMunicipis();
    let table = document.getElementById("array");

    //neteja la taula abans d'assignar les dades
    table.innerHTML = '';

    //generar la fila d'encapçalat
    let encabezado = document.createElement('tr');
    encabezado.innerHTML = `
        <td><b>Nom</b></td>
        <td><b>Escut</b></td>
        <td><b>Habitants</b></td>
    `;
    table.appendChild(encabezado);

	// generar dos botons per ordenar la taula ascendentment o descendentment
	let ascButton = createButton("ASC", () => orderList('asc'));
    let descButton = createButton("DSC", () => orderList('desc'));
    table.parentNode.insertBefore(ascButton, table);
    table.parentNode.insertBefore(descButton, table);

    // Afegir les files, municipi per fila
    for (let i = 0; i < municipis_arr.length; i++) {
        let municipi = municipis_arr[i];
        let row = document.createElement('tr');
        row.innerHTML = `
			<td>${municipi.nom}</td>
			<td><img src="${municipi.escut}" alt="${municipi.nom}"></td>
            <td>${municipi.habitants}</td>
        `;
        table.appendChild(row);
    }
}



//Visialització de l'array simplificat de pel·lícules amb només 3 atributs
function printListPelis(){
	let pelicules_arr = CreaArrayPelis();
	let table = document.getElementById("array");

	//neteja la taula abans d'assignar les dades
	table.innerHTML = '';

	//generar la fila d'encapçalat
	let encabezado = document.createElement('tr');
	encabezado.innerHTML = `
		<td><b>Nom</b></td>
		<td><b>Any</b></td>
		<td><b>Caratula</b></td>
	`;
	table.appendChild(encabezado);

	// generar dos botons per ordenar la taula ascendentment o descendentment
	let ascButton = createButton("ASC", () => orderList('asc'));
    let descButton = createButton("DSC", () => orderList('desc'));
    table.parentNode.insertBefore(ascButton, table);
    table.parentNode.insertBefore(descButton, table);

	// Afegir les files, peli per fila
    for (let i = 0; i < pelicules_arr.length; i++) {
        let peli = pelicules_arr[i];
        let row = document.createElement('tr');
        row.innerHTML = `
			<td>${peli.nom}</td>
            <td>${peli.any}</td>
			<td><img src="${peli.caratula}" alt="${peli.nom}"></td>
        `;
        table.appendChild(row);
    }
}


//creació de l'array de municipis amb només 3 atributs
function CreaArrayMunicipis(){
	let municipi_nom = dadesMunicipis.map((elements) => elements.municipi_nom);
	let municipi_escut = dadesMunicipis.map((elements) => elements.municipi_escut);
	let municipi_habitants = dadesMunicipis.map((elements) => elements.nombre_habitants);

	//ara faré un array d'objectes amb els tres atributs
	let arr_Municipis = [];
	for(let i=0; i<dadesMunicipis.length; i++){
		let data_municipi = {
			nom: municipi_nom[i],
			escut: municipi_escut[i],
			habitants: municipi_habitants[i]
		}
		arr_Municipis.push(data_municipi);
	}
	return arr_Municipis;
}


//creació de l'array de pel·lícules
function CreaArrayPelis(){
	let peli_nom = dadesPelicules.map((movies) => movies.title);
	let peli_any = dadesPelicules.map((movies) => movies.year);
	let peli_imatge = dadesPelicules.map((movies) => movies.url);

	//ara faré un array d'objectes de pelis amb tres atributs
	let arr_Pelis = [];
	for(let i=0; i<dadesPelicules.length; i++){
		let data_pelis = {
			nom: peli_nom[i],
			any: peli_any[i],
			caratula: peli_imatge[i]
		}
		arr_Pelis.push(data_pelis);
	}
	return arr_Pelis;
}


//creació de l'array de meteorits
function CreaArrayMeteorits(){
	let arrayMeteorits = dadesMeteorits.map(pedra => ({
		name: pedra.name,
		id: pedra.id,
		mass: pedra.mass
	}));
	return arrayMeteorits;
}


//Visialització de l'array simplificat de meteorits amb només 3 atributs
function printListMeteorits(){
	let arrayDeMeteorits = CreaArrayMeteorits();
	let table = document.getElementById("array");

	//netejar la taula abans d'assignar les dades
	table.innerHTML = '';

	//generar la fila d'encapçalat
	let encap = document.createElement('tr');
	encap.innerHTML = `
		<td><b>Nom</b></td>
        <td><b>id</b></td>
        <td><b>Pes</b></td>
	`;
	table.appendChild(encap);

	// generar dos botons per ordenar la taula ascendentment o descendentment
	let ascButton = createButton("ASC", () => orderList('asc'));
    let descButton = createButton("DSC", () => orderList('desc'));
    table.parentNode.insertBefore(ascButton, table);
    table.parentNode.insertBefore(descButton, table);

	// Afegir les files, meteorit per fila
    for (let i=0; i<arrayDeMeteorits.length; i++) {
        let pedra = arrayDeMeteorits[i];
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${pedra.name}</td>
            <td>${pedra.id}</td>
            <td>${pedra.mass}</td>
        `;
        table.appendChild(row);
    }
}






//NOMÉS PER POKEMONS
//funció que rep un String o 'asc' o 'desc' i crida una des les funcions per ordenar ascendentment o descendentment l'array de pokemons segons el seu índex
function orderList(str_entrada){
	if (str_entrada == "asc"){
		OrdenaASC();
	} else if (str_entrada == "desc") {
		OrdenaDSC();
	}
}


//funció que ordena descendentment el índex dels pokemons
function OrdenaDSC(){
	let contenidor = document.getElementById("mostra_text");
	for(let i=dadesPokemon.length-1; i>=0; i--){
		let linia = document.createElement("p");
		linia.textContent = `${i}  ${dadesPokemon[i].name}`;
		contenidor.appendChild(linia);
	}
}


//funció que ordena el índex dels pokemons de forma ascendent
function OrdenaASC(){
	let container = document.getElementById("mostra_text");
	for(let i=0; i<dadesPokemon.length; i++){
		let linea = document.createElement("p");
		linea.textContent = `${i}  ${dadesPokemon[i].name}`;
		container.appendChild(linea);
	}
}


//funció que calcula la mitjana del pes dels pokemons
function MitjanaPesPokemons(){
	let arr_poke_pes = dadesPokemon.map((pokemon) => pokemon.weight);
	let poke_pes_filtrat = FiltraPeso(arr_poke_pes);
	
	let total_pes = (Suma(poke_pes_filtrat)/(arr_poke_pes.length)).toFixed(2);
	document.getElementById("mostra_text").innerHTML = `El pes mitja és: ${total_pes} kg.`;
}


//Fer una funció anomenada searchList() i que retorni la posició d'un element buscat des del prompt; 
//entenc que s'ha de cercar l'element dins d'un array
//En aquest cas faré servir l'array de pokemons
function searchList(array_entrada, elemento_entrada){
	//toLowerCase() totes les lletres de l'array i de l'element cercat
	let array = array_entrada.map((poke) => poke.toLowerCase());
	let elemento = elemento_entrada.toLowerCase(); 
	
	//faig servir el mètode indexOf() per cercar i retornar l'index d'un element dins de l'array
	let position_element = array.indexOf(elemento);
	if (position_element == -1){
		return "cap element trobat";
	} else {
		return `l'element cercat s'ha trobat a la posició ${position_element}. Hi pot haver més elemets amb aquest nom`;
	}
}


//funció que rep el valor des del prompt, crea l'array de pokemons, crida la funció searchList() i finalment mostra el resultat amb un alert
function SearchFunction(){
	let elem = prompt("Entra el nom de pokemon que vols cercar:")
	let poke_names = [];
	poke_names = dadesPokemon.map((pokemon) => pokemon.name);
	let temp = searchList(poke_names, elem);
	alert(temp);
}



//funció que suma tots el valors d'un array i retorna la suma total
function Suma(arr){
	let suma = 0;
	for(let i=0; i<arr.length; i++){
		suma += parseInt(arr[i]);
	}
	return suma;
}


//funció que filtra el pes de cada pokemon i retorna un array amb el pes i sense l'afegit de "kg"
function FiltraPeso(arr){
    let str = "";
	for(let i=0; i<arr.length; i++){
    	let temp = "";
    	str = arr[i];
        for(let j=0; j<str.length; j++){
    		if(str.charAt(j) == " "){
            	break;
            } else {
            	temp += str.charAt(j);
            }
        }
        arr[i] = temp;
	}
    return arr;
}



//En l'exercici 4 del PAS 1 es demana la creació d'un array multidimensional que emmagatzemes per cada pokemon: 
//el seu nom, la imatge i el pes (kg), però sense les lletres 'kg'.
//faré els tres arrays per separat perquè he de modificar el valor de weight
function ArrayMultidimensional(){
	let myArrMultidimensional = ArrayMultidimensionalPokemons();
	MuestraArrayPokemon(myArrMultidimensional);
}


//Creació d'un array multidimensional de pokemons amb retorn
function ArrayMultidimensionalPokemons(){
	let poke_names = dadesPokemon.map((pokemon) => pokemon.name);
	let poke_fotos = dadesPokemon.map((pokemon) => pokemon.img);
	let poke_peso = dadesPokemon.map((pokemon) => pokemon.weight);

	//obtenir un array sense 'kg' del pes
	let poke_peso_filtrat = FiltraPeso(poke_peso);
	
	//fer el nou array multidimensional
	let arr_poke_multidimensional = makeArr(poke_names, poke_peso_filtrat, poke_fotos);
	return arr_poke_multidimensional;
}



//una funció bàsica que rep 3 arrays i retorna un array d'arrays
function makeArr(arr1, arr2, arr3){
	let arr_de_arr = [];
	for(let i=0; i<arr1.length; i++){
    	arr_de_arr.push([arr1[i], arr2[i], arr3[i]]);
	}
    return arr_de_arr;
}



//funció específica que mostra en el DOM el contingut de l'array multidimensional creat per l'array de Pokemons
function MuestraArrayPokemon(arr){
	let container = document.getElementById("mostra_arr_multi");
	for(let i=0; i<arr.length; i++){
		let pokemon = arr[i];

		//descomposició de cada array en diferents elements
		let nom = pokemon[0];
		let pes = pokemon[1];
		let imatge = pokemon[2];

		let pokemonDiv = document.createElement('div');
		pokemonDiv.innerHTML = `
			<h3>${nom}</h3>
			<p>Pes: ${pes}</p>
			<img src="${imatge}" alt="${nom}">
		`;
		container.appendChild(pokemonDiv);
	}
}




// PAS 1, exercici 5
//fer una funció anomenada calcMitjana() que calculi la mitjana d'un valor numèric fins dos decimals i mostri el resultat per alert()
function calcMitjana(num){
	let temp1 = parseInt(num);
	let num_mitjana = (temp1/2).toFixed(2);
	return num_mitjana;
}




//PAS 1, exercici 6.
//fer una funció que mostri en el DOM una llista dels pokemons emmagatzemats en l'array amb nom, imatge i pes.
function printList() {
    let array_pokemons = ArrayEspecificDePokemons();
    let table = document.getElementById("poke_table");

    //neteja la taula abans d'assignar les dades
    table.innerHTML = '';

    //generar la fila d'encapçalat
    let encabezado = document.createElement('tr');
    encabezado.innerHTML = `
        <td><b>Imatge</b></td>
        <td><b>Nom</b></td>
        <td class="pes"><b>Pes</b></td>
    `;
    table.appendChild(encabezado);

    //Afegir les files, un pokemon per fila
    for (let i = 0; i < array_pokemons.length; i++) {
        let pokemon = array_pokemons[i];
        let row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${pokemon.img}" alt="${pokemon.name}"></td>
            <td>${pokemon.name}</td>
            <td class="pes">${pokemon.weight}</td>
        `;
        table.appendChild(row);
    }
}




//La funció retornarà un array multidimensional dels pokemons amb imatge, pes i el nom.
function ArrayEspecificDePokemons(){
	let pokemons_images = dadesPokemon.map((pokemon) => pokemon.img);
	let pokemons_names = dadesPokemon.map((pokemon) => pokemon.name);
	let pokemons_weight = dadesPokemon.map((pokemon) => pokemon.weight);

	//suprimeix 'kg' del valor del pes de cada pokemon
	let pes_pokes_filtrat = filtraPes(pokemons_weight);

	//fem l'array multidimensional amb els atributs de pes, nom i imatge per cada pokemon
	let arr_multi = [];
	for(let i=0; i<dadesPokemon.length; i++){
		let poke_data = {
			img: pokemons_images[i],
			name: pokemons_names[i],
			weight: pes_pokes_filtrat[i]
		}
		arr_multi.push(poke_data);
	}
	return arr_multi;
}

//funció que rep un array i procesa tot els seus valors suprimint el contingut trobat després de l'espai en blanc
function filtraPes(arr_text){
	for(let i=0; i<arr_text.length; i++){
		let temp = arr_text[i];
		let espai = FindSpace(temp);
		let result = temp.slice(0, espai);
		arr_text[i] = result;
	}
	return arr_text;
}

//funció que recorre un text en la cerca d'un espai en blanc i retorna la seva posició
function FindSpace(text){
	let num = text.length;
	for(let i=0; i<text.length; i++){
		if(text.charAt(i) == " "){
			return num = i;
		}
	}
	return num;
}



// ///////////////////////////////
// ////       PAS 2           ////
// ///////////////////////////////
//Crear un gràfic amb la llibreria chart.js
//definim les dades del gràfic
//gràfic d'exemple
document.addEventListener('DOMContentLoaded', function(){
	const data = {
		labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
		datasets: [{
			label: 'My First Dataset',
			backgroundColor: [
				'rgb(255, 99, 132)',
      			'rgb(7, 203, 138)',
      			'rgb(255, 205, 86)',
      			'rgb(201, 203, 207)',
      			'rgb(54, 162, 235)'
			],
			borderColor: 'rgba(0, 0, 0, 0,5)',
            borderWidth: 1,
			data: [11, 16, 7, 3, 14]
		}]
	};

	//configuració del gràfic
	const config = {
		type: 'polarArea',
		data: data,
		options: {}
	};

	//creació del gràfic
	new Chart(document.getElementById('myChart'), config);
});




//PAS 2. Punt 4, 5, 6, 7 i 8:
//creació de 4 arrays: arrayLabels, arrayDadesGraf, backgroundColor, borderColor

function MostraGrafic(){
	let arrayLabelsPoke = ["Grass", "Poison", "Fire", "Flying", "Water", "Bug", "Normal", "Electric", "Ground", "Fighting", "Psychic", "Rock", "Ice", "Ghost", "Dragon"];
	let arrayDadesGrafPoke = [14, 33, 12, 19, 32, 12, 24, 9, 14, 8, 14, 11, 5, 3, 3];
	//faig servir una funció per fer colors random
	let borderColorPokes = RandomColors(arrayLabelsPoke.length);
	//faig servir una funció per fer els colors rgba() des de rgb()
	let backgroundColorPokes = borderColorPokes.map(RGBtoRGBA);
	let lloc = 'myChart1';
	//cridem la funció amb aquests paràmetres per crear el gràfic
	FesGrafic(arrayLabelsPoke, backgroundColorPokes, borderColorPokes, arrayDadesGrafPoke, lloc);
}


function FesGrafic(labels, backgroundColor, borderColor, data, lloc){
	//Dades del gràfic de pokemons
	const data1 = {
		labels,
		datasets: [{
			label: 'Gràfic de dades',
			backgroundColor,
			borderColor,
			borderWidth: 1,
			data,
		}]
	};

	//configuració del gràfic de pokemons
	const config = {
        type: 'polarArea',
        data: data1,
        options: {}
    };

	//creació del gràfic
	new Chart(document.getElementById(lloc), config);
};
document.addEventListener('DOMContentLoaded', function(){});



//Ara faré el gràfic de gènere de pel·lícules
function MostraGraficPelis(){
	let arrayLabelsPelis = ["Drama", "Crime", "Action", "Thriller", "Biography", "History", "Adventure", "Fantasy", "Western", "Romance", "Sci-Fi", "Mystery", "Comedy", "War", "Family", "Animation", "Musical", "Music", "Horror", "Film-Noir", "Sport"];
	let arrayDadesGrafPelis = [185, 53, 39, 60, 27, 15, 57, 28, 8, 27, 32, 33, 44, 28, 25, 22, 5, 8, 4, 6, 10];
	let borderColorPelis = RandomColors(arrayLabelsPelis.length);
	let backgroundColorPelis = borderColorPelis.map(RGBtoRGBA);
	let llocPelis = "myChart2";
	//cridem la funció amb aquests paràmetres per crear el gràfic
	FesGrafic(arrayLabelsPelis, backgroundColorPelis, borderColorPelis, arrayDadesGrafPelis, llocPelis);
}



//funció que genera colors random del tipus rgb()
function RandomColors(num){
	let arrColors = [];
    let r;
    let g;
    let b;
	let resultat = "";
	for (let i=0; i<num; i++) {
    	r = (Math.random() * 255).toFixed(0);
		g = (Math.random() * 255).toFixed(0);
		b = (Math.random() * 255).toFixed(0);
        resultat = `rgb(${r}, ${g}, ${b})`;
		arrColors.push(resultat);
	}
    return arrColors;
}



//funció que converteix un color rgb() a rgba() amb opacitat de 0.2
function RGBtoRGBA(color){
	let color_tmp = color.slice(0, (color.length - 1));
	let new_color = color_tmp + ", " + 0.2 + ")";
	return new_color;
}








// ///////////////////////////////
// ////       PAS 3           ////
// ///////////////////////////////
// ATENCIÓ, L'APARTAT forEach ESTÀ COMENTAT PER NO ENTRAR EN CONTRADICCIÓ AMB EL CODI ORIGINAL DEL PAS1
// Modificar les funcions per a que funcionessin en arrays multidimensionals
//	En el meu codi no tinc aquesta forma: 
//" for(let i=0; i<dades.length; i++){ ", però si una semblant: " for(let i=0; i<dadesPokemon.length; i++){ ".

/*
Codi original de la funció OrdenaASC() amb el bucle for normal:

//funció que ordena els noms dels pokemons de forma ascendent
function OrdenaASC(){
	let container = document.getElementById("mostra_text");
	for(let i=0; i<dadesPokemon.length; i++){
		let linea = document.createElement("p");
		linea.textContent = `${i}  ${dadesPokemon[i].name}`;
		container.appendChild(linea);
	}
}
*/
//Ara intentré substituir el bucle for normal per un forEach:
/*
function OrdenaASC(){
	let container = document.getElementById("mostra_text");

	dadesPokemon.forEach((element, index) => {
		let linea = document.createElement("p");
		linea.textContent = `${index}  ${element.name}`;
		container.appendChild(linea);
	});
}
*/
/*
// ----------------- Ara la funció OrdenaDSC() que té un bucle for amb l'expressió semblant de i<dades.length ---------

//funció original que ordena descendentment els noms dels pokemons (PAS1)
function OrdenaDSC(){
	let contenidor = document.getElementById("mostra_text");
	for(let i=dadesPokemon.length-1; i>=0; i--){
		let linia = document.createElement("p");
		linia.textContent = `${i}  ${dadesPokemon[i].name}`;
		contenidor.appendChild(linia);
	}
}

// ---> Ara faré el pas del for normal al forEach():
*/
/*
function OrdenaDSC(){
	let contenidor = document.getElementById("mostra_text");
	dadesPokemon.reverse().forEach((element, index) => {
		let linia = document.createElement("p");
		let index_invertit = dadesPokemon.length - index - 1;
		linia.textContent = `${index_invertit}  ${element.name}`;
		contenidor.appendChild(linia);
	});
}
*/

//P.S.: AMBDUES FUNCIONS AMB EL NOU BUCLE forEach SI ÉS DESCOMENTEN FUNCIONEN.






// Adaptació de la funció Search 
// en el meu cas es tracta de les funcions
// searchList() i SearchFunction()
// encara que aquí no funciona, en el fitxer extern (pas3search.js) sí funciona

let inputBuscado = document.getElementById("text_entrada");
let trobat = document.getElementById("resultats");
let dataArray = ["un", "dos", "tres", "quatre", "cinc"];	//array de prova

inputBuscado.addEventListener("input", (e) => {
    let buscado = e.target.value.toLowerCase();
    let arr_filtrat = dataArray.filter(item => item.toLowerCase().includes(buscado));

    mostraResultats(arr_filtrat);
});

function mostraResultats(resultados) {
    trobat.innerHTML = "";
    resultados.forEach(element => {
        let li = document.createElement("li");
        li.textContent = element;
        trobat.appendChild(li);

        console.log(element);
    });
}







// //////////////////////////////////////////
// //////////      PAS 4           //////////
// //////////////////////////////////////////

// Modificar l'array multidimensional de pokemons de l'exercici 4 del PAS1
// crear un array d'objectes de pokemon amb els atributs de nom, pes i imatge
// Quan s'executi el resultat visual serà el mateix que amb l'array multidimensional

//En l'exercici 4 del PAS1 es demana la creació d'un array multidimensional que emmagatzemes per cada pokemon: 
//el seu nom, la imatge i el pes (kg), però sense les lletres 'kg'.
//faré els tres arrays per separat perquè he de modificar el valor de weight
function ArrayObjectes(){
	let myArrDeObjectes = ArrayObjectesPokemons();
	MuestraObjetoPokemon(myArrDeObjectes);
}


//Creació d'un array de objectes de pokemon amb retorn
function ArrayObjectesPokemons(){
	let poke_names = dadesPokemon.map((pokemon) => pokemon.name);
	let poke_fotos = dadesPokemon.map((pokemon) => pokemon.img);
	let poke_peso = dadesPokemon.map((pokemon) => pokemon.weight);

	let poke_peso_filtrat = FiltraPeso(poke_peso);
	
	let arr_poke_multidimensional = [];
	for(let i=0; i<dadesPokemon.length; i++){
		let poke_data_temp = {
			name: poke_names[i],
			img: poke_fotos[i],
			weight: poke_peso_filtrat[i]
		}
		arr_poke_multidimensional.push(poke_data_temp);
	}
	return arr_poke_multidimensional;
}



//funció específica que mostra en el DOM el contingut de l'array d'objectes de Pokemons
function MuestraObjetoPokemon(arr){
	let table = document.getElementById("mostra_arr_obj");
	
	//neteja la taula abans d'assignar les dades
    table.innerHTML = '';

	//generar la fila d'encapçalat
    let encabezado = document.createElement('tr');
    encabezado.innerHTML = `
        <td><b>Nom</b></td>
        <td><b>Imatge</b></td>
        <td class="pes"><b>Pes</b></td>
    `;
    table.appendChild(encabezado);


    // Afegir les files, pokemon per fila
    for (let i = 0; i < arr.length; i++) {
        let pokemon = arr[i];
        let row = document.createElement('tr');
        row.innerHTML = `
			<td>${pokemon.name}</td>
			<td><img src="${pokemon.img}" alt="${pokemon.name}"></td>
            <td class="pes">${pokemon.weight}</td>
        `;
        table.appendChild(row);
    }
}













// //////////////////////////////////////////////////////
//funcions i mètodes que vaig crear per aquesta pràctica, 
//però per no entendre bé l'anunciat he hagut de refer exercicis del PAS1 
//i de moment no calen
/*


function CalculaMitjana(){
	let numero_entrat = document.getElementById("numero_entrat").value;
	let temp2 = calcMitjana(numero_entrat);
	alert(temp2);
}

//funció que cerca un fragment dins d'un array
function CercaPokemon(){
	let nom_poke = prompt("Entra el nom del pokemon que estàs cercant:");
	//treballar amb el nom del pokemon i l'array de pokemons que ja tinc
	//en l'array de pokemons el nom te aquesta estructura: 'Aaaaaaaa'
	let lletra = nom_poke.charAt(0).toUpperCase();
	let temp = (nom_poke.toLowerCase()).slice(1);
	let nom_cercat = lletra + temp;
	document.getElementById("mostra_text").innerHTML = CercaEnArray(nom_cercat);
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
function OrdenaDSCmots(){
	let entrada2 = document.getElementById("espai_per_text").value;
	let arr_tmp = TextToArray(entrada2);
	document.getElementById("mostra_mots_ordenats").innerHTML = arr_tmp.reverse();
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
function OrdenarLista(nu){
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


//Després vaig pensar en una altra manera per filtrar l'array de pes dels pokemons per treure el 'kg' de tots els valors
		
		//funció que rep un array i procesa tot els seus valors suprimint el contingut trobat després de l'espai en blanc
		function filtraPes(arr_text){
			for(let i=0; i<arr_text.length; i++){
				let temp = arr_text[i];
				let espai = FindSpace(temp);
    			let result = temp.slice(0, espai);
				arr_text[i] = result;
			}
    		return arr_text;
		}

		//funció que recorre un text en la cerca d'un espai en blanc i retorna la seva posició
		function FindSpace(text){
			let num = text.length;
    		for(let i=0; i<text.length; i++){
				if(text.charAt(i) == " "){
    				return num = i;
    			}
			}
    		return num;
		}
*/