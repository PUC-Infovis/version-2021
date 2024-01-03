const width = 1000;
const height = 500;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const puntos = [
  [100, 100],
  [150, 50],
  [200, 200],
  [250, 450],
  [300, 150],
  [350, 250],
  [400, 500],
  [450, 150],
  [500, 150],
  [550, 150],
  [600, 200],
  [650, 250],
  [700, 350],
  [750, 450],
  [800, 450],
];

const linea = d3.line();
console.log(linea(puntos));
svg
  .append("path")
  .attr("fill", "transparent")
  .attr("stroke", "black")
  .attr("d", linea(puntos));

// d3.curveBasis
linea.curve(d3.curveBasis);
console.log(linea(puntos));
svg
  .append("path")
  .attr("fill", "transparent")
  .attr("stroke", "red")
  .attr("d", linea(puntos));

// d3.curveCardinal
linea.curve(d3.curveCardinal);
console.log(linea(puntos));
svg
  .append("path")
  .attr("fill", "transparent")
  .attr("stroke", "blue")
  .attr("d", linea(puntos));

// d3.curveMonotoneX
linea.curve(d3.curveMonotoneX);
console.log(linea(puntos));
svg
  .append("path")
  .attr("fill", "transparent")
  .attr("stroke", "green")
  .attr("d", linea(puntos));

// d3.curveStep
linea.curve(d3.curveStep);
console.log(linea(puntos));
svg
  .append("path")
  .attr("fill", "transparent")
  .attr("stroke", "magenta")
  .attr("d", linea(puntos));

svg
  .selectAll("circle")
  .data(puntos)
  .enter()
  .append("circle")
  .attr("cx", (d) => d[0])
  .attr("cy", (d) => d[1])
  .attr("r", 3);
