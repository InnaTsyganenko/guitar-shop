import {NameSpace} from '../root-reducer';

export const getGuitars = (state: { [x: string]: { guitars: []; }; }) => state[NameSpace.DATA].guitars;
export const getGuitarById = (state: { [x: string]: { guitarsById: object; }; }) => state[NameSpace.DATA].guitarsById;
