const width = 1000;
const height = 1000;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const categorias = ["A", "B", "C", "D"];

const escalaPuntual = d3
  .scalePoint()
  .domain(categorias)
  .range([0, width])
  .padding(1)
  .align(0.5);

svg
  .append("g")
  .selectAll("line")
  .data(categorias)
  .enter()
  .append("line")
  .attr("x1", escalaPuntual)
  .attr("x2", escalaPuntual)
  .attr("y1", 0)
  .attr("y2", height)
  .attr("stroke", "black")
  .attr("stroke-dasharray", 12)
  .attr("stroke-width", 3);

svg
  .append("g")
  .selectAll("text")
  .data(categorias)
  .enter()
  .append("text")
  .attr("x", escalaPuntual)
  .attr("dx", 5)
  .attr("y", 15)
  .text((d) => d);

const otrasCategorias = ["E", "F", "G", "H"];

const escalaPuntual2 = d3
  .scalePoint()
  .domain(otrasCategorias)
  .range([0, height])
  .padding(1)
  .align(0.5);

svg
  .append("g")
  .selectAll("line")
  .data(otrasCategorias)
  .enter()
  .append("line")
  .attr("y1", escalaPuntual2)
  .attr("y2", escalaPuntual2)
  .attr("x1", 0)
  .attr("x2", width)
  .attr("stroke", "black")
  .attr("stroke-dasharray", 12)
  .attr("stroke-width", 3);

svg
  .append("g")
  .selectAll("text")
  .data(otrasCategorias)
  .enter()
  .append("text")
  .attr("y", escalaPuntual2)
  .attr("dy", 15)
  .text((d) => d);

const datos = [
  { categoria1: "A", categoria2: "E", color: "blue" },
  { categoria1: "B", categoria2: "E", color: "magenta" },
  { categoria1: "C", categoria2: "E", color: "yellow" },
  { categoria1: "D", categoria2: "E", color: "green" },
  { categoria1: "A", categoria2: "F", color: "red" },
  { categoria1: "B", categoria2: "F", color: "orange" },
  { categoria1: "C", categoria2: "F", color: "yellow" },
  { categoria1: "D", categoria2: "F", color: "magenta" },
  { categoria1: "A", categoria2: "G", color: "green" },
  { categoria1: "B", categoria2: "G", color: "blue" },
  { categoria1: "C", categoria2: "G", color: "olive" },
  { categoria1: "D", categoria2: "G", color: "gray" },
  { categoria1: "A", categoria2: "H", color: "orange" },
  { categoria1: "B", categoria2: "H", color: "yellow" },
  { categoria1: "C", categoria2: "H", color: "magenta" },
  { categoria1: "D", categoria2: "H", color: "green" },
];

svg
  .append("g")
  .selectAll("circle")
  .data(datos)
  .enter()
  .append("circle")
  .attr("cx", (d) => escalaPuntual(d.categoria1))
  .attr("cy", (d) => escalaPuntual2(d.categoria2))
  .attr("r", escalaPuntual2.step() / 3)
  .attr("fill", (d) => d.color);
