const svg = d3.select("body").append("svg");

const datos = [150, 256, 130, 0, 23, 422, 235];

svg.attr("width", 50 + datos.length * 100).attr("height", 500);

svg
  .selectAll("rect")
  .data(datos)
  .enter()
  .append("rect")
  .attr("width", 50)
  .attr("fill", "magenta")
  .attr("height", (d) => d)
  .attr("x", (_, i) => 50 + i * 100);
