export const GUITARS_COUNT_FOR_RENDER = 9;
export const DEFAULT_PAGE_CATALOG = 1;
export const STEP_ONE = 1;
export const SHOW_COMMENTS_QUANTITY = 3;
export const COUNT_RATING_STARS = 5;

export enum AppRoute {
  Root = '/',
  Catalog = '/guitars/page_',
  Cart = '/cart',
  Guitars = '/guitars/'
}

export enum APIRoute {
  Guitars = '/guitars',
  GuitarById = '/guitars/',
  Comments = '/comments',
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

export enum CardGuitarTabs {
  characteristics = 'Характеристики',
  description = 'Описание',
}

export const TypeofGuitar: object = {
  electric: 'Электрогитара',
  acoustic: 'Акустическая гитара',
  ukulele: 'Укулеле',
};

export const ValueofRating: object = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
};
