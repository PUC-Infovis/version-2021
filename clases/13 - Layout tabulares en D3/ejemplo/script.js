const width = 1000;
const height = 300;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const datos = [
  { valor: 190, categoria: "magenta" },
  { valor: 20, categoria: "yellow" },
  { valor: 120, categoria: "cyan" },
  { valor: 70, categoria: "magenta" },
  { valor: 40, categoria: "yellow" },
  { valor: 100, categoria: "cyan" },
];

const pie = d3
  .pie()
  .value((d) => d.valor)
  .sort(null);

const arcosCalculados = pie(datos);

console.log(arcosCalculados);

const arcos = d3
  .arc()
  .innerRadius(50)
  .outerRadius(75)
  .padAngle((2 * Math.PI) / 200)
  .cornerRadius(5);

svg
  .selectAll("path")
  .data(arcosCalculados)
  .enter()
  .append("path")
  .attr("d", (d) => arcos(d))
  .attr("fill", (d) => d.data.categoria)
  .attr("stroke", "black")
  .attr("transform", "translate(100, 100)");
