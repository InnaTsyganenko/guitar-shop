import { store } from '../store/index.js';
import { Guitars, GuitarById, CurrentPageCatalog, PickedId, GuitarsTotalCount, GuitarComments } from './guitars.js';

export type GuitarsData = {
  guitarsTotalCount: GuitarsTotalCount,
  guitars: Guitars,
  guitarById: GuitarById,
  isDataLoaded: boolean,
  guitarComments: GuitarComments,
  isNewCommentPushed: boolean,
};

export type GuitarsOperations = {
  pickedId: PickedId,
  currentPageCatalog: CurrentPageCatalog,
  isModalOpen: boolean,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
