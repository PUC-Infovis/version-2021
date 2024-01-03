const width = 800;
const height = 500;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

d3.json("paises.json").then((datos) => {
  // d3.geoMercator();
  // d3.geoCylindricalEqualArea();
  // d3.geoWinkel3();
  const proyeccion = d3.geoWinkel3().fitSize([width, height], datos);

  // .translate([width / 2, height / 2])
  // .scale(80);
  // .fitSize([width, height], datos.features[41])

  const caminosGeo = d3.geoPath().projection(proyeccion);

  svg
    .selectAll("path")
    .data(datos.features)
    .enter()
    .append("path")
    .attr("d", caminosGeo)
    .attr("fill", "blue")
    .attr("opacity", 0.3)
    .attr("stroke", "blue");
});
