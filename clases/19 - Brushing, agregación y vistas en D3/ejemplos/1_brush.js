const width = 600;
const height = 400;
const margin = {
  top: 70,
  bottom: 70,
  right: 30,
  left: 30,
};

const datos = d3
  .range(500)
  .map(() => ({ x: Math.random() * 400 + 20, y: Math.random() * 50 + 10 }));

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const contenedorPuntos = svg
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`);

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
  .domain([0, d3.max(datos, (d) => d.x) + 20])
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
  .attr("fill", "gray")
  .attr("r", 2)
  .attr("opacity", 0.2)
  .attr("cx", (d) => escalaX(d.x))
  .attr("cy", (d) => escalaY(d.y));

const contenedorBrush = svg
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`);

const brushed = (evento) => {
  const seleccion = evento.selection;
  // console.log(seleccion);
  const rangoValores = seleccion.map((punto) => [
    escalaX.invert(punto[0]),
    escalaY.invert(punto[1]),
  ]);
  const x = [rangoValores[0][0], rangoValores[1][0]];
  const y = [rangoValores[1][1], rangoValores[0][1]];
  const filtro = (d) =>
    x[0] <= d.x && d.x <= x[1] && y[0] <= d.y && d.y <= y[1];
  puntos
    .attr("fill", (d) => (filtro(d) ? "magenta" : "gray"))
    .attr("opacity", (d) => (filtro(d) ? 1 : 0.2));
};

const brush = d3
  .brush()
  .extent([
    [0, 0],
    [width - margin.right - margin.left, height - margin.top - margin.bottom],
  ])
  .filter((event) => {
    console.log({
      ctrlKey: event.ctrlKey,
      button: event.button,
      type: event.target.__data__.type,
    });
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
