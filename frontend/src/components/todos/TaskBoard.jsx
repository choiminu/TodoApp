import "./TaskBoard.css";
import { useLocation } from "react-router-dom";
import TaskList from "./TaskList";
import AuthLanding from "../auth/AuthLanding";
import Login from "../auth/Login";
import Signup from "../auth/Signup";

export default function TaskBoard({ selectedCategory }) {
  const { pathname } = useLocation();
  if (pathname === "/signup")
    return (
      <div className="task-board-wrapper">
        <Signup />
      </div>
    );

  if (pathname === "/login")
    return (
      <div className="task-board-wrapper">
        <Login />
      </div>
    );

  if (pathname === "/todo")
    return (
      <div className="task-board-wrapper">
        <TaskList selectedCategory={selectedCategory} />
      </div>
    );
  return (
    <div className="task-board-wrapper">
      <TaskList selectedCategory={selectedCategory} />
    </div>
  );
}
