import "./styles.css";
import { Route, Routes } from "react-router-dom";
import AddTodo from "./Components/AddTodo";
import GetTodo from "./Components/GetTodo";
import Task from "./Components/Task";
import Stats from "./Components/Stats";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AddTodo />}>
          {" "}
        </Route>
        <Route path="/getAll" element={<GetTodo />}>
          {" "}
        </Route>
        <Route path="/get/:id" element={<Task />}>
          {" "}
        </Route>
        <Route path="/stats" element={<Stats />}>
          {" "}
        </Route>
      </Routes>
    </>
  );
}
