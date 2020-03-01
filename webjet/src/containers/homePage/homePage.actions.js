import * as filmWorldActions from './homePage.actionTypes';

export const initiateFilmWorldRequest = () => ({
  type: filmWorldActions.INITIATE_FILM_WORLD_REQUEST
})

export const filmWorldRequestSuccess = (successPayload) => ({
  type: filmWorldActions.FILM_WORLD_REQUEST_SUCCESS,
  successPayload
})

export const filmWorldRequestFailed = (errorPayload) => ({
  type: filmWorldActions.FILM_WORLD_REQUEST_FAILED,
  errorPayload
})