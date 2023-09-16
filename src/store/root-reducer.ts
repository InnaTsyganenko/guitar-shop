import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { guitarsData } from './guitars-data/guitars-data';
import { guitarsOperations } from './guitars-operations/guitars-operations';
import { persistReducer } from 'redux-persist';
import { NameSpace } from '../const';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['GUITARS', 'DATA', 'searchResults'],
};

const guitarsPersistConfig = {
  key: 'GUITARS',
  storage,
  whitelist: ['pickedId', 'guitarsInCart'],
};

const rootReducer = combineReducers({
  [NameSpace.data]: guitarsData.reducer,
  [NameSpace.guitars]: persistReducer(guitarsPersistConfig, guitarsOperations.reducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
