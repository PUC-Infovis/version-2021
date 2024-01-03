const width = 1000;
const height = 1000;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Eje lineal normal de 0 a 1 millón

const escalaLinealDecimal = d3
  .scaleLinear()
  .domain([1, 10 ** 6])
  .range([0, 800]);

const ejeLinealDecimal = d3.axisBottom(escalaLinealDecimal);

svg.append("g").attr("transform", `translate(100 0)`).call(ejeLinealDecimal);

// Eje logaritico en mismo dominio y rango

const escalaLogaritmicaDecimal = d3
  .scaleLog()
  .domain([1, 10 ** 6])
  .range([0, 800]);

const ejeLogaritmicoDecimal = d3.axisBottom(escalaLogaritmicaDecimal);

svg
  .append("g")
  .attr("transform", `translate(100 100)`)
  .call(ejeLogaritmicoDecimal);

// Mismos ejes lineales y logaríticos pero con dominio
// en base a potencias de dos.

const escalaLinealBaseDos = d3
  .scaleLinear()
  .domain([1, 2 ** 16])
  .range([0, 800]);

const ejeLinealBaseDos = d3.axisBottom(escalaLinealBaseDos);

svg.append("g").attr("transform", `translate(100 200)`).call(ejeLinealBaseDos);

const escalaLogaritmicaBaseDos = d3
  .scaleLog()
  .base(2)
  .domain([1, 2 ** 16])
  .range([0, 800]);

const ejeLogaritmicoBaseDos = d3.axisBottom(escalaLogaritmicaBaseDos);

svg
  .append("g")
  .attr("transform", `translate(100 300)`)
  .call(ejeLogaritmicoBaseDos);
