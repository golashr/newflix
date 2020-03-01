import * as filmWorldActions from './homePage.actionTypes';

const filmWorldInitialState = []

export const filmWorld = (state = filmWorldInitialState, action) => {
  switch (action.type) {
    case filmWorldActions.FILM_WORLD_REQUEST_SUCCESS: {
     return Object.assign([],filmWorldInitialState, action.successPayload);
    }

    case filmWorldActions.FILM_WORLD_REQUEST_FAILED: {
      return Object.assign([],filmWorldInitialState, action.errorPayload);
    }
    default: {
      return state;
    }
  }
};
