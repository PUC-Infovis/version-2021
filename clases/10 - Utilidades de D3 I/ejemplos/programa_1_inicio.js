const svg = d3.select("body").append("svg");

function joinDeDatos(datos) {
  svg.attr("width", 50 + datos.length * 100).attr("height", 500);

  svg
    .selectAll("rect")
    .data(datos)
    .join("rect")
    .attr("width", 50)
    .attr("fill", "magenta")
    .attr("height", (d) => d)
    .attr("x", (_, i) => 50 + i * 100);
}

const datos = [10, 20, 30, 40];
joinDeDatos(datos);
