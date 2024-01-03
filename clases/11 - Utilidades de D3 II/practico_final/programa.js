const width = 600;
const height = 400;
const margin = {
  top: 70,
  bottom: 70,
  right: 30,
  left: 30,
};

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const contenedor = svg
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`);

const contenedorEjeX = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${height - margin.top})`);

const contenedorEjeY = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

function joinDeDatos(datos) {
  d3.select("#select-input")
    .selectAll("option")
    .data(datos)
    .join("option")
    .text((d) => d.nombre);

  const maximo = Math.max(
    d3.max(datos, (d) => d.A),
    d3.max(datos, (d) => d.B)
  );
  const minimo = Math.min(
    d3.min(datos, (d) => d.A),
    d3.min(datos, (d) => d.B)
  );

  const escalaX = d3
    .scaleLinear()
    .domain([minimo - 50, maximo + 50])
    .range([0, width - margin.right - margin.left]);

  const ejeX = d3.axisBottom(escalaX);

  contenedorEjeX.call(ejeX);

  const escalaY = d3
    .scaleBand()
    .domain(datos.map((d) => d.nombre))
    .rangeRound([0, height - margin.top - margin.bottom])
    .padding(0.5);

  const ejeY = d3.axisLeft(escalaY);

  contenedorEjeY.call(ejeY);

  contenedor
    .selectAll("line")
    .data(datos, (d) => d.nombre)
    .join(
      (enter) =>
        enter
          .append("line")
          .attr("stroke", (d) => (d.A < d.B ? "blue" : "red"))
          .attr("x1", (d) => escalaX(d.A))
          .attr("x2", (d) => escalaX(d.A))
          .attr("y1", (d) => escalaY(d.nombre) + escalaY.bandwidth() / 2)
          .attr("y2", (d) => escalaY(d.nombre) + escalaY.bandwidth() / 2)
          .transition("line_enter")
          .delay(3000)
          .duration(3000)
          .attr("x2", (d) => escalaX(d.B)),
      (update) =>
        update
          .transition("line_update")
          .duration(3000)
          .attr("x1", (d) => escalaX(d.A))
          .attr("x2", (d) => escalaX(d.B))
          .attr("y1", (d) => escalaY(d.nombre) + escalaY.bandwidth() / 2)
          .attr("y2", (d) => escalaY(d.nombre) + escalaY.bandwidth() / 2)
    );

  contenedor
    .selectAll("rect")
    .data(datos, (d) => d.nombre)
    .join(
      (enter) =>
        enter
          .append("rect")
          .attr("width", 5)
          .attr("height", 5)
          .attr("fill", "transparent")
          .attr("x", (d) => escalaX(d.A) - 2.5)
          .attr("y", (d) => escalaY(d.nombre) + escalaY.bandwidth() / 2 - 2.5)
          .transition("rect_enter")
          .delay(3000)
          .duration(0)
          .attr("fill", "blue")
          .transition()
          .duration(3000)
          .attr("x", (d) => escalaX(d.B) - 2.5),
      (update) =>
        update
          .transition("rect_update")
          .duration(3000)
          .attr("x", (d) => escalaX(d.B) - 2.5)
          .attr("y", (d) => escalaY(d.nombre) + escalaY.bandwidth() / 2 - 2.5)
    );

  contenedor
    .selectAll("circle")
    .data(datos, (d) => d.nombre)
    .join(
      (enter) =>
        enter
          .append("circle")
          .attr("r", 3)
          .attr("fill", "transparent")
          .attr("cx", (d) => escalaX(d.A))
          .attr("cy", (d) => escalaY(d.nombre) + escalaY.bandwidth() / 2)
          .transition("circ_enter")
          .duration(3000)
          .attr("fill", "red"),
      (update) =>
        update
          .transition("circ_update")
          .duration(3000)
          .attr("cx", (d) => escalaX(d.A))
          .attr("cy", (d) => escalaY(d.nombre) + escalaY.bandwidth() / 2)
    );
}

d3.json("datos.json")
  .then((datos) => {
    console.log(datos);
    joinDeDatos(datos);

    d3.select("#boton").on("click", () => {
      const nombre = d3.select("#nombre-input").node().value;
      const A = parseInt(d3.select("#A-input").node().value);
      const B = parseInt(d3.select("#B-input").node().value);
      console.log({ nombre, A, B });
      datos.push({ nombre, A, B });
      joinDeDatos(datos);
    });

    d3.select("#boton-borrar").on("click", (e) => {
      const porBorrar = d3.select("#select-input").node().value;
      for (let indice = 0; indice < datos.length; indice++) {
        if (datos[indice].nombre === porBorrar) {
          datos.splice(indice, 1);
          break;
        }
      }
      console.log({ porBorrar, datos });
      joinDeDatos(datos);
    });
  })
  .catch((error) => console.log(error));
