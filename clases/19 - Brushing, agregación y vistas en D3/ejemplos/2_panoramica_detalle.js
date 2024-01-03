const width = 600;
const height = 400;
const margin = {
  top: 30,
  bottom: 30,
  right: 30,
  left: 30,
};

const datos = d3
  .range(500)
  .map(() => ({ x: Math.random() * 400 + 20, y: Math.random() * 50 + 10 }));

const svgPanoramica = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const contenedorPuntosPanoramica = svgPanoramica
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`);

const escalaYPanoramica = d3
  .scaleLinear()
  .domain([0, d3.max(datos, (d) => d.y) + 10])
  .range([height - margin.top - margin.bottom, 0]);

const ejeYPanoramica = d3.axisLeft(escalaYPanoramica);

const contenedorEjeY = svgPanoramica
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .call(ejeYPanoramica);

const escalaXPanoramica = d3
  .scaleLinear()
  .domain([0, d3.max(datos, (d) => d.x) + 20])
  .range([0, width - margin.right - margin.left]);

const ejeXPanoramica = d3.axisBottom(escalaXPanoramica);

const contenedorEjeX = svgPanoramica
  .append("g")
  .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
  .call(ejeXPanoramica);

const puntosPanoramica = contenedorPuntosPanoramica
  .selectAll("circle")
  .data(datos)
  .join("circle")
  .attr("fill", "gray")
  .attr("r", 2)
  .attr("opacity", 0.2)
  .attr("cx", (d) => escalaXPanoramica(d.x))
  .attr("cy", (d) => escalaYPanoramica(d.y));

const svgDetalle = d3
  .select("body")
  .append("svg")
  .attr("width", height)
  .attr("height", height);

svgDetalle
  .append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", height - margin.top - margin.bottom)
  .attr("height", height - margin.top - margin.bottom);

const contenedorPuntosDetalle = svgDetalle
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`)
  .attr("clip-path", "url(#clip)");

const escalaYDetalle = d3
  .scaleLinear()
  .domain([200, 100].map(escalaYPanoramica.invert))
  .range([height - margin.top - margin.bottom, 0]);

const ejeYDetalle = d3.axisLeft(escalaYDetalle);

const contenedorEjeYDetalle = svgDetalle
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`)
  .call(ejeYDetalle);

const escalaXDetalle = d3
  .scaleLinear()
  .domain([100, 200].map(escalaXPanoramica.invert))
  .range([0, height - margin.top - margin.bottom]);

const ejeXDetalle = d3.axisBottom(escalaXDetalle);

const contenedorEjeXDetalle = svgDetalle
  .append("g")
  .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
  .call(ejeXDetalle);

const puntosDetalle = contenedorPuntosDetalle
  .selectAll("circle")
  .data(datos)
  .join("circle")
  .attr("fill", "magenta")
  .attr("r", 7)
  .attr("cx", (d) => escalaXDetalle(d.x))
  .attr("cy", (d) => escalaYDetalle(d.y));

const contenedorBrush = svgPanoramica
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`);

const brushed = (evento) => {
  const seleccion = evento.selection;
  const rangoValores = seleccion.map((punto) => [
    escalaXPanoramica.invert(punto[0]),
    escalaYPanoramica.invert(punto[1]),
  ]);
  const x = [rangoValores[0][0], rangoValores[1][0]];
  const y = [rangoValores[1][1], rangoValores[0][1]];
  const filtro = (d) =>
    x[0] <= d.x && d.x <= x[1] && y[0] <= d.y && d.y <= y[1];
  puntosPanoramica
    .attr("fill", (d) => (filtro(d) ? "magenta" : "gray"))
    .attr("opacity", (d) => (filtro(d) ? 1 : 0.2));

  escalaXDetalle.domain(x);
  contenedorEjeXDetalle.call(d3.axisBottom(escalaXDetalle));
  escalaYDetalle.domain(y);
  contenedorEjeYDetalle.call(d3.axisLeft(escalaYDetalle));
  puntosDetalle
    .attr("cx", (d) => escalaXDetalle(d.x))
    .attr("cy", (d) => escalaYDetalle(d.y));
};

const brush = d3
  .brush()
  .extent([
    [0, 0],
    [width - margin.right - margin.left, height - margin.top - margin.bottom],
  ])
  .filter((event) => {
    return (
      !event.ctrlKey &&
      !event.button &&
      event.target.__data__.type !== "overlay"
    );
  })
  .on("brush", brushed);

contenedorBrush.call(brush).call(brush.move, [
  [100, 100],
  [200, 200],
]);

contenedorBrush.select(".selection").attr("fill", "magenta");
contenedorBrush.select(".overlay").style("cursor", "default");
contenedorBrush.selectAll(".handle").remove();
