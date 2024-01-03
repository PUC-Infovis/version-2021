const width = 800;
const height = 500;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const inputLongitud = d3.select("body").append("input").attr("type", "number");

const inputLatitud = d3.select("body").append("input").attr("type", "number");

const agregarPunto = d3.select("body").append("button").text("Agregar punto");

d3.json("paises_con_densidad.json").then((datos) => {
  const tope = 500;

  const escalaSecuencialColor = d3
    .scaleSequential()
    .interpolator(d3.interpolateYlGnBu)
    .domain(
      d3.extent(
        datos.features.filter(
          (f) =>
            f.properties.densidad !== undefined && f.properties.densidad < tope
        ),
        (f) => f.properties.densidad
      )
    );

  const escalaColor = (densidad) => {
    if (densidad) {
      if (densidad >= tope) {
        return d3.interpolateYlGnBu(1);
      } else {
        return escalaSecuencialColor(densidad);
      }
    } else {
      return "#ccc";
    }
  };

  const proyeccion = d3.geoWinkel3().fitSize([width, height], datos);
  const caminosGeo = d3.geoPath().projection(proyeccion);

  svg
    .selectAll("path")
    .data(datos.features)
    .enter()
    .append("path")
    .attr("d", caminosGeo)
    .attr("fill", (f) => escalaColor(f.properties.densidad))
    .attr("stroke", "#ccc");

  agregarPunto.on("click", () => {
    const longitud = parseFloat(inputLongitud.node().value);
    const latitud = parseFloat(inputLatitud.node().value);
    if (!isNaN(longitud) && !isNaN(latitud)) {
      svg
        .append("circle")
        .attr("cx", proyeccion([longitud, latitud])[0])
        .attr("cy", proyeccion([longitud, latitud])[1])
        .attr("r", 2)
        .attr("fill", "red");
    }
  });
});
