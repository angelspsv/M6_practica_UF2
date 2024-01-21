// ////////////////////////////////////////////////////////
// EXERCICI PAS3 - SEARCH. No funciona en el fitxer principal js de la pràctica i ho vam intentar executar durant una bona estona
// per aquest motiu he creat aquest fitxer secondari només per aquest codi

let inputBuscado = document.getElementById("text_entrada");
let trobat = document.getElementById("resultats");
let dataArray = ["un", "dos", "tres", "quatre", "cinc"]; //array de prova
//dadesPokemon.map((pokemon) => pokemon.name);
   

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