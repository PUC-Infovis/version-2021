const width = 600;
const height = 400;
const margin = {
  top: 70,
  bottom: 70,
  right: 30,
  left: 30,
};

const datos = d3
  .range(1000)
  .map(() => ({ x: Math.random() * 200 + 50, y: Math.random() * 100 + 10 }));

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

const contenedorPuntos = svg
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`)
  .attr("clip-path", "url(#clip)");

const escalaY = d3
  .scaleLinear()
  .domain([0, d3.max(datos, (d) => d.y) + 10])
  .range([height - margin.top - margin.bottom, 0]);

const ejeY = d3.axisLeft(escalaY);

const contenedorEjeY = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .call(ejeY);

const escalaX = d3
  .scaleLinear()
  .domain([0, d3.max(datos, (d) => d.x) + 50])
  .range([0, width - margin.right - margin.left]);

const ejeX = d3.axisBottom(escalaX);

const contenedorEjeX = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
  .call(ejeX);

const puntos = contenedorPuntos
  .selectAll("circle")
  .data(datos)
  .join("circle")
  .attr("fill", "magenta")
  .attr("r", 2)
  .attr("cx", (d) => escalaX(d.x))
  .attr("cy", (d) => escalaY(d.y));

const manejadorZoom = (evento) => {
  const transformacion = evento.transform;

  puntos.attr("transform", transformacion);

  const escalaX2 = transformacion.rescaleX(escalaX);
  const escalaY2 = transformacion.rescaleY(escalaY);

  contenedorEjeX.call(ejeX.scale(escalaX2));
  contenedorEjeY.call(ejeY.scale(escalaY2));
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
  .scaleExtent([1, 4])
  .on("zoom", manejadorZoom);

svg.call(zoom);
