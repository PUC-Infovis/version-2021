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

  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
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

  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
    .call(ejeX)
    .selectAll("text")
    .attr("font-size", 20);

  contenedor
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
