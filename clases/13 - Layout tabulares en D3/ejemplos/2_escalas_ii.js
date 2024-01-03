const width = 1000;
const height = 1000;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const datos = [1, 2, 3, 4];

const escalaLinealParaRadio = d3
  .scaleLinear()
  .domain([0, d3.max(datos)])
  .range([0, 100]);

svg
  .append("g")
  .attr("transform", `translate(100 100)`)
  .selectAll("circle")
  .data(datos)
  .enter()
  .append("circle")
  .attr("cx", (_, i) => i * 200)
  .attr("cy", 100)
  .attr("r", escalaLinealParaRadio);

const escalaRaizParaRadio = d3
  .scalePow()
  .exponent(0.5)
  //.scaleSqrt()
  .domain([0, d3.max(datos)])
  .range([0, 100]);

svg
  .append("g")
  .attr("transform", `translate(100 350)`)
  .selectAll("circle")
  .data(datos)
  .enter()
  .append("circle")
  .attr("cx", (_, i) => i * 200)
  .attr("cy", 100)
  .attr("r", escalaRaizParaRadio);
