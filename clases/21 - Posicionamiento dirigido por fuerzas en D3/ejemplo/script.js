const width = 600;
const height = 600;

const margin = {
  top: 50,
  bottom: 50,
  left: 50,
  right: 50,
};

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const imprimirEstadoNodo = (nodos, indice) => {
  const nodo = nodos[indice];
  console.log(`x(${nodo.x}) y(${nodo.y})`);
};

const iniciarSimulacion = (nodos, enlaces) => {
  const simulacion = d3
    .forceSimulation(nodos)
    .force(
      "enlaces",
      d3
        .forceLink(enlaces)
        .id((d) => d.nombre)
        .distance(50)
    )
    .force("carga", d3.forceManyBody().strength(-60))
    .force("colision", d3.forceCollide(10))
    .force("centro", d3.forceCenter(width / 2, height / 2));

  // simulacion.alphaTarget(0.3);

  const inicioArrastre = (evento) => {
    if (evento.active === 0) {
      simulacion.alphaTarget(0.3).restart();
    }
    evento.subject.fx = evento.subject.x;
    evento.subject.fy = evento.subject.y;
  };

  const arrastre = (evento) => {
    evento.subject.fx = evento.x;
    evento.subject.fy = evento.y;
  };

  const finArrastre = (evento) => {
    if (evento.active === 0) {
      simulacion.alphaTarget(0);
    }
    evento.subject.fx = null;
    evento.subject.fy = null;
  };

  const drag = d3
    .drag()
    .on("start", inicioArrastre)
    .on("drag", arrastre)
    .on("end", finArrastre);

  const lineas = svg
    .append("g")
    .attr("stroke", "#999")
    .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(enlaces)
    .join("line")
    .attr("stroke-width", 2);

  const circulos = svg
    .append("g")
    .attr("stroke", "#fff")
    .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodos)
    .join("circle")
    .attr("r", 10)
    .attr("fill", (d) => d.color)
    .call(drag);

  simulacion.on("tick", () => {
    // imprimirEstadoNodo(nodos, 0);
    console.log(simulacion.alpha(), simulacion.alpha() < simulacion.alphaMin());

    circulos.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

    lineas
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
  });

  // console.log("Enlaces", enlaces);
};

d3.json("dataset_mediano.json")
  .then((datos) => {
    const nodos = datos.nodos;
    const enlaces = datos.enlaces;
    iniciarSimulacion(nodos, enlaces);
  })
  .catch((error) => {
    console.log(error);
  });
