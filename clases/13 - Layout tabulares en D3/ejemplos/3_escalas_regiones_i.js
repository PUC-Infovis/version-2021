const width = 1000;
const height = 1000;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const categorias = ["A", "B", "C", "D"];

const escalaRegiones = d3
  .scaleBand()
  .domain(categorias)
  .range([0, width])
  .paddingInner(0.5)
  .paddingOuter(0.5)
  .align(0.5);

svg
  .append("g")
  .selectAll("rect")
  .data(categorias)
  .enter()
  .append("rect")
  .attr("x", escalaRegiones)
  .attr("height", height)
  .attr("width", escalaRegiones.bandwidth())
  .attr("fill", "blue")
  .attr("opacity", 0.3);

svg
  .append("g")
  .selectAll("rect")
  .data(categorias)
  .enter()
  .append("rect")
  .attr("x", escalaRegiones)
  .attr("height", height)
  .attr("width", escalaRegiones.bandwidth())
  .attr("fill", "transparent")
  .attr("stroke-width", 2)
  .attr("stroke", "black");

svg
  .append("g")
  .selectAll("text")
  .data(categorias)
  .enter()
  .append("text")
  .attr("x", escalaRegiones)
  .attr("dx", 2)
  .attr("y", 15)
  .text((d) => d);

svg
  .append("g")
  .selectAll("line")
  .data(categorias)
  .enter()
  .append("line")
  .attr("x1", (d) => escalaRegiones(d) + escalaRegiones.bandwidth() / 2)
  .attr("x2", (d) => escalaRegiones(d) + escalaRegiones.bandwidth() / 2)
  .attr("y1", 0)
  .attr("y2", height)
  .attr("stroke", "black")
  .attr("stroke-dasharray", 12)
  .attr("stroke-width", 1);

const otrasCategorias = ["E", "F", "G", "H"];

const escalaRegiones2 = d3
  .scaleBand()
  .domain(otrasCategorias)
  .range([0, height])
  .paddingInner(0.5)
  .paddingOuter(0.5)
  .align(0.5);

svg
  .append("g")
  .selectAll("rect")
  .data(otrasCategorias)
  .enter()
  .append("rect")
  .attr("y", escalaRegiones2)
  .attr("height", escalaRegiones2.bandwidth())
  .attr("width", width)
  .attr("fill", "green")
  .attr("opacity", 0.3);

svg
  .append("g")
  .selectAll("rect")
  .data(otrasCategorias)
  .enter()
  .append("rect")
  .attr("y", escalaRegiones2)
  .attr("height", escalaRegiones2.bandwidth())
  .attr("width", width)
  .attr("fill", "transparent")
  .attr("stroke-width", 2)
  .attr("stroke", "black");

svg
  .append("g")
  .selectAll("text")
  .data(otrasCategorias)
  .enter()
  .append("text")
  .attr("y", escalaRegiones2)
  .attr("dx", 2)
  .attr("dy", 15)
  .text((d) => d);

svg
  .append("g")
  .selectAll("line")
  .data(otrasCategorias)
  .enter()
  .append("line")
  .attr("y1", (d) => escalaRegiones2(d) + escalaRegiones2.bandwidth() / 2)
  .attr("y2", (d) => escalaRegiones2(d) + escalaRegiones2.bandwidth() / 2)
  .attr("x1", 0)
  .attr("x2", width)
  .attr("stroke", "black")
  .attr("stroke-dasharray", 12)
  .attr("stroke-width", 1);

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
  .selectAll("rect")
  .data(datos)
  .enter()
  .append("rect")
  .attr("x", (d) => escalaRegiones(d.categoria1))
  .attr("y", (d) => escalaRegiones2(d.categoria2))
  .attr("width", escalaRegiones.bandwidth())
  .attr("height", escalaRegiones2.bandwidth())
  .attr("fill", (d) => d.color);
