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
  const particion = d3
    .partition()
    .size([
      width - margin.left - margin.right,
      height - margin.top - margin.bottom,
    ])
    .padding(1);

  particion(raiz);
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

d3.json(
  "https://raw.githubusercontent.com/PUC-Infovis/syllabus-2021/main/cuestionario-23/datos.json"
)
  .then((datos) => {
    const raiz = d3.hierarchy(datos, (d) => d.hijos);
    raiz.sum((d) => d.valor);
    console.log(raiz);

    dibujarJerarquia(raiz);
  })
  .catch((error) => {
    console.log(error);
  });
