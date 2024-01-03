const width = 1000;
const height = 300;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const simbolo = d3.symbol().size(30 * 30);

console.log(simbolo());
svg
  .append("path")
  .attr("d", simbolo())
  .attr("transform", "translate(100, 100)");

simbolo.type(d3.symbolCross);
console.log(simbolo());

svg
  .append("path")
  .attr("d", simbolo())
  .attr("transform", "translate(200, 100)");

simbolo.type(d3.symbolStar);
console.log(simbolo());

svg
  .append("path")
  .attr("d", simbolo())
  .attr("transform", "translate(300, 100)");

simbolo.type(d3.symbolSquare);
console.log(simbolo());

svg
  .append("path")
  .attr("d", simbolo())
  .attr("transform", "translate(400, 100)");
