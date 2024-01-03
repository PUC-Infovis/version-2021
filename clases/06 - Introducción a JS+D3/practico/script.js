const svg = document.getElementById("svg");

svg.addEventListener("click", (evento) => {
  console.log(evento);
  const circulo = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circulo.setAttribute("cx", evento.x);
  circulo.setAttribute("cy", evento.y);
  let radio = 5;
  circulo.setAttribute("r", radio);
  svg.appendChild(circulo);

  const t = setInterval(() => {
    radio += 1;
    circulo.setAttribute("r", radio);
    if (radio > 50) {
      svg.removeChild(circulo);
      clearInterval(t);
    }
  }, 50);
});
