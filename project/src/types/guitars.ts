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

export type GuitarComment = {
  id: string;
  userName: string;
  advantage: string;
  disadvantage: string;
  comment: string;
  rating: number;
  createAt: string;
  guitarId: number;
};


export type GuitarsTotalCount = number;

export type Guitars = Guitar[];

export type GuitarById = Guitar;

export type GuitarComments = GuitarComment[];

export type CurrentPageCatalog = number;

export type PickedId = number;

export type GuitarName = string;

export type RatingCount = number;
