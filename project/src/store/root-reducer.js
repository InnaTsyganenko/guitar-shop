import { combineReducers } from 'redux';
import { guitarsData } from './guitars-data/guitars-data';
import { guitarsOperations } from './guitars-operations/guitars-operations';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const NameSpace = {
  DATA: 'DATA',
  GUITARS: 'GUITARS',
};

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['GUITARS'],
};

const guitarsPersistConfig = {
  key: 'GUITARS',
  storage,
  whitelist: ['pickedId'],
};

const rootReducer = combineReducers({
  [NameSpace.DATA]: guitarsData,
  [NameSpace.GUITARS]: persistReducer(guitarsPersistConfig, guitarsOperations),
});

export default persistReducer(rootPersistConfig, rootReducer);
