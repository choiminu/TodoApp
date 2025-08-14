import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="login-container">
        <button type="button" onClick={() => navigate("/login")}>
          Login
        </button>
        <button type="button" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>
    </div>
  );
}
