const width = 600;
const height = 1000;

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
  const tree = d3
    .tree()
    .size([
      height - margin.top - margin.bottom,
      width - margin.left - margin.right,
    ]);
  tree(raiz);

  const generadorDeEnlace = d3
    .linkHorizontal()
    .source((d) => d.source)
    .target((d) => d.target)
    .x((d) => d.y)
    .y((d) => d.x);

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
    .attr("cx", (d) => d.y)
    .attr("cy", (d) => d.x)
    .attr("r", 3);

  contenedor
    .selectAll("text")
    .data(raiz.descendants())
    .enter()
    .append("text")
    .attr("x", (d) => d.y)
    .attr("y", (d) => d.x)
    .text((d) => d.data.name)
    .attr("font-size", 12)
    .attr("dy", 4);
};

d3.json("coronavirus.json")
  .then((datos) => {
    const raiz = d3.hierarchy(datos);
    raiz.sum((d) => d.value);
    dibujarJerarquia(raiz);
  })
  .catch((error) => {
    console.log(error);
  });
