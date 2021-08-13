export type AppUser = {
  id: number,
  name: string,
}

export type AppWord = {
  id: number,
  word: string,
  definition: string,
  creatorID: number,
  example?: string,
}
