import { useSelector, useDispatch } from "react-redux";
import { addTodoError, addTodoLoading, addToSuccess } from "../Store//action";
import { useState, useEffect } from "react";
export default function AddTodo() {
  const [text, settext] = useState("");
  const { loading, todos, error } = useSelector((state) => ({
    loading: state.loading,
    todos: state.todos,
    error: state.error
  }));

  const dispatch = useDispatch();
  return loading ? (
    <div>Loading..</div>
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <div>
      <input
        onChange={(e) => settext(e.target.value)}
        type="text"
        placeholder="add todo"
      ></input>
      <input
        type="submit"
        onClick={() => {
          dispatch(addTodoLoading());
          fetch("http://localhost:3001/todos", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: false, title: text, user: "mehtab" })
          })
            .then((d) => d.json())
            .then((res) => {
              window.location.href = `/get/${res.id}`;
              // dispatch(addToSuccess(res));
            })
            .catch((err) => {
              dispatch(addTodoError(err));
            });
        }}
      />
    </div>
  );
}
