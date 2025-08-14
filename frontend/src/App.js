// App.jsx
import { useEffect, useState, Navigate, Routes, Route } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import TaskBoard from "./components/todos/TaskBoard";
import Calendar from "./components/calendar/Calendar";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // 임시 카테고리
    const mock = [
      { id: 1, name: "Life" },
      { id: 2, name: "Work" },
      { id: 3, name: "Gym" },
    ];
    setCategories(mock);
    setSelectedCategory(mock[0]); // 기본 선택: Life
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Sidebar
            categories={categories}
            selectedId={selectedCategory?.id}
            onSelect={setSelectedCategory} // ← 클릭 시 여기로 올라옴
          />
          <TaskBoard selectedCategory={selectedCategory} />
          <Calendar />
        </div>
      </BrowserRouter>
    </div>
  );
}
