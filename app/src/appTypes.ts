export type AppUser = {
  id: number,
  name: string,
};

export type AppUserWordUpvote = {
  id: number,
};

export type AppWord = {
  id: number,
  word: string,
  definition: string,
  creatorID: number,
  example?: string,
  creator: {
    name: string,
  },
  createdAt: string,
  updatedAt: string,
  numUpvotes?: number,
  upvotes?: AppUserWordUpvote[],
};
