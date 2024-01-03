d3.json("iris.json").then((data) => {
  console.log(data);

  const promedios = {
    sepalLength: d3.mean(data, (d) => d.sepalLength),
    sepalWidth: d3.mean(data, (d) => d.sepalWidth),
    petalLength: d3.mean(data, (d) => d.petalLength),
    petalWidth: d3.mean(data, (d) => d.petalWidth),
  };
  console.log(promedios);

  const agrupadosPorEspecie = Object.fromEntries(
    d3.group(data, (d) => d.species)
  );
  console.log(agrupadosPorEspecie);

  const contadorPorEspecie = Object.fromEntries(
    d3.rollup(
      data,
      (g) => g.length,
      (d) => d.species
    )
  );
  console.log(contadorPorEspecie);

  const promediosPorEspecie = Object.fromEntries(
    d3.rollup(
      data,
      (g) => ({
        sepalLength: d3.mean(g, (d) => d.sepalLength),
        sepalWidth: d3.mean(g, (d) => d.sepalWidth),
        petalLength: d3.mean(g, (d) => d.petalLength),
        petalWidth: d3.mean(g, (d) => d.petalWidth),
      }),
      (d) => d.species
    )
  );
  console.log(promediosPorEspecie);

  const binSepalLength = d3.bin().value((d) => d.sepalLength);
  console.log(binSepalLength(data));
});
