import {
  BUTTON_CLICKED,
  UPDATE_SUCCESS,
  BUTTON_RESET,
  IS_LOADING,
} from "./types";

export const buttonClicked = () => (dispatch, getState) => {
  dispatch({ type: BUTTON_CLICKED });
};

export const applyButtonClicked = () => (dispatch, getState) => {
  dispatch({ type: UPDATE_SUCCESS });
};

export const buttonReset = () => (dispatch, getState) => {
  dispatch({ type: BUTTON_RESET });
};

export const isLoading = () => (dispatch, getState) => {
  dispatch({ type: IS_LOADING });
};
