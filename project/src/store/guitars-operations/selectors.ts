import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getPickedId = (state: State): number => state[NameSpace.guitars].pickedId;
