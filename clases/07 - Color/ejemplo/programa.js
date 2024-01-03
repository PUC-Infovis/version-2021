const color1 = d3.color("rgb(10%, 20%, 30%)");
console.log(color1);

const color2 = d3.color("hsl(120, 50%, 20%)");
console.log(color2);

const interpolacion = d3.interpolateRgb("rgb(0, 100, 0)", "rgb(100, 0, 100)");
console.log(interpolacion(0.5)); // "rgb(50, 50, 50)"

const interCIELAB = d3.interpolateLab("rgb(0, 100, 0)", "rgb(100, 0, 100)");
console.log(interCIELAB(0.5)); // "rgb(77, 67, 61)"
