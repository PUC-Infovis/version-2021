let arreglo = [];

for (let numero = 0; numero <= 20; numero += 2) {
  arreglo.push(numero);
}

for (numero of arreglo) {
  console.log(numero);
}
