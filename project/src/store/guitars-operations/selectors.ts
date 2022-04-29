import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
export const getPickedId = (state: State): string => state[NameSpace.guitars].pickedId;
