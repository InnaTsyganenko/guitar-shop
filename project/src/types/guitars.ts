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
};

export type Guitars = Guitar[];

export type GuitarById = Guitar;

export type PickedId = number;
