const color1 = d3.color("#55ff00");

const color2 = d3.color("#003cff");

const interpolacionHSL = d3.interpolateHsl(color1, color2);

d3.select("#hsl")
  .attr("width", 500)
  .attr("height", 100)
  .selectAll("rect")
  .data(d3.range(10))
  .enter()
  .append("rect")
  .attr("x", (_, i) => 50 * i)
  .attr("height", 100)
  .attr("width", 50)
  .attr("fill", (_, i) => interpolacionHSL(i / 9));

const interpolacionRGB = d3.interpolateRgb(color1, color2);

d3.select("#rgb")
  .attr("width", 500)
  .attr("height", 100)
  .selectAll("rect")
  .data(d3.range(10))
  .enter()
  .append("rect")
  .attr("x", (_, i) => 50 * i)
  .attr("height", 100)
  .attr("width", 50)
  .attr("fill", (_, i) => interpolacionRGB(i / 9));

const interCIELAB = d3.interpolateLab(color1, color2);

d3.select("#cielab")
  .attr("width", 500)
  .attr("height", 100)
  .selectAll("rect")
  .data(d3.range(10))
  .enter()
  .append("rect")
  .attr("x", (_, i) => 50 * i)
  .attr("height", 100)
  .attr("width", 50)
  .attr("fill", (_, i) => interCIELAB(i / 9));

const interCIELCH = d3.interpolateHcl(color1, color2);

d3.select("#cielch")
  .attr("width", 500)
  .attr("height", 100)
  .selectAll("rect")
  .data(d3.range(10))
  .enter()
  .append("rect")
  .attr("x", (_, i) => 50 * i)
  .attr("height", 100)
  .attr("width", 50)
  .attr("fill", (_, i) => interCIELCH(i / 9));
