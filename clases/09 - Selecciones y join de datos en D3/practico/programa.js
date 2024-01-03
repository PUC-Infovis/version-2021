const seleccionDeListas = d3.selectAll("ul").attr("a", (d, i, all) => {
  console.log(d, i, all, all[i]);
  return i;
});

// const update = seleccionDeListas.data([1, 2, 3, 4]);
// console.log(seleccionDeListas);
// console.log(update);

/////////////////////////////////////////////

// seleccionDeListas.append("li").text((d) => d);

/////////////////////////////////////////////

// seleccionDeListas.append("li");

// d3.selectAll("ul")
//   .data([1, 2, 3, 4])
//   .selectAll("li")
//   .text((d) => d);

/////////////////////////////////////////////

// seleccionDeListas.append("li");

// d3.selectAll("ul")
//   .selectAll("li")
//   .data([1, 2, 3, 4])
//   .text((d) => d);

/////////////////////////////////////////////

// seleccionDeListas.append("li");
// seleccionDeListas.append("li");
// seleccionDeListas.append("li");
// seleccionDeListas.append("li");

// d3.selectAll("ul")
//   .data([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 15, 16],
//   ])
//   .selectAll("li")
//   .data((d) => d) // :o
//   .text((d) => d);
