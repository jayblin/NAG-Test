export interface Pokemon {
  name: string,
  url: string,
}

export interface ListResponse {
  count: number,
  next: string | null,
  previous: string | null,
  results: Pokemon[],
}

export interface PokeminDetail {
  weight: number,
  height: number,
  sprites: {
    front_default: string,
  }
}
