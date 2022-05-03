export const GUITARS_COUNT_FOR_RENDER = 9;
export const DEFAULT_PAGE_CATALOG = 1;
export const STEP_FOR_PAGINATION = 1;

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog/page_',
  Cart = '/cart',
  Guitars = '/guitars/'
}

export enum APIRoute {
  Guitars = '/guitars',
  GuitarById = '/guitars/',
  Comments = '/comments',
  NewComment = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
}

export enum NameSpace {
  data = 'DATA',
  guitars = 'GUITARS',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}
