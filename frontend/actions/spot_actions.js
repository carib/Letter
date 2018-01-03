import * as ApiUtil from '../util/spot_api_util';

export const RECEIVE_SPOTS = "RECEIVE_SPOTS";

export const receiveSpots = spots => {
  return {
    type: RECEIVE_SPOTS,
    spots
  }
}

export const fetchSpots = () => dispatch => {
  return ApiUtil.fetchSpots().then(spots => {
    dispatch(receiveSpots(spots));
    return spots;
  });
}
