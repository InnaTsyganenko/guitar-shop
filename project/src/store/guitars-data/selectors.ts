import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { Guitars } from '../../types/guitars';

export const getGuitars = (state: State): Guitars => state[NameSpace.data].guitars;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
export const getGuitarById = (state: State): object => state[NameSpace.data].guitarsById;
