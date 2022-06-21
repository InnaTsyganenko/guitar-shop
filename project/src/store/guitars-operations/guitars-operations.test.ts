import { makeFakeGuitars } from './../../utils/mock';
import { guitarsOperations } from './guitars-operations';
import { DEFAULT_CATALOG_PAGE } from '../../const';
import { setCurrentPageCatalog, setGuitarId } from './guitars-operations';

describe('Reducer: guitarsOperations', () => {
  const fakeGuitars = makeFakeGuitars;

  it('without additional parameters should return initial state', () => {
    expect(guitarsOperations.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({pickedId: 0, currentPageCatalog: DEFAULT_CATALOG_PAGE, isModalOpen: false, guitarsInCart: []});
  });

  it('should set current page for pagination', () => {
    const state = {pickedId: 0, currentPageCatalog: DEFAULT_CATALOG_PAGE, isModalOpen: false, guitarsInCart: [], isGuitarAddedInCart: true};
    expect(guitarsOperations.reducer(state, setCurrentPageCatalog(2)))
      .toEqual({pickedId: 0, currentPageCatalog: 2, isModalOpen: false, guitarsInCart: fakeGuitars, isGuitarAddedInCart: true});
  });

  it('should get current guitar id by a given value', () => {
    const state = {pickedId: 0, currentPageCatalog: DEFAULT_CATALOG_PAGE, isModalOpen: false, guitarsInCart: [], isGuitarAddedInCart: true};
    expect(guitarsOperations.reducer(state, setGuitarId(1)))
      .toEqual({pickedId: 1, currentPageCatalog: DEFAULT_CATALOG_PAGE, isModalOpen: false, guitarsInCart: fakeGuitars, isGuitarAddedInCart: true});
  });
});
