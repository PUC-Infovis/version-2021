const width = 600;
const height = 400;
const margin = {
  top: 30,
  bottom: 30,
  right: 30,
  left: 30,
};

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const boton = d3.select("body").append("button").text("Agregar elemento");

const parrafo = d3.select("body").append("p");

const contenedorEjeY = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const contenedorEjeX = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`);

const contenedorBarras = svg
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`);

function joinDeDatos(datos) {
  const maximaFrecuencia = d3.max(datos, (d) => d.frecuencia);

  const escalaAltura = d3
    .scaleLinear()
    .domain([0, maximaFrecuencia])
    .range([0, height - margin.top - margin.bottom]);

  const escalaY = d3
    .scaleLinear()
    .domain([0, maximaFrecuencia])
    .range([height - margin.top - margin.bottom, 0]);

  const ejeY = d3.axisLeft(escalaY);

  contenedorEjeY
    .call(ejeY)
    .selectAll("line")
    .attr("x1", width - margin.right - margin.left)
    .attr("stroke-dasharray", "5")
    .attr("opacity", 0.5);

  const escalaX = d3
    .scaleBand()
    .domain(datos.map((d) => d.categoria))
    .rangeRound([0, width - margin.right - margin.left])
    .padding(0.5);

  const ejeX = d3.axisBottom(escalaX);

  contenedorEjeX.call(ejeX).selectAll("text").attr("font-size", 20);

  contenedorBarras
    .selectAll("rect")
    .data(datos)
    .join("rect")
    .attr("width", escalaX.bandwidth())
    .attr("fill", "magenta")
    .attr("height", (d) => escalaAltura(d.frecuencia))
    .attr("x", (d) => escalaX(d.categoria))
    .attr("y", (d) => escalaY(d.frecuencia))
    .on("mouseenter", (_, d) => {
      parrafo.text(`Categoría: ${d.categoria}, Frecuencia: ${d.frecuencia}`);
    })
    .on("mouseleave", () => {
      parrafo.text("");
    });
}

const datoNuevoRandom = (datos) => ({
  categoria: String.fromCharCode(
    datos[datos.length - 1].categoria.charCodeAt(0) + 1
  ),
  frecuencia: Math.floor(Math.random() * 800),
});

let datos;

d3.json("datos.json")
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
