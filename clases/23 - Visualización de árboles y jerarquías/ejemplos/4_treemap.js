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
  const treemap = d3
    .treemap()
    .size([
      width - margin.left - margin.right,
      height - margin.top - margin.bottom,
    ])
    .padding(15);

  treemap(raiz);
  console.log(raiz.descendants());

  const color = d3.scaleSequential([8, 0], d3.interpolateMagma);

  contenedor
    .selectAll("rect")
    .data(raiz.descendants())
    .enter()
    .append("rect")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => color(d.height))
    .attr("stroke", "black");

  contenedor
    .selectAll("text")
    .data(raiz.descendants())
    .enter()
    .append("text")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .text((d) => d.data.nombre)
    .attr("font-size", 12)
    .attr("dx", 2)
    .attr("dy", 10);
};

// d3.csv("jerarquia_tabular.csv")
//   .then((datos) => {
//     const stratify = d3
//       .stratify()
//       .id((d) => d.nombre)
//       .parentId((d) => d.padre);

//     const raiz = stratify(datos);
//     raiz.count();
//     console.log(raiz.descendants());
//     dibujarJerarquia(raiz);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

d3.json("jerarquia_con_valores.json")
  .then((datos) => {
    const raiz = d3.hierarchy(datos, (d) => d.hijos);
    raiz.sum((d) => d.valor);
    console.log(raiz);
    dibujarJerarquia(raiz);
  })
  .catch((error) => {
    console.log(error);
  });
