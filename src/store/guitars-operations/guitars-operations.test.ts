import { makeFakeGuitarCart, makeFakeGuitarsInCart } from './../../utils/mock';
import { deleteGuitarFromCart, guitarsOperations, setGuitarInCart, setGuitarInCartState, setModalWindowState } from './guitars-operations';
import { DEFAULT_CATALOG_PAGE } from '../../const';
import { setCurrentPageCatalog, setGuitarId } from './guitars-operations';

describe('Reducer: guitarsOperations', () => {
  const initialState = {
    pickedId: 0,
    currentPageCatalog: DEFAULT_CATALOG_PAGE,
    isModalOpen: false,
    guitarsInCart: [],
    isGuitarAddedInCart: false,
  };

  it('without additional parameters should return initial state', () => {
    expect(guitarsOperations.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should set current page for pagination', () => {
    expect(guitarsOperations.reducer(initialState, setCurrentPageCatalog(2)))
      .toEqual({pickedId: 0, currentPageCatalog: 2, isModalOpen: false, guitarsInCart: [], isGuitarAddedInCart: false});
  });

  it('should get current guitar id by a given value', () => {
    expect(guitarsOperations.reducer(initialState, setGuitarId(1)))
      .toEqual({pickedId: 1, currentPageCatalog: DEFAULT_CATALOG_PAGE, isModalOpen: false, guitarsInCart: [], isGuitarAddedInCart: false});
  });

  it('should set true state for modal open', () => {
    expect(guitarsOperations.reducer(initialState, setModalWindowState(true)))
      .toEqual({pickedId: 0, currentPageCatalog: DEFAULT_CATALOG_PAGE, isModalOpen: true, guitarsInCart: [], isGuitarAddedInCart: false});
  });

  it('should set guitar in cart', () => {
    const mockGuitar = makeFakeGuitarCart();
    expect(guitarsOperations.reducer(initialState, setGuitarInCart(mockGuitar)))
      .toEqual({pickedId: 0, currentPageCatalog: DEFAULT_CATALOG_PAGE, isModalOpen: false, guitarsInCart: makeFakeGuitarsInCart, isGuitarAddedInCart: false});
  });

  it('should set guitar in cart state', () => {
    expect(guitarsOperations.reducer(initialState, setGuitarInCartState(true)))
      .toEqual({pickedId: 0, currentPageCatalog: DEFAULT_CATALOG_PAGE, isModalOpen: false, guitarsInCart: [], isGuitarAddedInCart: true});
  });

  it('should delete guitar from cart', () => {
    expect(guitarsOperations.reducer({pickedId: 0, currentPageCatalog: DEFAULT_CATALOG_PAGE, isModalOpen: false, guitarsInCart: makeFakeGuitarsInCart, isGuitarAddedInCart: false}, deleteGuitarFromCart(1)))
      .toEqual({pickedId: 0, currentPageCatalog: DEFAULT_CATALOG_PAGE, isModalOpen: false, guitarsInCart: [], isGuitarAddedInCart: false});
  });
});

