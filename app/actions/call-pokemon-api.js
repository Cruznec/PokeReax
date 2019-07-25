import  results from '../resources/default-response.json';
import { pokemonResult } from '../resources/pokemon-Details.json';

export const pokemonList = () => {
    return fetch('http://pokeapi.co/api/v2/pokemon/?limit=60')
    .then(function(response) {
      return results;//return response.json();
    })
    .catch(function(error) {
      console.log(`Failed to get data.Loading cache data.`);
      return results;
      //console.log(`Encountered an ${error}`);
    });
};


export const pokemonDetails = (url) => {
  return fetch(url)
  .then(function(response) {
    return pokemonResult.filter((item) => item.url === url)[0];
  })
  .catch(function(error) {
    console.log(`Failed to get data.Loading cache data.`, pokemonResult);
    return pokemonResult.filter((item) => item.url === url)[0];
  });
};