import * as types from '../constants/ActionTypes.js';

const initialState = {
  firstName: null,
  lastName: null,
  avatarUrl: null
};

export default function user (state = initialState, action) {
  switch (action.type) {
  default:
    return state;
  }
}
