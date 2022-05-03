import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getCurrentPageCatalog = (state: State): number => state[NameSpace.guitars].currentPageCatalog;

export const getPickedId = (state: State): number => state[NameSpace.guitars].pickedId;
