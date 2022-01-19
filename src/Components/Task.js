import { Route, Routes, useParams } from "react-router-dom";
import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getTodoError,
  getTodoLoading,
  getToSuccess,
  removeTodoSuccess,
  updateTodoSuccess
} from "../Store//action";
const axios = require("axios");

export default function Task() {
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
  const { loading, todos, error } = useSelector((state) => ({
    loading: state.loading,
    todos: state.todos,
    error: state.error
  }));
  const dispatch = useDispatch();
  let { id } = useParams();
  useEffect(() => {
    getTodo();
  }, []);

  async function getTodo() {
    dispatch(getTodoLoading());
    try {
      const data = await fetch(`http://localhost:3001/todos/${id}`).then((d) =>
        d.json()
      );
      if (data.length === 0) {
        dispatch(getTodoError());
        return;
      } else {
        console.log(data);
        dispatch(getToSuccess(data));
      }
    } catch (err) {
      dispatch(getTodoError());
    }
  }
  return loading ? (
    <div>Loading..</div>
  ) : error ? (
    <div>Something went wrong</div>
  ) : todos.id ? (
    <div>
      <p>{todos.title}</p>
      <input onClick={() => toggle(todos)} value={todos.status} type="submit" />
      <button onClick={() => remove(todos.id)}>Remove</button>
    </div>
  ) : (
    <div>No item </div>
  );
}
