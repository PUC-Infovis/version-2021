const width = 1000;
const height = 300;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const arcos = d3
  .arc()
  .padAngle((2 * Math.PI) / 100)
  .cornerRadius(5);

console.log(
  arcos({
    innerRadius: 0,
    outerRadius: 100,
    startAngle: 0,
    endAngle: (2 * Math.PI) / 3,
  })
);
svg
  .append("path")
  .attr(
    "d",
    arcos({
      innerRadius: 0,
      outerRadius: 100,
      startAngle: 0,
      endAngle: (2 * Math.PI) / 3,
    })
  )
  .attr("fill", "magenta")
  .attr("stroke", "black")
  .attr("transform", "translate(100, 100)");

svg
  .append("path")
  .attr(
    "d",
    arcos({
      innerRadius: 0,
      outerRadius: 100,
      startAngle: (2 * Math.PI) / 3,
      endAngle: (2 * (2 * Math.PI)) / 3,
    })
  )
  .attr("fill", "cyan")
  .attr("stroke", "black")
  .attr("transform", "translate(100, 100)");

svg
  .append("path")
  .attr(
    "d",
    arcos({
      innerRadius: 0,
      outerRadius: 100,
      startAngle: (2 * (2 * Math.PI)) / 3,
      endAngle: 2 * Math.PI,
    })
  )
  .attr("fill", "yellow")
  .attr("stroke", "black")
  .attr("transform", "translate(100, 100)");

arcos.innerRadius(50).outerRadius(75);

svg
  .append("path")
  .attr(
    "d",
    arcos({
      startAngle: 0,
      endAngle: (2 * Math.PI) / 3,
    })
  )
  .attr("fill", "magenta")
  .attr("stroke", "black")
  .attr("transform", "translate(300, 100)");

svg
  .append("path")
  .attr(
    "d",
    arcos({
      startAngle: (2 * Math.PI) / 3,
      endAngle: (2 * (2 * Math.PI)) / 3,
    })
  )
  .attr("fill", "cyan")
  .attr("stroke", "black")
  .attr("transform", "translate(300, 100)");

svg
  .append("path")
  .attr(
    "d",
    arcos({
      startAngle: (2 * (2 * Math.PI)) / 3,
      endAngle: 2 * Math.PI,
    })
  )
  .attr("fill", "yellow")
  .attr("stroke", "black")
  .attr("transform", "translate(300, 100)");
