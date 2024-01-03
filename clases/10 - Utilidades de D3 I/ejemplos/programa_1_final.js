const svg = d3.select("body").append("svg");

function joinDeDatos(datos) {
  svg.attr("width", 50 + datos.length * 100).attr("height", 500);

  svg
    .selectAll("rect")
    .data(datos)
    .join("rect")
    .attr("width", 50)
    .attr("fill", "magenta")
    .attr("height", (d) => d.frecuencia)
    .attr("x", (_, i) => 50 + i * 100);
}

const parseo = (d) => ({
  categoria: d.categoria,
  frecuencia: parseInt(d.frecuencia),
});

d3.csv("datos.csv", parseo)
  .then((datos) => {
    console.log(datos);
    joinDeDatos(datos);
  })
  .catch((error) => console.log(error));

// d3.json("datos.json")
//   .then((datos) => {
//     console.log(datos);
//     joinDeDatos(datos);
//   })
//   .catch((error) => console.log(error));
