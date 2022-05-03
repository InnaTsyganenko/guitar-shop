import { store } from '../store/index.js';
import { Guitars, GuitarById, PickedId } from './guitars.js';

export type GuitarsData = {
  guitars: Guitars,
  guitarById: GuitarById,
  isDataLoaded: boolean,
};

export type GuitarsOperations = {
  pickedId: PickedId,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
