const queries = {
  countries8M:
    "SELECT name, population FROM country WHERE population > 8000000;",
  countriesLand: "SELECT name FROM country WHERE name LIKE '%land%';",
  citiesHalfMAnd1M:
    "SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000;",
  countriesEurope: "SELECT name FROM country WHERE continent = 'Europe';",
  countriesSurfaceArea:
    "SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;",
  citiesNL: "SELECT name, countryCode from city where countryCode LIKE 'NLD';",
  populationRotterdam:
    "SELECT name, population FROM city WHERE name = 'Rotterdam';",
  top10CountriesBySurfaceArea:
    "SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;",
  top10CitiesByPopulation:
    "SELECT name, population FROM city ORDER BY population DESC LIMIT 10;",
  populationWorld:
    "SELECT SUM(population)  AS 'Population of the World' FROM country;",
};
module.exports = queries;
