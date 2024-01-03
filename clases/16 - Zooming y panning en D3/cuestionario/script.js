const width = 800;
const height = 400;
const margin = {
  top: 70,
  bottom: 70,
  right: 30,
  left: 30,
};

let lastValue = Math.random() * 100 + 70;
const datos = d3.range(500).map((_, i) => {
  lastValue += (Math.random() - 0.5) * 10;
  return { x: (i + 1) * 10, y: lastValue };
});

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svg
  .append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", width - margin.right - margin.left)
  .attr("height", height - margin.top - margin.bottom);

const contenedorLinea = svg
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`)
  .attr("clip-path", "url(#clip)");

const escalaY = d3
  .scaleLinear()
  .domain([d3.min(datos, (d) => d.y) - 10, d3.max(datos, (d) => d.y) + 10])
  .range([height - margin.top - margin.bottom, 0]);

const ejeY = d3.axisLeft(escalaY);

const contenedorEjeY = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .call(ejeY);

const escalaX = d3
  .scaleLinear()
  .domain([0, d3.max(datos, (d) => d.x) + 20])
  .range([0, width - margin.right - margin.left]);

const ejeX = d3.axisBottom(escalaX);

const contenedorEjeX = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
  .call(ejeX);

const generadorDeLineas = d3
  .line()
  .curve(d3.curveLinear)
  .x((d) => escalaX(d.x))
  .y((d) => escalaY(d.y));

const linea = contenedorLinea
  .selectAll("path")
  .data([datos])
  .join("path")
  .attr("stroke", "magenta")
  .attr("stroke-width", 2)
  .attr("fill", "transparent")
  .attr("d", generadorDeLineas);

const manejadorZoom = (evento) => {
  const transformacion = evento.transform;
  const escalaX2 = transformacion.rescaleX(escalaX);
  generadorDeLineas.x((d) => escalaX2(d.x));

  linea.attr("d", generadorDeLineas);
  contenedorEjeX.call(ejeX.scale(escalaX2));
};

const zoom = d3
  .zoom()
  .extent([
    [0, 0],
    [width, height],
  ])
  .translateExtent([
    [0, 0],
    [width, height],
  ])
  .scaleExtent([1, 8])
  .on("zoom", manejadorZoom);

svg.call(zoom);
