const width = 1000;
const height = 500;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const datos = [
  { paso: 0, valor: 2.0603572936394787 },
  { paso: 1, valor: 2.1258340075136997 },
  { paso: 2, valor: 2.3302161217964077 },
  { paso: 3, valor: 2.7225055372803837 },
  { paso: 4, valor: 3.1709024948437783 },
  { paso: 5, valor: 3.2562224630128327 },
  { paso: 6, valor: 2.973671646324604 },
  { paso: 7, valor: 3.2054315269800897 },
  { paso: 8, valor: 2.7524544574755536 },
  { paso: 9, valor: 2.736950619247576 },
  { paso: 10, valor: 2.9125383395943345 },
  { paso: 11, valor: 2.493988244547598 },
  { paso: 12, valor: 2.4849060597331394 },
  { paso: 13, valor: 2.2800539235220993 },
  { paso: 14, valor: 1.8353025802230376 },
  { paso: 15, valor: 1.5680963292079186 },
  { paso: 16, valor: 1.469477797601661 },
  { paso: 17, valor: 1.9358421383223048 },
  { paso: 18, valor: 1.612975926713831 },
  { paso: 19, valor: 2.0922396007490622 },
  { paso: 20, valor: 1.5968876881845189 },
  { paso: 21, valor: 1.2115064904244475 },
  { paso: 22, valor: 1.0443010807710174 },
  { paso: 23, valor: 0.5789624899026612 },
  { paso: 24, valor: 0.0874141501201815 },
  { paso: 25, valor: 0.021518040430784424 },
  { paso: 26, valor: 0 },
  { paso: 27, valor: 0 },
  { paso: 28, valor: 0.13311369072487345 },
  { paso: 29, valor: 0 },
  { paso: 30, valor: 0.14106461724892705 },
  { paso: 31, valor: 0 },
  { paso: 32, valor: 0.28955188753717465 },
  { paso: 33, valor: 0.08600409561301758 },
  { paso: 34, valor: 0.5747265192822275 },
  { paso: 35, valor: 0.41436233801350875 },
  { paso: 36, valor: 0.8808991020221822 },
  { paso: 37, valor: 0.5616920861698222 },
  { paso: 38, valor: 0.08767619545218852 },
];

const escalaX = d3
  .scaleLinear()
  .domain(d3.extent(datos, (d) => d.paso))
  .range([10, width - 10]);

const escalaY = d3
  .scaleLinear()
  .domain(d3.extent(datos, (d) => d.valor))
  .range([height - 10, 10]);

const lineConEscalas = d3
  .line()
  .curve(d3.curveLinear)
  .x((d) => escalaX(d.paso))
  .y((d) => escalaY(d.valor));

svg
  .append("path")
  .attr("fill", "transparent")
  .attr("stroke", "blue")
  .attr("stroke-width", 5)
  .attr("d", lineConEscalas(datos));
