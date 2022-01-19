import {
  ADD_TODO,
  ADD_TODO_ERROR,
  ADD_TODO_LOADING,
  ADD_TODO_SUCCESS,
  GET_TODO_ERROR,
  GET_TODO_LOADING,
  GET_TODO_SUCCESS,
  REMOVE_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS
} from "./actionTypes";
const init = { loading: false, todos: [], error: false };
export const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload]
      };

    case ADD_TODO_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: [...state.todos, payload],
        loading: false
      };

    case ADD_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case GET_TODO_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_TODO_SUCCESS:
      return {
        ...state,
        todos: payload,
        loading: false
      };

    case GET_TODO_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };

    case REMOVE_TODO_SUCCESS:
      return {
        ...state,
        todos: remData(state, payload),
        loading: false
      };

    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: updateDate(state, payload),
        loading: false
      };
    default:
      return state;
  }
};

function remData(state, data) {
  let todos = state.todos;
  todos = todos.filter((e) => {
    return e.id !== data;
  });
  return todos;
}

function updateDate(state, id) {
  let todos = state.todos;
  for (let i = 0; i < todos.length; i++) {
    if (todos.id === id) {
      todos.status = !todos.status;
      return;
    }
  }
  return todos;
}
