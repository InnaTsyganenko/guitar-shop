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

export type GuitarForCart = {
  id: number;
  guitarQt: number;
  name: string;
  vendorCode: string;
  type: string;
  previewImg: string;
  stringCount: string;
  price: number;
};

export type GuitarsTotalCount = number;

export type Guitars = Guitar[];

export type GuitarsForCart = GuitarForCart[];

export type GuitarById = Guitar;

export type GuitarComments = CommentGet[];

export type CurrentPageCatalog = number;

export type PickedId = number;

export type GuitarName = string;

export type RatingCount = number;

export type CommentsLength = number;

export type FilterAndSortOptions = {
  sortType: string;
  sortOrder: string;
  priceMin: number;
  priceMax: number;
  guitarTypes: [];
  stringQt: []
};

export type CouponPost = {
  coupon: string;
};
