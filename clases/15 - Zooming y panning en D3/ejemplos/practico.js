// El siguiente código, hasta la línea 59 crea la base del SVG creado, con la grilla y figuras.

const ancho = 260;
const alto = 190;

const svg = d3
  .select("body")
  .append("svg")
  .attr("width", ancho)
  .attr("height", alto);

const contenedor = svg.append("g");

const grilla = contenedor.append("g").attr("id", "grilla");
grilla
  .selectAll(".line")
  .data(d3.ticks(0, 260, 27))
  .enter()
  .append("line")
  .attr("x1", (d) => d)
  .attr("x2", (d) => d)
  .attr("y1", 0)
  .attr("y2", 190);

grilla
  .selectAll(".line")
  .data(d3.ticks(0, 190, 20))
  .enter()
  .append("line")
  .attr("x1", 0)
  .attr("x2", 260)
  .attr("y1", (d) => d)
  .attr("y2", (d) => d);

const inicio = [30, 30, 40];
const circulo = contenedor.append("g").attr("id", "circulo");
circulo
  .append("rect")
  .attr("id", "inicio")
  .attr("x", inicio[0] - inicio[2] / 2)
  .attr("y", inicio[1] - inicio[2] / 2)
  .attr("width", inicio[2])
  .attr("height", inicio[2]);
circulo.append("circle").attr("cx", 30).attr("cy", 30).attr("r", 13);

const final = [135, 85, 60];
const estrella = contenedor.append("g").attr("id", "estrella");
estrella
  .append("rect")
  .attr("id", "final")
  .attr("x", final[0] - final[2] / 2)
  .attr("y", final[1] - final[2] / 2)
  .attr("width", final[2])
  .attr("height", final[2]);
estrella
  .append("path")
  .attr("d", d3.symbol().type(d3.symbolStar).size(900)())
  .attr("transform", "translate(135, 85)");

// De ahora en adelante hay secciones de código que puedes ir comentando y descomentando
// La idea es ir entendiendo como se comporta el atributo trasform cuando lo aplicamos
// sobre varios elementos de un SVG.

// En las siguientes línea podrás ver como se traslada y como se escalan los elementos
// al solo aplicar un tipo de transformación a la vez. Prueba una línea a la vez y ve los resultados.

// contenedor.attr("transform", "translate(50, 50)");
// contenedor.attr("transform", "translate(-50, -50)");
// contenedor.attr("transform", "scale(1)");
// contenedor.attr("transform", "scale(0.5)");
// contenedor.attr("transform", "scale(2)");

// Si te fijas, el escalamiento se realiza desde el origen cuando se aplica solo.

// Las siguientes líneas usan ambas transformaciones
// contenedor.attr("transform", "translate(-20, -20) scale(2)");
// contenedor.attr("transform", "scale(2) translate(-20, -20)");

// De lo anterior notarás que el orden de las transformaciones importa,
// ya que los anteriores dan distintos resultados
// Resulta que las transformaciones se aplican en orden, de derecha a izquierda,
// y un cambio de escala cambia las distancias de translación

// Por eso, las siguientes transformaciones son equivalente entre ellas:
// contenedor.attr("transform", "translate(-20, -20) scale(2)");
// contenedor.attr("transform", "scale(2) translate(-10, -10)");

// De la misma forma:
// contenedor.attr("transform", "translate(-210, -110) scale(2)");
// contenedor.attr("transform", "scale(2) translate(-105, -55) ");

// Si optamos por usar el orden donde escale va más a la derecha,
// podemos hacer un cálculo a partir de esta que calcule cuánto es necesario
// desplazar la vista para dejarla en cierta posición.
// A continuación se hace eso, y se usan los centros de las figuras en el SVG
// El círculo es inicio, y la estrella es final:

// const escala = 3;
// contenedor.attr(
//   "transform",
//   `translate(${-inicio[0] * escala}, ${-inicio[1] * escala}) scale(${escala})`
// );
// contenedor.attr(
//   "transform",
//   `translate(${-final[0] * escala}, ${-final[1] * escala}) scale(${escala})`
// );

// Lo anterior nos permite dejar en el origen una coordenada específica (el centro de figuras)
// Si además queremos que esa coordenada quede al centro del monitor,
// entonces podemos sumarle una cantidad que la traslade en ese sentido:
// const escala = 3;
// contenedor.attr(
//   "transform",
//   `translate(${-inicio[0] * escala + ancho / 2}, ${
//     -inicio[1] * escala + alto / 2
//   }) scale(${escala})`
// );
// contenedor.attr(
//   "transform",
//   `translate(${-final[0] * escala + ancho / 2}, ${
//     -final[1] * escala + alto / 2
//   }) scale(${escala})`
// );

// Si pensamos más allá, podriamos querer calcular la escala optima para mostrar cierta región
// Para eso, podemos calcular la relación mínima entre
// los tamaños de la vista completa y la región que se quiere acercar:
// const escala = Math.min(alto, ancho) / inicio[2];
// contenedor.attr(
//   "transform",
//   `translate(${-inicio[0] * escala + ancho / 2}, ${
//     -inicio[1] * escala + alto / 2
//   }) scale(${escala})`
// );
// const escala = Math.min(alto, ancho) / final[2];
// contenedor.attr(
//   "transform",
//   `translate(${-final[0] * escala + ancho / 2}, ${
//     -final[1] * escala + alto / 2
//   }) scale(${escala})`
// );

// Finalmente, esto podemos también generarlo mediante objetos transformación de D3
// A partir de objetos previamente creados, somos capaces de crear vistas ya generadas
// que un usuario podría usar.
// Todo el código que queda crea objetos de transformación,
// y los aplica sobre el contenedor en conjunto con transiciones:

let escala = Math.min(alto, ancho) / inicio[2];
const transformacionInicio = d3.zoomIdentity
  .translate(-inicio[0] * escala + ancho / 2, -inicio[1] * escala + alto / 2)
  .scale(escala);
escala = Math.min(alto, ancho) / final[2];
const transformacionFinal = d3.zoomIdentity
  .translate(-final[0] * escala + ancho / 2, -final[1] * escala + alto / 2)
  .scale(escala);
contenedor
  .transition()
  .duration(2000)
  .attr("transform", transformacionInicio)
  .transition()
  .duration(2000)
  .attr("transform", transformacionFinal)
  .transition()
  .duration(2000)
  .attr("transform", d3.zoomIdentity);
