import {
  ADD_TODO_ERROR,
  ADD_TODO_LOADING,
  ADD_TODO_SUCCESS,
  GET_TODO_ERROR,
  GET_TODO_LOADING,
  GET_TODO_SUCCESS,
  REMOVE_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS
} from "./actionTypes";

export const addTodoLoading = () => {
  return {
    type: ADD_TODO_LOADING
  };
};
export const addToSuccess = (data) => {
  return {
    type: ADD_TODO_SUCCESS,
    payload: data
  };
};
export const addTodoError = () => {
  return {
    type: ADD_TODO_ERROR
  };
};

export const getTodoLoading = () => {
  return {
    type: GET_TODO_LOADING
  };
};
export const getToSuccess = (data) => {
  return {
    type: GET_TODO_SUCCESS,
    payload: data
  };
};
export const getTodoError = () => {
  return {
    type: GET_TODO_ERROR
  };
};

export const removeTodoSuccess = (data) => {
  return {
    type: REMOVE_TODO_SUCCESS,
    payload: data
  };
};

export const updateTodoSuccess = (data) => {
  return {
    type: UPDATE_TODO_SUCCESS,
    payload: data
  };
};
