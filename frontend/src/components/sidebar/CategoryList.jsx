import { useNavigate } from "react-router-dom";

export default function CategoryList({
  categories = [],
  selectedId,
  onSelect,
}) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="title">
        <p>My Categories</p>
      </div>

      <div className="category-list-wrapper">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={`todo-category-item ${
              selectedId === c.id ? "active" : ""
            }`}
            onClick={() => {
              onSelect(c);
              navigate("/todo");
            }}
          >
            <p>{c.name}</p>
          </button>
        ))}
      </div>

      <p className="more-category">+ New Category</p>
    </div>
  );
}
