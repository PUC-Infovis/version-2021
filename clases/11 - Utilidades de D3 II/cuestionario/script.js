const width = 600;
const height = 600;
const margin = {
  top: 70,
  bottom: 70,
  right: 30,
  left: 30,
};

const mitadX = (width - margin.left - margin.right) / 2;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const contenedorLineas = svg
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`);

const contenedorEje1 = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const contenedorEje2 = svg
  .append("g")
  .attr("transform", `translate(${margin.left + mitadX}, ${margin.top})`);

const contenedorEje3 = svg
  .append("g")
  .attr("transform", `translate(${width - margin.right}, ${margin.top})`);

const boton = d3.select("body").append("button").text("Agregar elemento");

const parrafo = d3.select("body").append("p");

function joinDeDatos(datos) {
  const maxAtr1 = d3.max(datos, (d) => d.atributo1);
  const maxAtr2 = d3.max(datos, (d) => d.atributo2);
  const maxAtr3 = d3.max(datos, (d) => d.atributo3);

  const escalaEje1 = d3
    .scaleLinear()
    .domain([0, maxAtr1])
    .range([height - margin.top - margin.bottom, 0]);

  const escalaEje2 = d3
    .scaleLinear()
    .domain([0, maxAtr2])
    .range([height - margin.top - margin.bottom, 0]);

  const escalaEje3 = d3
    .scaleLinear()
    .domain([0, maxAtr3])
    .range([height - margin.top - margin.bottom, 0]);

  const generadorDeLineas = (d) =>
    `M 0 ${escalaEje1(d.atributo1)} L ${mitadX} ${escalaEje2(d.atributo2)} L ${
      mitadX * 2
    } ${escalaEje3(d.atributo3)}`;

  const eje1 = d3.axisLeft(escalaEje1);
  contenedorEje1.transition().duration(1000).call(eje1);

  const eje2 = d3.axisLeft(escalaEje2);
  contenedorEje2.transition().duration(1000).call(eje2);

  const eje3 = d3.axisLeft(escalaEje3);
  contenedorEje3.transition().duration(1000).call(eje3);

  contenedorLineas
    .selectAll("path")
    .data(datos, (d) => d.id)
    .join(
      (enter) =>
        enter
          .append("path")
          .attr("stroke", "magenta")
          .attr("fill", "none")
          .attr("stroke-width", 0)
          .attr("d", generadorDeLineas)
          .transition("enter")
          .duration(1000)
          .attr("stroke-width", 3)
          .selection(),
      (update) =>
        update
          .transition("update")
          .duration(1000)
          .attr("d", generadorDeLineas)
          .selection(),
      (exit) => exit.transition().duration(500).attr("stroke-width", 0).remove()
    )
    .on("mouseenter", (_, d) => {
      parrafo.text(
        `ID: ${d.id}, Atributo1: ${d.atributo1}, Atributo2: ${d.atributo2}, Atributo3: ${d.atributo3}`
      );
    })
    .on("mouseleave", () => {
      parrafo.text("");
    })
    .on("click", (_, d) => {
      datos.splice(datos.indexOf(d), 1);
      joinDeDatos(datos);
    });
}

const datoNuevoRandom = (datos) => ({
  id: d3.max(datos, (d) => d.id) + 1,
  atributo1: Math.floor(Math.random() * 700),
  atributo2: Math.floor(Math.random() * 25),
  atributo3: Math.floor(Math.random() * 600),
});

let datos;

d3.json(
  "https://raw.githubusercontent.com/PUC-Infovis/syllabus-2021/main/cuestionario-11/datos.json"
)
  .then((datosCargados) => {
    console.log(datosCargados);
    datos = datosCargados;
    joinDeDatos(datos);
    boton.on("click", () => {
      datos.push(datoNuevoRandom(datos));
      joinDeDatos(datos);
    });
  })
  .catch((error) => console.log(error));
