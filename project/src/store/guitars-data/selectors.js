import {NameSpace} from '../root-reducer';

export const getGuitars = (state) => state[NameSpace.DATA].guitars;
export const getGuitarById = (state) => state[NameSpace.DATA].guitarsById;
