import { InitialStateValues } from './../../const';
import { makeFakeGuitars, makeFakeGuitar } from './../../utils/mock';
import { guitarsData, loadSearchResults, resetFilters, resetSearch, setDiscountFromCoupon, setFilterGuitarType, setFilterMaxPrice, setFilterMinPrice, setFilterStringCount, setGuitarsMaxPrice, setGuitarsMinPrice, setLoadGuitarsSortFilter, setSearchRequest, setSortDirection, setSortType } from './guitars-data';
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

  it('should set total count guitars from response', () => {
    expect(guitarsData.reducer(void 0, setTotalCountGuitarsFromResponse(20)))
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

  it('should download guitars', () => {
    expect(guitarsData.reducer(void 0, loadGuitars(makeFakeGuitars)))
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
    expect(guitarsData.reducer(void 0, loadGuitarById(guitar)))
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

  it('should set search request', () => {
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
    }, setSearchRequest('abadya')))
      .toEqual({
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
        search: 'abadya',
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

  it('should load guitars by search request', () => {
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
    }, loadSearchResults(makeFakeGuitars)))
      .toEqual({
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
        searchResults: makeFakeGuitars,
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should reset search', () => {
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
    }, resetSearch()))
      .toEqual({
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
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should set true when guitars loaded by sort and filters', () => {
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
    }, resetSearch()))
      .toEqual({
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
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should set value for guitars min price', () => {
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
    }, setGuitarsMinPrice(3000)))
      .toEqual({
        guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
        guitars: [],
        guitarsMinPrice: 3000,
        guitarsMaxPrice: 0,
        guitarById: {} as Guitar,
        guitarComments: [],
        isGuitarsLoaded: true,
        isGuitarLoaded: true,
        isCommentPushed: false,
        isGuitarsSortFilterLoaded: true,
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should set value for guitars max price', () => {
    expect(guitarsData.reducer(void 0, setGuitarsMaxPrice(5000)))
      .toEqual({
        guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
        guitars: [],
        guitarsMinPrice: 0,
        guitarsMaxPrice: 5000,
        guitarById: {} as Guitar,
        guitarComments: [],
        isGuitarsLoaded: true,
        isGuitarLoaded: true,
        isCommentPushed: false,
        isGuitarsSortFilterLoaded: true,
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should set boolean value for load sorted filtred guitars', () => {
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
      isGuitarsSortFilterLoaded: false,
      search: '',
      searchResults: [],
      sortType: '',
      sortDirection: '',
      filterMinPrice: 0,
      filterMaxPrice: 0,
      filterGuitarTypes: [],
      filterStringCount: [],
      discountFromCoupon: 0,
    }, setLoadGuitarsSortFilter(true)))
      .toEqual({
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
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should set sort type', () => {
    expect(guitarsData.reducer(void 0, setSortType('grablya')))
      .toEqual({
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
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: 'grablya',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should set sort direction', () => {
    expect(guitarsData.reducer(void 0, setSortDirection('jinngle')))
      .toEqual({
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
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: '',
        sortDirection: 'jinngle',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should reset sort', () => {
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
    }, setLoadGuitarsSortFilter(true)))
      .toEqual({
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
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: initialState.sortType,
        sortDirection: initialState.sortDirection,
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should set filter min price', () => {
    expect(guitarsData.reducer(void 0, setFilterMinPrice(2000)))
      .toEqual({
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
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: '',
        sortDirection: '',
        filterMinPrice: 2000,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should set filter max price', () => {
    expect(guitarsData.reducer(void 0, setFilterMaxPrice(10000)))
      .toEqual({
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
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 10000,
        filterGuitarTypes: [],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should set filter guitar types', () => {
    expect(guitarsData.reducer(void 0, setFilterGuitarType(['electric'])))
      .toEqual({
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
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: ['electric'],
        filterStringCount: [],
        discountFromCoupon: 0,
      });
  });

  it('should set filter guitar string', () => {
    expect(guitarsData.reducer(void 0, setFilterStringCount(['4'])))
      .toEqual({
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
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: '',
        sortDirection: '',
        filterMinPrice: 0,
        filterMaxPrice: 0,
        filterGuitarTypes: [],
        filterStringCount: ['4'],
        discountFromCoupon: 0,
      });
  });

  it('should reset filters', () => {
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
      isGuitarsSortFilterLoaded: false,
      search: '',
      searchResults: [],
      sortType: '',
      sortDirection: '',
      filterMinPrice: 0,
      filterMaxPrice: 0,
      filterGuitarTypes: [],
      filterStringCount: [],
      discountFromCoupon: 0,
    }, resetFilters()))
      .toEqual({
        guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
        guitars: [],
        guitarsMinPrice: 0,
        guitarsMaxPrice: 0,
        guitarById: {} as Guitar,
        guitarComments: [],
        isGuitarsLoaded: true,
        isGuitarLoaded: true,
        isCommentPushed: false,
        isGuitarsSortFilterLoaded: false,
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: '',
        sortDirection: '',
        filterMinPrice: initialState.filterMinPrice,
        filterMaxPrice: initialState.filterMaxPrice,
        filterGuitarTypes: initialState.filterGuitarTypes,
        filterStringCount: initialState.filterStringCount,
        discountFromCoupon: 0,
      });
  });

  it('should set discount from promocode', () => {
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
      isGuitarsSortFilterLoaded: false,
      search: '',
      searchResults: [],
      sortType: '',
      sortDirection: '',
      filterMinPrice: 0,
      filterMaxPrice: 0,
      filterGuitarTypes: [],
      filterStringCount: [],
      discountFromCoupon: 0,
    }, setDiscountFromCoupon(15)))
      .toEqual({
        guitarsTotalCount: InitialStateValues.InitialTotalCountGuitars,
        guitars: [],
        guitarsMinPrice: 0,
        guitarsMaxPrice: 0,
        guitarById: {} as Guitar,
        guitarComments: [],
        isGuitarsLoaded: true,
        isGuitarLoaded: true,
        isCommentPushed: false,
        isGuitarsSortFilterLoaded: false,
        search: initialState.search,
        searchResults: initialState.searchResults,
        sortType: '',
        sortDirection: '',
        filterMinPrice: initialState.filterMinPrice,
        filterMaxPrice: initialState.filterMaxPrice,
        filterGuitarTypes: initialState.filterGuitarTypes,
        filterStringCount: initialState.filterStringCount,
        discountFromCoupon: 15,
      });
  });
});
