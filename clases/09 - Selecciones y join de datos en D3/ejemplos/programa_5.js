const svg = d3.select("body").append("svg");

function joinDeDatos(datos) {
  svg.attr("width", 50 + datos.length * 100).attr("height", 500);

  const update = svg.selectAll("rect").data(datos);

  update.exit().remove();

  const enter = update.enter().append("rect");

  update
    .merge(enter)
    .attr("width", 50)
    .attr("fill", "magenta")
    .attr("height", (d) => d)
    .attr("x", (_, i) => 50 + i * 100);
}

const datos = [10, 20, 30, 40];
joinDeDatos(datos);

const boton = document.getElementById("boton");
boton.addEventListener("click", () => {
  const ultimo = datos.pop();
  datos.unshift(ultimo);
  // datos.push(datos[datos.length - 1] + 10);
  joinDeDatos(datos);
});
