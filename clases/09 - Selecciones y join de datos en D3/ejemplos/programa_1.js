const seleccionDeListas = d3.selectAll("ul");

seleccionDeListas.append("li").style("color", "red").text("Primer ítem");

seleccionDeListas.append("li").style("color", "green").text("Segundo ítem");

seleccionDeListas.append("li").style("color", "blue").text("Tercer ítem");

console.log(d3.selectAll("ul").select("li"));

console.log(d3.selectAll("ul").selectAll("li"));

// console.log(seleccionDeListas.append("li"));

// d3.selectAll("ul").selectAll("li").text((d, i) => i) // ¿qué ocurre al ejecutar esto?
