import { guitarsOperations } from './guitars-operations';
import { DEFAULT_PAGE_CATALOG } from '../../const';
import { setCurrentPageCatalog, getIdGuitar } from './guitars-operations';

describe('Reducer: guitarsOperations', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarsOperations.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({pickedId: 0, currentPageCatalog: DEFAULT_PAGE_CATALOG});
  });

  it('should set current page for pagination', () => {
    const state = {pickedId: 0, currentPageCatalog: DEFAULT_PAGE_CATALOG};
    expect(guitarsOperations.reducer(state, setCurrentPageCatalog(2)))
      .toEqual({pickedId: 0, currentPageCatalog: 2});
  });

  it('should get current guitar id by a given value', () => {
    const state = {pickedId: 0, currentPageCatalog: DEFAULT_PAGE_CATALOG};
    expect(guitarsOperations.reducer(state, getIdGuitar(1)))
      .toEqual({pickedId: 1, currentPageCatalog: DEFAULT_PAGE_CATALOG});
  });
});
