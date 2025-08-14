import CategoryList from "./CategoryList";
import SearchBox from "./SearchBox";
import "./Sidebar.css";
import UserInfo from "./UserInfo";

export default function Sidebar({ categories = [], selectedId, onSelect }) {
  return (
    <div className="side-bar-wrapper">
      <div className="side-bar-logo">
        <h1>TODO</h1>
      </div>

      <div className="search-box-wrapper">
        <i class="ri-search-line"></i>
        <SearchBox />
      </div>

      <div className="category-list-wrapper">
        <CategoryList
          categories={categories}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </div>

      <div className="user-info-wrapper">
        <UserInfo />
      </div>
    </div>
  );
}
