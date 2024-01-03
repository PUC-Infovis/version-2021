const width = 800;
const height = 500;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const rects = svg
  .selectAll("rect")
  .data(d3.range(40))
  .enter()
  .append("rect")
  .attr("width", 100)
  .attr("height", 100)
  .attr("fill", "transparent")
  .attr("stroke", "black")
  .attr("x", (_, i) => (i % 8) * 100)
  .attr("y", (_, i) => Math.floor(i / 8) * 100);

const manejadorZoom = (evento) => {
  const transformacion = evento.transform;
  console.log(transformacion);
  rects.attr("transform", transformacion);
};

const zoom = d3
  .zoom()
  .extent([
    [0, 0],
    [width, height],
  ])
  .translateExtent([
    [-100, 0],
    [width + 100, height],
  ])
  .scaleExtent([1, 4])
  .on("start", () => console.log("empecé"))
  .on("zoom", manejadorZoom)
  .on("end", () => console.log("terminé"));

svg.call(zoom);
