import { combineReducers } from 'redux';
import { guitarsData } from './guitars-data/guitars-data';
import { guitarsOperations } from './guitars-operations/guitars-operations';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { NameSpace } from '../const';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['guitars'],
};

const guitarsPersistConfig = {
  key: 'guitars',
  storage,
  whitelist: ['pickedId'],
};

const rootReducer = combineReducers({
  [NameSpace.data]: guitarsData.reducer,
  [NameSpace.guitars]: persistReducer(guitarsPersistConfig, guitarsOperations.reducer),
});

export default persistReducer(rootPersistConfig, rootReducer);
