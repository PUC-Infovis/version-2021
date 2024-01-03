const datos = [23, 45, 120, 64];

const update = d3.select("#svg").selectAll("rect").data(datos);

const enter = update.enter().append("rect");

enter
  .attr("width", 50)
  .attr("y", 0)
  .attr("x", (d, i, all) => i * 100)
  .attr("height", (d, i, all) => 2 * d);
