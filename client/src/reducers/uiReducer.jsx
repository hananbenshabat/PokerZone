import {
  BUTTON_CLICKED,
  BUTTON_RESET,
  IS_LOADING,
  UPDATE_SUCCESS,
} from "../actions/types";

const initialState = {
  button: true,
  loading: false,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case BUTTON_CLICKED:
      return {
        ...state,
        button: false,
      };

    case BUTTON_RESET:
      return {
        ...state,
        button: true,
      };

    case IS_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };

    case UPDATE_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
}
