const width = 600;
const height = 400;
const margin = {
  top: 30,
  bottom: 30,
  right: 30,
  left: 30,
};

const distribucionX = d3.randomNormal(400, 200);
const distribucionY = d3.randomNormal(50, 10);

const datos = d3.range(5000).map(() => ({
  x: distribucionX(),
  y: distribucionY(),
}));

const svgOriginal = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const escalaY = d3
  .scaleLinear()
  .domain([d3.min(datos, (d) => d.y) - 20, d3.max(datos, (d) => d.y) + 20])
  .range([height - margin.top - margin.bottom, 0]);

const ejeY = d3.axisLeft(escalaY);

svgOriginal
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .call(ejeY);

const escalaX = d3
  .scaleLinear()
  .domain([d3.min(datos, (d) => d.x) - 100, d3.max(datos, (d) => d.x) + 100])
  .range([0, width - margin.right - margin.left]);

const ejeX = d3.axisBottom(escalaX);

svgOriginal
  .append("g")
  .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
  .call(ejeX);

const contenedorPuntos = svgOriginal
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`);

contenedorPuntos
  .selectAll("circle")
  .data(datos)
  .join("circle")
  .attr("fill", "magenta")
  .attr("r", 2)
  .attr("cx", (d) => escalaX(d.x))
  .attr("cy", (d) => escalaY(d.y));

const radioMaximo = 8;

const hexbin = d3
  .hexbin()
  .extent([
    [0, 0],
    [width - margin.left - margin.right, height - margin.top - margin.bottom],
  ])
  .radius(radioMaximo)
  .x((d) => escalaX(d.x))
  .y((d) => escalaY(d.y));

const hexagonos = hexbin(datos);
console.log(hexagonos);

const svgAgregado = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svgAgregado
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .call(ejeY);

svgAgregado
  .append("g")
  .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
  .call(ejeX);

const contenedorHex = svgAgregado
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`);

const escalaRadio = d3
  .scaleSqrt()
  .domain([0, d3.max(hexagonos, (d) => d.length)])
  .range([0, radioMaximo]);

contenedorHex
  .selectAll("path")
  .data(hexagonos)
  .join("path")
  .attr("d", (d) => hexbin.hexagon(escalaRadio(d.length)))
  .attr("transform", (d) => `translate(${d.x},${d.y})`)
  .attr("fill", "magenta")
  .attr("stroke", "black");
