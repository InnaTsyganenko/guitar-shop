import { store } from '../store/index.js';
import { Guitars, GuitarById, CurrentPageCatalog, PickedId } from './guitars.js';

export type GuitarsData = {
  guitars: Guitars,
  guitarById: GuitarById,
  isDataLoaded: boolean,
};

export type GuitarsOperations = {
  pickedId: PickedId,
  currentPageCatalog: CurrentPageCatalog,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
