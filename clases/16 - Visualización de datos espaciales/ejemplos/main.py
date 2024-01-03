
import json 

with open("pop_density.csv", "rt") as archivo:
    pop = list(map( lambda l: l.strip().split(";"), archivo.readlines()[1:]))
    print(pop)

with open("paises.json", "rt") as archivo:
    paises = json.load(archivo)
    
for codigo, poblacion in pop:
    for pais in paises["features"]:
        if pais["properties"]["ISO_A3"] == codigo:
            print("Encontrado:", codigo, poblacion)
            pais["properties"]["densidad"] = float(poblacion) if poblacion else 0

with open("paises_con_densidad.json", "wt") as archivo:
    json.dump(paises, archivo)