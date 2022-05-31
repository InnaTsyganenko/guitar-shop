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

export const makeFakeGuitars: Guitars = Array.from({length: 10}, makeFakeGuitar) as Guitars;

export const mockState = {
  guitarsTotalCount: 0,
  guitars: [],
  guitarsMinPrice: 0,
  guitarsMaxPrice: 0,
  guitarById: {} as Guitar,
  guitarComments: [],
  isGuitarsLoaded: true,
  isGuitarLoaded: true,
  isCommentPushed: false,
  isGuitarsSortFilterLoaded: true,
  search: '',
  searchResults: [],
  sortType: '',
  sortDirection: '',
  filterMinPrice: 0,
  filterMaxPrice: 0,
  filterGuitarTypes: [],
  filterStringCount: [],
};
