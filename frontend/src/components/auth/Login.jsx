import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login({ onSuccess, onGoSignup }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v);
  const canSubmit =
    isValidEmail(form.email) && form.password.length >= 6 && !submitting;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    console.log(
      "POST /api/login (mock):",
      JSON.stringify({ email: form.email, password: form.password })
    );

    onSuccess?.({ id: 1, email: form.email });

    setSubmitting(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">로그인</h1>

        <form className="login-form" onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={onChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">비밀번호</label>
            <div className="pw-wrap">
              <input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                placeholder="6자 이상"
                value={form.password}
                onChange={onChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                <i className={showPw ? "ri-eye-off-line" : "ri-eye-line"} />
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={!canSubmit}
          >
            {submitting ? "로그인 중..." : "로그인"}
          </button>
        </form>

        <div className="login-bottom">
          <span>계정이 없으세요?</span>
          <button
            type="button"
            className="link"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}
