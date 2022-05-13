export const STEP_ONE = 1;
export const DEFAULT_CATALOG_PAGE = 1;
export const GUITARS_QUANTITY_FOR_DISPLAY = 9;
export const COMMENTS_QUANTITY_FOR_DISPLAY = 3;
export const TOTAL_RATING_UNITS = 5;

export enum ValuesForInitialState {
  InitialPickedId = 0,
  InitialTotalCountGuitars = 0,
}

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

export enum TypeofGuitar {
  electric = 'Электрогитара',
  acoustic = 'Акустическая гитара',
  ukulele = 'Укулеле',
}

export const ValueofRating = {
  1: 'Ужасно',
  2: 'Плохо',
  3: 'Нормально',
  4: 'Хорошо',
  5: 'Отлично',
} as const;
