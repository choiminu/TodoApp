import { useState } from "react";
// 로그인 페이지와 동일 스타일 재사용
import "./Login.css"; // 없으면 경로를 맞게 수정하세요

export default function Signup({ onSuccess, onGoLogin }) {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v);

  // 유효성
  const emailError =
    form.email !== "" && !isValidEmail(form.email)
      ? "유효한 이메일을 입력하세요."
      : "";
  const pwError =
    form.password !== "" && form.password.length < 6
      ? "비밀번호는 6자 이상이어야 합니다."
      : "";
  const confirmError =
    form.confirm !== "" && form.confirm !== form.password
      ? "비밀번호가 일치하지 않습니다."
      : "";

  const canSubmit =
    isValidEmail(form.email) &&
    form.password.length >= 6 &&
    form.confirm === form.password &&
    !submitting;

  const onChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);

    // 실제 서버 대신 콘솔 출력 (mock)
    const payload = { email: form.email, password: form.password };
    console.log("POST /api/signup (mock):", JSON.stringify(payload));

    // 성공 콜백 (선택)
    onSuccess?.({ id: 1, email: form.email });

    setSubmitting(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">회원가입</h1>

        <form className="login-form" onSubmit={onSubmit} noValidate>
          {/* 이메일 */}
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
            {emailError && <small className="error">{emailError}</small>}
          </div>

          {/* 비밀번호 */}
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
                autoComplete="new-password"
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
            {pwError && <small className="error">{pwError}</small>}
          </div>

          {/* 비밀번호 확인 */}
          <div className="field">
            <label htmlFor="confirm">비밀번호 확인</label>
            <div className="pw-wrap">
              <input
                id="confirm"
                name="confirm"
                type={showConfirmPw ? "text" : "password"}
                placeholder="비밀번호 재입력"
                value={form.confirm}
                onChange={onChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowConfirmPw((s) => !s)}
                aria-label={showConfirmPw ? "비밀번호 숨기기" : "비밀번호 보기"}
              >
                <i
                  className={showConfirmPw ? "ri-eye-off-line" : "ri-eye-line"}
                />
              </button>
            </div>
            {confirmError && <small className="error">{confirmError}</small>}
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={!canSubmit}
          >
            {submitting ? "가입 중..." : "가입하기"}
          </button>
        </form>

        <div className="login-bottom">
          <span>이미 계정이 있으세요?</span>
          <button
            type="button"
            className="link"
            onClick={() =>
              onGoLogin ? onGoLogin() : (window.location.href = "/login")
            }
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
