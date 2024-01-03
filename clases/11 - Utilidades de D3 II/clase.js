svg.on("click", (evento) => {
  const coordenadas = d3.pointer(evento, evento.currentTarget);
  console.log(coordenadas);
  svg
    .append("circle")
    .attr("cx", coordenadas[0])
    .attr("cy", coordenadas[1])
    .attr("r", 0)
    .attr("fill", "red")
    .attr("opacity", 0.5)
    .transition()
    .duration(500)
    .attr("r", 10)
    .transition()
    .duration(500)
    .attr("r", 0)
    .remove();
});
