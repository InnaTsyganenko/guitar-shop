export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  Cart = '/cart',
  Guitars = '/guitars'
}

export const APIRoute = {
  Guitars: '/guitars',
  GUITAR_BY_ID: '/guitars/',
  GUITAR_BY_ID_COMMENTS: '/comments',
  COMMENTS: '/comments',
  COUPONS: '/coupons',
  ORDERS: '/orders',
};

export enum NameSpace {
  data = 'DATA',
  guitars = 'Guitars',
}

export enum HTTP_CODE {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}
