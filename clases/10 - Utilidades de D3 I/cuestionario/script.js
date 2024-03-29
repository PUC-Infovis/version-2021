const width = 600;
const height = 400;
const margin = {
  top: 70,
  bottom: 70,
  right: 30,
  left: 30,
};

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const contenedor = svg
  .append("g")
  .attr("transform", `translate(${margin.left} ${margin.top})`);

function joinDeDatos(datos) {
  const maxAtr1 = d3.max(datos, (d) => d.atributo1);
  const maxAtr2 = d3.max(datos, (d) => d.atributo2);
  const maxAtr3 = d3.max(datos, (d) => d.atributo3);

  const escalaX = d3
    .scaleLinear()
    .domain([0, maxAtr1])
    .range([0, width - margin.right - margin.left]);

  const escalaY = d3
    .scaleLinear()
    .domain([0, maxAtr2])
    .range([height - margin.top - margin.bottom, 0]);

  // https://github.com/d3/d3-scale#scaleSqrt
  const escalaRadio = d3.scaleSqrt().domain([0, maxAtr3]).range([0, 30]);

  const ejeY = d3.axisLeft(escalaY);

  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    .call(ejeY);

  const ejeX = d3.axisBottom(escalaX);

  svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
    .call(ejeX);

  contenedor
    .selectAll("circle")
    .data(datos)
    .join("circle")
    .attr("fill", "magenta")
    .attr("r", (d) => escalaRadio(d.atributo3))
    .attr("cx", (d) => escalaX(d.atributo1))
    .attr("cy", (d) => escalaY(d.atributo2));
}

d3.json(
  "https://raw.githubusercontent.com/PUC-Infovis/syllabus-2021/main/cuestionario-10/datos.json"
)
  .then((datos) => {
    console.log(datos);
    joinDeDatos(datos);
  })
  .catch((error) => console.log(error));
