import { useEffect } from "react";
import "./App.css";
import Formtask from "./components/Formtask";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import TaskList from "./components/TaskList";

function App() {
  useEffect(() => {
    if (!localStorage.getItem("tasks"))
      localStorage.setItem("tasks", JSON.stringify([]));
  }, []);
  return (
    <>
      <Link to="/create">Create</Link>
      <Link to="/">Home</Link>

      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/create" element={<Formtask />} />
        <Route path="/edit/:index" element={<Formtask />} />

      </Routes>
    </>
  );
}

export default App;
