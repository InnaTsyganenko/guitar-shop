import {store} from '../store/index.js';
import {Guitars, GuitarsById} from './guitars.js';

export type GuitarsData = {
  guitars: Guitars,
  guitarById: GuitarsById,
  isDataLoaded: boolean,
};

export type GuitarsOperations = {
  pickedId: GuitarById,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
