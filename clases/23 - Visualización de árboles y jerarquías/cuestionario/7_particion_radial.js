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
  .attr("transform", `translate(${width / 2} ${height / 2})`);

const dibujarJerarquia = (raiz) => {
  const generadorArcos = d3
    .arc()
    .startAngle((d) => d.x0)
    .endAngle((d) => d.x1)
    .innerRadius((d) => d.y0)
    .outerRadius((d) => d.y1);

  const particion = d3
    .partition()
    .size([2 * Math.PI, (width - margin.left - margin.right) / 2]);

  particion(raiz);
  // console.log(raiz.descendants());

  const color = d3.scaleSequential([8, 0], d3.interpolateMagma);

  contenedor
    .selectAll("path")
    .data(raiz.descendants())
    .enter()
    .append("path")
    .attr("d", generadorArcos)
    .attr("fill", (d) => color(d.height))
    .attr("stroke", "black");

  contenedor
    .selectAll("text")
    .data(raiz.descendants())
    .enter()
    .append("text")
    .attr("transform", function (d) {
      // https://observablehq.com/@d3/sunburst
      const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
      const y = (d.y0 + d.y1) / 2;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    })
    .attr("dy", "0.35em")
    .text((d) => d.data.nombre);
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

d3.json(
  "https://raw.githubusercontent.com/PUC-Infovis/syllabus-2021/main/cuestionario-23/datos.json"
)
  .then((datos) => {
    const raiz = d3.hierarchy(datos, (d) => d.hijos);
    raiz.sum((d) => d.valor);
    dibujarJerarquia(raiz);
  })
  .catch((error) => {
    console.log(error);
  });
