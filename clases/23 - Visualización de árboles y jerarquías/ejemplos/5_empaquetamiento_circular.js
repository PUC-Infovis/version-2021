const width = 600;
const height = 600;

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
  const pack = d3
    .pack()
    .size([
      width - margin.left - margin.right,
      height - margin.top - margin.bottom,
    ])
    .padding(5);

  pack(raiz);
  console.log(raiz.descendants());

  const color = d3.scaleSequential([8, 0], d3.interpolateMagma);

  contenedor
    .selectAll("circle")
    .data(raiz.descendants())
    .enter()
    .append("circle")
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .attr("r", (d) => d.r)
    .attr("fill", (d) => color(d.height))
    .attr("stroke", "black");

  contenedor
    .selectAll("text")
    .data(raiz.leaves())
    .enter()
    .append("text")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .text((d) => d.data.nombre)
    .attr("font-size", 10)
    .attr("dx", -2.5)
    .attr("dy", 2.5);
};

// d3.csv("jerarquia_tabular.csv")
//   .then((datos) => {
//     const stratify = d3
//       .stratify()
//       .id((d) => d.nombre)
//       .parentId((d) => d.padre);

//     const raiz = stratify(datos);
//     raiz.count();
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
