export interface IPokemon {
  name: string,
  url: string,
}

export interface IPokemonDetail extends IPokemon {
  width: number,
  height: number,
}

export interface IListResponse {
  count: number,
  next: string | null,
  previous: string | null,
  results: IPokemon[],
}

export interface IItemResponse {
  weight: number,
  height: number,
  sprites: {
    front_default: string,
    // front_default: string | null,
  }
}
