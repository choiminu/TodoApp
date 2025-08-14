import "./AuthLanding.css";
import { useNavigate } from "react-router-dom";

export default function AuthLanding({ onLogin, onSignup }) {
  const navigate = useNavigate();

  return (
    <div className="auth-landing">
      <div className="auth-card">
        <h1 className="brand">
          <span className="brand-line1">Life</span>
          <span className="brand-line2">TODO</span>
        </h1>

        <p className="tagline">오늘을 가볍게 정리하세요.</p>

        <div className="cta">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => navigate("/login")}
          >
            로그인
          </button>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </div>

        <div className="divider">
          <span>또는</span>
        </div>

        <div className="socials">
          <button
            className="social-btn"
            type="button"
            aria-label="Google로 계속하기"
          >
            <i className="ri-google-fill" />
            <span>Google</span>
          </button>
          <button
            className="social-btn"
            type="button"
            aria-label="GitHub로 계속하기"
          >
            <i className="ri-github-fill" />
            <span>GitHub</span>
          </button>
        </div>

        <p className="small">
          계속하면 <a href="/terms">이용약관</a>과{" "}
          <a href="/privacy">개인정보 처리방침</a>에 동의하게 됩니다.
        </p>
      </div>
    </div>
  );
}
