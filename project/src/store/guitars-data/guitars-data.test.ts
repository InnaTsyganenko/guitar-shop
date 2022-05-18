import { makeFakeGuitars, makeFakeGuitar } from './../../utils/mock';
import { guitarsData } from './guitars-data';
import { loadGuitars, loadGuitarById, setTotalCountGuitarsFromResponse, setIsNewCommentPush } from './guitars-data';
import { Guitar } from '../../types/guitars';

const guitar = makeFakeGuitar();

describe('Reducer: guitarsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarsData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({guitarsTotalCount: 0, guitars: [], guitarById: {} as Guitar, guitarComments: [], isDataLoaded: false, isCommentPushed: false});
  });

  it('should download guitars', () => {
    const state = {guitarsTotalCount: 0, guitars: [], guitarById: {} as Guitar, guitarComments: [], isDataLoaded: false, isCommentPushed: false};
    expect(guitarsData.reducer(state, setTotalCountGuitarsFromResponse(20)))
      .toEqual({guitarsTotalCount: 20, guitars: [], guitarById: {}, guitarComments: [], isDataLoaded: false, isCommentPushed: false});
  });

  it('should set total count guitars from response', () => {
    const state = {guitarsTotalCount: 0, guitars: [], guitarById: {} as Guitar, guitarComments: [], isDataLoaded: false, isCommentPushed: false};
    expect(guitarsData.reducer(state, loadGuitars(makeFakeGuitars)))
      .toEqual({guitarsTotalCount: 0, guitars: makeFakeGuitars, guitarById: {}, guitarComments: [], isDataLoaded: true, isCommentPushed: false});
  });

  it('should update guitar by load guitar', () => {
    const state = {guitarsTotalCount: 0, guitars: [], guitarById: {} as Guitar, guitarComments: [], isDataLoaded: false, isCommentPushed: false};
    expect(guitarsData.reducer(state, loadGuitarById(guitar)))
      .toEqual({guitarsTotalCount: 0, guitars: [], guitarById: guitar, guitarComments: [], isDataLoaded: false, isCommentPushed: false});
  });

  it('should set true when new comment push', () => {
    const state = {guitarsTotalCount: 0, guitars: [], guitarById: {} as Guitar, guitarComments: [], isDataLoaded: false, isCommentPushed: false};
    expect(guitarsData.reducer(state, setIsNewCommentPush(true)))
      .toEqual({guitarsTotalCount: 0, guitars: [], guitarById: {}, guitarComments: [], isDataLoaded: false, isCommentPushed: true});
  });
});
