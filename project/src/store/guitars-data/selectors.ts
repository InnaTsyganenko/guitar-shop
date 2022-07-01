import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { GuitarsTotalCount, Guitars, Guitar } from '../../types/guitars';

export const getTotalCountGuitars = (state: State): GuitarsTotalCount => state[NameSpace.data]?.guitarsTotalCount;

export const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;

export const getGuitarsMinPrice = (state: State): number => state[NameSpace.data]?.guitarsMinPrice;

export const getGuitarsMaxPrice = (state: State): number => state[NameSpace.data]?.guitarsMaxPrice;

export const getStatusLoadedGuitars = (state: State): boolean => state[NameSpace.data].isGuitarsLoaded;

export const getGuitarById = (state: State): Guitar => state[NameSpace.data].guitarById;

export const getStatusLoadedGuitar = (state: State): boolean => state[NameSpace.data].isGuitarLoaded;

export const getIsReviewNewPushed = (state: State): boolean => state[NameSpace.data]?.isCommentPushed;

export const getSearchResults = (state: State): Guitars => state[NameSpace.data]?.searchResults;

export const getSortType = (state: State): string => state[NameSpace.data]?.sortType;

export const getSortDirection = (state: State): string => state[NameSpace.data]?.sortDirection;

export const getFilterMinPrice = (state: State): number => state[NameSpace.data]?.filterMinPrice;

export const getFilterMaxPrice = (state: State): number => state[NameSpace.data]?.filterMaxPrice;

export const getFilterGuitarTypes = (state: State): [] => state[NameSpace.data]?.filterGuitarTypes;

export const getFilterStringCount = (state: State): [] => state[NameSpace.data]?.filterStringCount;

export const getStatusLoadedGuitarsSortFIlter = (state: State): boolean => state[NameSpace.data].isGuitarsSortFilterLoaded;

export const getDiscountFromCoupon = (state: State): number => state[NameSpace.data]?.discountFromCoupon;
