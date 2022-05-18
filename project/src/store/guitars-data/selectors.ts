import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { GuitarsTotalCount, Guitars, Guitar } from '../../types/guitars';

export const getTotalCountGuitars = (state: State): GuitarsTotalCount => state[NameSpace.data].guitarsTotalCount;

export const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;

export const getStatusLoadedData = (state: State): boolean => state[NameSpace.data].isDataLoaded;

export const getGuitarById = (state: State): Guitar => state[NameSpace.data].guitarById;

export const getIsReviewNewPushed = (state: State): boolean => state[NameSpace.data].isCommentPushed;
