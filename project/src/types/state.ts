import { store } from '../store/index.js';
import { Guitars, GuitarById, CurrentPageCatalog, PickedId, GuitarsTotalCount, GuitarComments } from './guitars.js';

export type GuitarsData = {
  guitarsTotalCount: GuitarsTotalCount,
  guitars: Guitars,
  guitarById: GuitarById,
  isGuitarsLoaded: boolean,
  isGuitarLoaded: boolean,
  guitarComments: GuitarComments,
  isCommentPushed: boolean,
  search: string,
  searchResults: Guitars,
};

export type GuitarsOperations = {
  pickedId: PickedId,
  currentPageCatalog: CurrentPageCatalog,
  isModalOpen: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
