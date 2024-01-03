const margenVertical = 30;
const margenHorizontal = 30;
const anchoTotalBarras = 150;
const alturaTotalBarras = 150;
const alturaDispersion = 300;
const anchoDispersion = 500;

const width = 4 * margenHorizontal + anchoTotalBarras + anchoDispersion;
const height = 4 * margenVertical + alturaDispersion + alturaTotalBarras;

const distribucionX = d3.randomNormal(400, 200);
const distribucionY = d3.randomNormal(50, 10);

const datos = d3.range(100).map(() => ({
  x: distribucionX(),
  y: distribucionY(),
}));

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const xDispersion = 3 * margenHorizontal + anchoTotalBarras;
const yDispersion = margenVertical;

const contenedorDispersion = svg
  .append("g")
  .attr("transform", `translate(${xDispersion} ${yDispersion})`);

const escalaY = d3
  .scaleLinear()
  .domain([d3.min(datos, (d) => d.y) - 20, d3.max(datos, (d) => d.y) + 20])
  .range([alturaDispersion, 0]);

const ejeY = d3.axisLeft(escalaY);

svg
  .append("g")
  .attr("transform", `translate(${xDispersion}, ${yDispersion})`)
  .call(ejeY);

const escalaX = d3
  .scaleLinear()
  .domain([d3.min(datos, (d) => d.x) - 100, d3.max(datos, (d) => d.x) + 100])
  .range([0, anchoDispersion]);

const ejeX = d3.axisBottom(escalaX);

svg
  .append("g")
  .attr(
    "transform",
    `translate(${xDispersion}, ${yDispersion + alturaDispersion})`
  )
  .call(ejeX);

contenedorDispersion
  .selectAll("circle")
  .data(datos)
  .join("circle")
  .attr("fill", "magenta")
  .attr("r", 2)
  .attr("cx", (d) => escalaX(d.x))
  .attr("cy", (d) => escalaY(d.y));

const segmentos = 10;

const dividirDominio = (dominio) => {
  const extension = dominio[1] - dominio[0];
  return d3
    .range(segmentos)
    .map((_, i) => dominio[0] + (i * extension) / segmentos);
};

const xBin = d3
  .bin()
  .thresholds(dividirDominio(d3.extent(datos, (d) => d.x)))
  .value((d) => d.x);
const gruposX = xBin(datos);

console.log(gruposX);

const yBottomBar = 3 * margenVertical + alturaDispersion;
const contenedorBarrasVertical = svg
  .append("g")
  .attr("transform", `translate(${xDispersion} ${yBottomBar})`);

const escalaAltura = d3
  .scaleLinear()
  .domain([0, d3.max(gruposX, (d) => d.length)])
  .range([0, alturaTotalBarras]);
const ejeAltura = d3.axisLeft(escalaAltura);

svg
  .append("g")
  .attr("transform", `translate(${xDispersion}, ${yBottomBar})`)
  .call(ejeAltura);

const ancho = escalaX(gruposX[1].x1) - escalaX(gruposX[1].x0);

contenedorBarrasVertical
  .selectAll("rect")
  .data(gruposX)
  .join("rect")
  .attr("width", (d) => escalaX(d.x1) - escalaX(d.x0))
  .attr("height", (d) => escalaAltura(d.length))
  .attr("x", (d) => escalaX(d.x0))
  .attr("stroke", "white")
  .attr("fill", "magenta");

const yBin = d3
  .bin()
  .thresholds(dividirDominio(d3.extent(datos, (d) => d.y)))
  .value((d) => d.y);
const gruposY = yBin(datos);
console.log(gruposY);

// const yBin = d3
//   .bin()
//   .domain(escalaY.domain())
//   .value((d) => d.y);
// const gruposY = yBin(datos);
// console.log(gruposY);

const xLeftBar = margenHorizontal;
const contenedorBarrasHorizontal = svg
  .append("g")
  .attr("transform", `translate(${xLeftBar} ${yDispersion})`);

const escalaAncho = d3
  .scaleLinear()
  .domain([0, d3.max(gruposY, (d) => d.length)])
  .range([0, anchoTotalBarras]);
const escalaPosX = d3
  .scaleLinear()
  .domain([0, d3.max(gruposY, (d) => d.length)])
  .range([anchoTotalBarras, 0]);

const ejeAncho = d3.axisBottom(escalaPosX);

svg
  .append("g")
  .attr(
    "transform",
    `translate(${xLeftBar}, ${yDispersion + alturaDispersion})`
  )
  .call(ejeAncho);

contenedorBarrasHorizontal
  .selectAll("rect")
  .data(gruposY)
  .join("rect")
  .attr("width", (d) => escalaAncho(d.length))
  .attr("x", (d) => escalaPosX(d.length))
  .attr("y", (d) => escalaY(d.x1))
  .attr("height", (d) => escalaY(d.x0) - escalaY(d.x1))
  .attr("stroke", "white")
  .attr("fill", "magenta");
