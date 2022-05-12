import { makeFakeGuitar } from './../../utils/mock';
import { guitarsData } from './guitars-data';
import { loadGuitarById } from './guitars-data';
import { Guitar } from '../../types/guitars';

const guitar = makeFakeGuitar();

describe('Reducer: guitarsData', () => {
  it('without additional parameters should return initial state', () => {
    expect(guitarsData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({guitarsTotalCount: 0, guitars: [], guitarById: {} as Guitar, guitarComments: [], isDataLoaded: false, isReviewNewPushed: false});
  });

  it('should update guitar by load guitar', () => {
    const state = {guitarsTotalCount: 0, guitars: [], guitarById: {} as Guitar, guitarComments: [], isDataLoaded: false, isReviewNewPushed: false};
    expect(guitarsData.reducer(state, loadGuitarById(guitar)))
      .toEqual({guitarsTotalCount: 0, guitars: [], guitarById: guitar, guitarComments: [], isDataLoaded: false, isReviewNewPushed: false});
  });
});
