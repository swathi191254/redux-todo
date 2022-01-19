//edit data
// total task
//total completed

import { useSelector, useDispatch } from "react-redux";
import {
  getTodoError,
  getTodoLoading,
  getToSuccess,
  removeTodoSuccess,
  updateTodoSuccess
} from "../Store//action";
import { useEffect } from "react";
const axios = require("axios");
export default function AddTodo() {
  const { loading, todos, error } = useSelector((state) => ({
    loading: state.loading,
    todos: state.todos,
    error: state.error
  }));
  useEffect(() => {
    getTodo();
  }, []);

  async function getTodo() {
    dispatch(getTodoLoading());
    try {
      const data = await fetch("http://localhost:3001/todos").then((d) =>
        d.json()
      );
      dispatch(getToSuccess(data));
    } catch (err) {
      dispatch(getTodoError());
    }
  }

  const remove = (id) => {
    dispatch(getTodoLoading());
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      .then((resp) => {
        dispatch(removeTodoSuccess(id));
      })
      .catch((error) => {
        dispatch(getTodoError());
        console.log(error);
      });
  };

  const toggle = ({ id, status }) => {
    let newStatus = !status;
    console.log(newStatus);
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: newStatus
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(updateTodoSuccess(id));
        getTodo();
      });
  };

  const dispatch = useDispatch();
  return loading ? (
    <div>Loading..</div>
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <div>
      <>
        {todos.map((e) => {
          return (
            <>
              <p>{e.title}</p>
              <input onClick={() => toggle(e)} value={e.status} type="submit" />
              <button onClick={() => remove(e.id)}>Remove</button>
            </>
          );
        })}
      </>
    </div>
  );
}
