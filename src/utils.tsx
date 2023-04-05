import { IPokemon, IListResponse, IItemResponse } from "./types";

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

const isObject = (value: any) => typeof value === 'object' && value !== null && !Array.isArray(value);
export const capitalizeFirstLetter = (string: string) => string[0].toUpperCase() + string.slice(1);

export const isPokemon = (pokemon: any): pokemon is IPokemon => {
  // Проверяем, что pokemon объект
  return isObject(pokemon) &&

  // Проверяем, что у pokemon есть свойство name
  pokemon.hasOwnProperty('name') &&
  typeof pokemon.name === 'string' &&

  // Проверяем, что у pokemon есть свойство url
  pokemon.hasOwnProperty('url') &&
  typeof pokemon.url === 'string';
}

export const isListResponse = (response: any): response is IListResponse => {
  // Проверяем, что pokemon объект
  return isObject(response) &&

  // Проверяем, что у response есть свойство count
  response.hasOwnProperty('count') &&
  typeof response.count === 'number' &&

  // Проверяем, что у response есть свойство next
  response.hasOwnProperty('next') &&
  (
    typeof response.next === 'string' ||
    response.next === null
  ) &&

  // Проверяем, что у response есть свойство previous
  response.hasOwnProperty('previous') &&
  (
    typeof response.previous === 'string' ||
    response.previous === null
  ) &&

  // Проверяем, что у response есть свойство results
  response.hasOwnProperty('results') &&
  Array.isArray(response.results) &&
  response.results.every((pokemon: IPokemon) => isPokemon(pokemon));
}

export const isItemResponse = (response: any): response is IItemResponse => {
  // Проверяем, что pokemon объект
  return isObject(response) &&

  // Проверяем, что у response есть свойство weight
  response.hasOwnProperty('weight') &&
  typeof response.weight === 'number' &&

  // Проверяем, что у response есть свойство height
  response.hasOwnProperty('height') &&
  typeof response.height === 'number' &&

  // Проверяем, что response.sprites объект
  isObject(response.sprites) &&

  // Проверяем, что у response.sprites есть свойство front_default
  response.sprites.hasOwnProperty('front_default') &&
  (
    typeof response.sprites.front_default === 'string' ||
    response.sprites.front_default === null
  )
}
