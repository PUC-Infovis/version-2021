const width = 600;
const height = 400;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

function joinDeDatos(datos) {
  const maximaFrecuencia = d3.max(datos, (d) => d.frecuencia);
  // const minmoFrecuencia = d3.min(datos, (d) => d.frecuencia);
  // const rangoFrecuencia = d3.extent(datos, (d) => d.frecuencia);

  const escalaAltura = d3
    .scaleLinear()
    .domain([0, maximaFrecuencia])
    .range([0, height]);

  const escalaY = d3
    .scaleLinear()
    .domain([0, maximaFrecuencia])
    .range([height, 0]);

  const escalaX = d3
    .scaleBand()
    .domain(datos.map((d) => d.categoria))
    .rangeRound([0, width])
    .padding(0.5);

  svg
    .selectAll("rect")
    .data(datos)
    .join("rect")
    .attr("width", escalaX.bandwidth())
    .attr("fill", "magenta")
    .attr("height", (d) => escalaAltura(d.frecuencia))
    .attr("x", (d) => escalaX(d.categoria))
    .attr("y", (d) => escalaY(d.frecuencia));
}

d3.json("datos.json")
  .then((datos) => {
    console.log(datos);
    joinDeDatos(datos);
  })
  .catch((error) => console.log(error));
