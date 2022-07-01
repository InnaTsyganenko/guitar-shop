import { InitialStateValues } from './../../const';
import { makeFakeGuitars, makeFakeGuitar } from './../../utils/mock';
import { guitarsData } from './guitars-data';
import { loadGuitars, loadGuitarById, setTotalCountGuitarsFromResponse, setIsNewCommentPush } from './guitars-data';
import { Guitar } from '../../types/guitars';

const guitar = makeFakeGuitar();

describe('Reducer: guitarsData', () => {
  const initialState = {
    guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
    guitars: [],
    guitarsMinPrice: 0,
    guitarsMaxPrice: 0,
    guitarById: {} as Guitar,
    guitarComments: [],
    isGuitarsLoaded: true,
    isGuitarLoaded: true,
    isCommentPushed: false,
    isGuitarsSortFilterLoaded: true,
    search: '',
    searchResults: [],
    sortType: '',
    sortDirection: '',
    filterMinPrice: 0,
    filterMaxPrice: 0,
    filterGuitarTypes: [],
    filterStringCount: [],
    discountFromCoupon: 0,
  };

  it('without additional parameters should return initial state', () => {
    expect(guitarsData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should download guitars', () => {
    expect(guitarsData.reducer({
      guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
      guitars: [],
      guitarsMinPrice: 0,
      guitarsMaxPrice: 0,
      guitarById: {} as Guitar,
      guitarComments: [],
      isGuitarsLoaded: true,
      isGuitarLoaded: true,
      isCommentPushed: false,
      isGuitarsSortFilterLoaded: true,
      search: '',
      searchResults: [],
      sortType: '',
      sortDirection: '',
      filterMinPrice: 0,
      filterMaxPrice: 0,
      filterGuitarTypes: [],
      filterStringCount: [],
      discountFromCoupon: 0,
    }, setTotalCountGuitarsFromResponse(20)))
      .toEqual({
        guitarsTotalCount: 20,
        guitars: [],
        guitarsMinPrice: 0,
        guitarsMaxPrice: 0,
        guitarById: {} as Guitar,
        guitarComments: [],
        isGuitarsLoaded: true,
        isGuitarLoaded: true,
        isCommentPushed: false,
        isGuitarsSortFilterLoaded: true,
        search: '',
        searchResults: [],
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should set total count guitars from response', () => {
    expect(guitarsData.reducer({
      guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
      guitars: [],
      guitarsMinPrice: 0,
      guitarsMaxPrice: 0,
      guitarById: {} as Guitar,
      guitarComments: [],
      isGuitarsLoaded: true,
      isGuitarLoaded: true,
      isCommentPushed: false,
      isGuitarsSortFilterLoaded: true,
      search: '',
      searchResults: [],
      sortType: '',
      sortDirection: '',
      filterMinPrice: 0,
      filterMaxPrice: 0,
      filterGuitarTypes: [],
      filterStringCount: [],
      discountFromCoupon: 0,
    }, loadGuitars(makeFakeGuitars)))
      .toEqual({
        guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
        guitars: makeFakeGuitars,
        guitarsMinPrice: 0,
        guitarsMaxPrice: 0,
        guitarById: {} as Guitar,
        guitarComments: [],
        isGuitarsLoaded: true,
        isGuitarLoaded: true,
        isCommentPushed: false,
        isGuitarsSortFilterLoaded: true,
        search: '',
        searchResults: [],
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should update guitar by load guitar', () => {
    expect(guitarsData.reducer({
      guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
      guitars: [],
      guitarsMinPrice: 0,
      guitarsMaxPrice: 0,
      guitarById: {} as Guitar,
      guitarComments: [],
      isGuitarsLoaded: true,
      isGuitarLoaded: true,
      isCommentPushed: false,
      isGuitarsSortFilterLoaded: true,
      search: '',
      searchResults: [],
      sortType: '',
      sortDirection: '',
      filterMinPrice: 0,
      filterMaxPrice: 0,
      filterGuitarTypes: [],
      filterStringCount: [],
      discountFromCoupon: 0,
    }, loadGuitarById(guitar)))
      .toEqual({
        guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
        guitars: [],
        guitarsMinPrice: 0,
        guitarsMaxPrice: 0,
        guitarById: makeFakeGuitar(),
        guitarComments: [],
        isGuitarsLoaded: true,
        isGuitarLoaded: true,
        isCommentPushed: false,
        isGuitarsSortFilterLoaded: true,
        search: '',
        searchResults: [],
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should set true when new comment push', () => {
    expect(guitarsData.reducer({
      guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
      guitars: [],
      guitarsMinPrice: 0,
      guitarsMaxPrice: 0,
      guitarById: {} as Guitar,
      guitarComments: [],
      isGuitarsLoaded: true,
      isGuitarLoaded: true,
      isCommentPushed: false,
      isGuitarsSortFilterLoaded: true,
      search: '',
      searchResults: [],
      sortType: '',
      sortDirection: '',
      filterMinPrice: 0,
      filterMaxPrice: 0,
      filterGuitarTypes: [],
      filterStringCount: [],
      discountFromCoupon: 0,
    }, setIsNewCommentPush(true)))
      .toEqual({
        guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
        guitars: [],
        guitarsMinPrice: 0,
        guitarsMaxPrice: 0,
        guitarById: {} as Guitar,
        guitarComments: [],
        isGuitarsLoaded: true,
        isGuitarLoaded: true,
        isCommentPushed: true,
        isGuitarsSortFilterLoaded: true,
        search: '',
        searchResults: [],
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });
});
