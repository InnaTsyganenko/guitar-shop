import { GuitarForCart } from './../types/guitars';
import { Guitar, Guitars, CommentGet, CommentPost } from '../types/guitars';

const makeFakeCommentGet = (): CommentGet => ({
  id: 'string',
  userName: 'string',
  advantage: 'string',
  disadvantage: 'string',
  comment: 'string',
  rating: 5,
  createAt: 'string',
  guitarId: 1,
} as CommentGet);

export const makeFakeCommentPost = (): CommentPost => ({
  guitarId: 1,
  userName: 'string',
  advantage: 'string',
  disadvantage: 'string',
  comment: 'string',
  rating: 5,
} as CommentPost);

export const makeFakeGuitar = (): Guitar => ({
  id: 1,
  name: 'string',
  vendorCode: 'string',
  type: 'string',
  description: 'string',
  previewImg: 'string',
  stringCount: 'string',
  rating: 5,
  price: 15000,
  comments: Array.from({length: 5}, makeFakeCommentGet),
} as Guitar);

export const makeFakeGuitarCart = (): GuitarForCart => ({
  id: 1,
  name: 'string',
  vendorCode: 'string',
  type: 'string',
  guitarQt: 1,
  stringCount: 'string',
  previewImg: 'dtring',
  price: 15000,
} as GuitarForCart);

export const makeFakeGuitars: Guitars = Array.from({length: 10}, makeFakeGuitar) as Guitars;
