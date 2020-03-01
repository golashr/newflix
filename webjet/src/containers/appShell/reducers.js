import { combineReducers } from 'redux';
import { filmWorld } from '../homePage/homePage.reducer';

export const rootReducer = () => {
  return combineReducers({
    filmWorld
  });
};
