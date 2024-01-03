const width = 1000;
const height = 500;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const datos = [
  { dia: "Lunes", productividad: 334, entretenimiento: 165, social: 83 },
  { dia: "Martes", productividad: 394, entretenimiento: 123, social: 34 },
  { dia: "Miércoles", productividad: 302, entretenimiento: 305, social: 50 },
  { dia: "Jueves", productividad: 299, entretenimiento: 165, social: 45 },
  { dia: "Viernes", productividad: 403, entretenimiento: 165, social: 2 },
  { dia: "Sábado", productividad: 0, entretenimiento: 665, social: 0 },
  { dia: "Domingo", productividad: 0, entretenimiento: 265, social: 131 },
];

const apilador = d3
  .stack()
  .keys(["productividad", "entretenimiento", "social"]);

const series = apilador(datos);
console.log(series);

const escalaX = d3
  .scalePoint()
  .domain(d3.range(datos.length))
  .range([10, width - 10])
  .padding(1);

const escalaY = d3
  .scaleLinear()
  .domain([
    0,
    d3.max(series, (serie) => d3.max(serie, (arreglo) => arreglo[1])),
  ])
  .range([height - 10, 10]);

const escalaColor = d3
  .scaleOrdinal()
  .domain(series.keys())
  .range(["blue", "yellow", "magenta"]);

const area = d3
  .area()
  .curve(d3.curveMonotoneX)
  .x((_, i) => escalaX(i))
  .y0((par) => escalaY(par[0]))
  .y1((par) => escalaY(par[1]));

svg
  .selectAll("path")
  .data(series)
  .enter()
  .append("path")
  .attr("fill", (serie) => escalaColor(serie.key))
  .attr("d", (serie) => area(serie));
