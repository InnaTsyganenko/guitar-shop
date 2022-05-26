import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { GuitarsTotalCount, Guitars, Guitar } from '../../types/guitars';

export const getTotalCountGuitars = (state: State): GuitarsTotalCount => state[NameSpace.data].guitarsTotalCount;

export const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;

export const getStatusLoadedGuitars = (state: State): boolean => state[NameSpace.data].isGuitarsLoaded;

export const getGuitarById = (state: State): Guitar => state[NameSpace.data].guitarById;

export const getStatusLoadedGuitar = (state: State): boolean => state[NameSpace.data].isGuitarLoaded;

export const getIsReviewNewPushed = (state: State): boolean => state[NameSpace.data].isCommentPushed;

export const getSearchRequest = (state: State): string => state[NameSpace.data].search;

export const getSearchResults = (state: State): Guitars => state[NameSpace.data].searchResults;

export const getSortType = (state: State): string => state[NameSpace.data].sortType;

export const getSortDirection = (state: State): string => state[NameSpace.data].sortDirection;

export const getFilterMinPrice = (state: State): number => state[NameSpace.data].filterMinPrice;

export const getFilterMaxPrice = (state: State): number => state[NameSpace.data].filterMaxPrice;

export const getFilterGuitarType = (state: State): string => state[NameSpace.data].filterGuitarType;

export const getFilterStringCount = (state: State): string => state[NameSpace.data].filterStringCount;
