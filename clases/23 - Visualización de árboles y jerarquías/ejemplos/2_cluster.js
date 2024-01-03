const width = 600;
const height = 400;

const margin = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50,
};

const contenedor = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", `translate(${margin.top} ${margin.left})`);

const dibujarJerarquia = (raiz) => {
  console.log(raiz);

  const cluster = d3
    .cluster()
    .size([
      width - margin.left - margin.right,
      height - margin.top - margin.bottom,
    ]);
  cluster(raiz);
  console.log(raiz.descendants());

  const generadorDeEnlace = d3
    .linkVertical()
    .source((d) => d.source)
    .target((d) => d.target)
    .x((d) => d.x)
    .y((d) => d.y);

  contenedor
    .selectAll("path")
    .data(raiz.links())
    .enter()
    .append("path")
    .attr("d", generadorDeEnlace)
    .attr("stroke", "gray")
    .attr("fill", "none");

  contenedor
    .selectAll("circle")
    .data(raiz.descendants())
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", 3);

  contenedor
    .selectAll("text")
    .data(raiz.descendants())
    .enter()
    .append("text")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .text((d) => d.data.nombre)
    .attr("font-size", 12)
    .attr("dx", -15)
    .attr("dy", 4);

  console.log(raiz.descendants());
  console.log(raiz.links());
};

d3.csv("jerarquia_tabular.csv")
  .then((datos) => {
    const stratify = d3
      .stratify()
      .id((d) => d.nombre)
      .parentId((d) => d.padre);

    const raiz = stratify(datos);
    dibujarJerarquia(raiz);
  })
  .catch((error) => {
    console.log(error);
  });
