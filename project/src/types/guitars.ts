export type Guitar = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  description: string;
  previewImg: string;
  stringCount: string;
  rating: number;
  price: number;
  comments: [];
};

export type CommentGet = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
  createAt: string;
  guitarId: number;
};

export type CommentPost = {
  guitarId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
};

export type GuitarsTotalCount = number;

export type Guitars = Guitar[];

export type GuitarById = Guitar;

export type GuitarComments = CommentGet[];

export type CurrentPageCatalog = number;

export type PickedId = number;

export type GuitarName = string;

export type RatingCount = number;

export type CommentsLength = number;

export type FilterAndSortOptions = {
  sortType: string;
  sortDirection: string;
  filterMinPrice: number;
  filterMaxPrice: number;
  filterGuitarTypes: [];
};
