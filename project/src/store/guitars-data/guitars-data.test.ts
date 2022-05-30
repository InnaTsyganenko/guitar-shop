import { makeFakeGuitars, makeFakeGuitar, mockState as state } from './../../utils/mock';
import { guitarsData } from './guitars-data';
import { loadGuitars, loadGuitarById, setTotalCountGuitarsFromResponse, setIsNewCommentPush } from './guitars-data';
import { Guitar } from '../../types/guitars';

const guitar = makeFakeGuitar();

// describe('Reducer: guitarsData', () => {
//   it('without additional parameters should return initial state', () => {
//     expect(guitarsData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
//       .toEqual({guitarsTotalCount: 0, guitars: [], guitarById: {} as Guitar, guitarComments: [], isGuitarsLoaded: true, isGuitarLoaded: true,  isCommentPushed: false, search: '', searchResults: [], sortType: '', sortDirection: ''});
//   });

//   it('should download guitars', () => {
//     expect(guitarsData.reducer(state, setTotalCountGuitarsFromResponse(20)))
//       .toEqual({guitarsTotalCount: 20, guitars: [], guitarById: {}, guitarComments: [], isGuitarsLoaded: true, isGuitarLoaded: true,  isCommentPushed: false, search: '', searchResults: [], sortType: '', sortDirection: ''});
//   });

//   it('should set total count guitars from response', () => {
//     expect(guitarsData.reducer(state, loadGuitars(makeFakeGuitars)))
//       .toEqual({guitarsTotalCount: 0, guitars: makeFakeGuitars, guitarById: {}, guitarComments: [], isCommentPushed: false, sortType: '', sortDirection: ''});
//   });

//   it('should update guitar by load guitar', () => {
//     expect(guitarsData.reducer(state, loadGuitarById(guitar)))
//       .toEqual({guitarsTotalCount: 0, guitars: [], guitarById: guitar, guitarComments: [], isGuitarsLoaded: true, isGuitarLoaded: true,  isCommentPushed: false, sortType: '', sortDirection: ''});
//   });

//   it('should set true when new comment push', () => {
//     expect(guitarsData.reducer(state, setIsNewCommentPush(true)))
//       .toEqual({guitarsTotalCount: 0, guitars: [], guitarById: {}, guitarComments: [], isGuitarsLoaded: true, isGuitarLoaded: true,  isCommentPushed: true, sortType: '', sortDirection: ''});
//   });
// });
