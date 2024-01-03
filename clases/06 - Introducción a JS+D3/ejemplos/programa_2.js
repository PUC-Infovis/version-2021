const parrafo = document.createElement("p");
const texto = document.createTextNode("¡Soy texto!");
parrafo.appendChild(texto);

const elementoRaiz = document.getElementById("raiz");
elementoRaiz.appendChild(parrafo);
