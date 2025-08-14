import { useState, useEffect } from "react";

export default function TaskList({ selectedCategory }) {
  const categoryName = selectedCategory?.name ?? "All";
  const categoryId = selectedCategory?.id;
  const formatDate = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}.${mm}.${dd}`;
  };
  const [tasks, setTasks] = useState([]);
  const [openSections, setOpenSections] = useState({
    done: true,
    progress: true,
    notStarted: true,
  });

  useEffect(() => {
    const mock = [
      {
        id: 1,
        text: "엄마한테 전화하기",
        date: "2025.08.13",
        status: "done",
        categoryName: "Life",
      },
      {
        id: 2,
        text: "영수증 정리하기",
        date: "2025.08.14",
        status: "done",
        categoryName: "Gym",
      },
      {
        id: 3,
        text: "운동 30분",
        date: "2025.08.14",
        status: "none",
        categoryName: "건강",
      },
      {
        id: 4,
        text: "독서 20쪽",
        date: "2025.08.14",
        status: "none",
        categoryName: "취미",
      },
      {
        id: 5,
        text: "코드 리팩토링",
        date: "2025.08.14",
        status: "progress",
        categoryName: "공부",
      },
    ];
    setTasks(mock);
  }, []);

  const visibleTasks = tasks.filter(
    (t) => !categoryName || t.categoryName === categoryName
  );

  const doneTasks = visibleTasks.filter((t) => t.status === "done");
  const progressTasks = visibleTasks.filter((t) => t.status === "progress");
  const notStartedTasks = visibleTasks.filter((t) => t.status === "none");

  // 진행률 계산
  const totalCount = visibleTasks.length;
  const percent = totalCount
    ? Math.round((doneTasks.length / totalCount) * 100)
    : 0;

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // ✅ 입력값 상태
  const [newTitle, setNewTitle] = useState("");

  // ✅ 추가 핸들러 (콘솔로 전송)
  // ✅ 추가 핸들러 (오늘날짜 ~ 오늘날짜)
  const handleAdd = () => {
    const title = newTitle.trim();
    if (!title) return;

    const todayStr = formatDate(new Date());

    // 서버 전송 대신 콘솔 출력 (start/end 함께 보내면 더 명확)
    const payload = {
      title,
      startDate: todayStr,
      endDate: todayStr,
      status: "none", // 시작전
      categoryName, // 현재 카테고리 이름
    };
    console.log("POST /api/tasks (mock):", JSON.stringify(payload));

    // UI에도 즉시 반영 (렌더는 task.date ~ task.date 구조를 쓰고 있으니 date 하나만 저장)
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: title,
        date: todayStr,
        status: "none",
        categoryName,
      },
    ]);

    setNewTitle("");
  };

  // ✅ Enter 입력 처리
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="task-list-wrapper">
      {/* 헤더 */}
      <div className="task-list-header">
        <div className="task-title">
          <h1 className="task-name">{categoryName}</h1>
          <h1 className="task-logo">TODO</h1>
        </div>
        <div className="progress-ring" aria-label={`progress ${percent}%`}>
          <div className="progress-ring__pie" style={{ ["--p"]: percent }}>
            <span>{percent}%</span>
          </div>
        </div>
      </div>

      {/* 오늘의 일기 버튼 */}
      <button className="diary-button" type="button">
        오늘의 일기.
      </button>

      {/* 입력 */}
      <div className="add-todo">
        <i className="ri-edit-2-line"></i>
        <input
          placeholder="오늘 할일을 추가해보세요."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="add-btn"
          type="button"
          onClick={handleAdd}
          disabled={!newTitle.trim()}
        >
          <i className="ri-add-line"></i>
        </button>
      </div>

      {/* 완료 섹션 */}
      <section className="task-section">
        <button
          className="section-header"
          onClick={() => toggleSection("done")}
        >
          <span className="dot blue"></span>
          <span className="section-title">완료 ({doneTasks.length})</span>
          <i
            className={`ri-arrow-${
              openSections.done ? "up" : "down"
            }-s-line right`}
          ></i>
        </button>
        {openSections.done &&
          doneTasks.map((task) => (
            <article className="task-card done" key={task.id}>
              <div className="task-meta">
                {task.date} ~ {task.date}
              </div>
              <div className="task-main">
                <div className="left">
                  <span className="task-text">{task.text}</span>
                </div>
                <div className="right">
                  <i className="ri-arrow-up-line"></i>
                  <i className="ri-arrow-down-line"></i>
                  <i className="ri-delete-bin-line"></i>
                </div>
              </div>
            </article>
          ))}
      </section>

      {/* 진행중 섹션 */}
      <section className="task-section">
        <button
          className="section-header"
          onClick={() => toggleSection("progress")}
        >
          <span className="dot green"></span>
          <span className="section-title">진행중 ({progressTasks.length})</span>
          <i
            className={`ri-arrow-${
              openSections.progress ? "up" : "down"
            }-s-line right`}
          ></i>
        </button>
        {openSections.progress &&
          progressTasks.map((task) => (
            <article className="task-card" key={task.id}>
              <div className="task-meta">
                {task.date} ~ {task.date}
              </div>
              <div className="task-main">
                <div className="left">
                  <span className="task-text">{task.text}</span>
                </div>
                <div className="right">
                  <i className="ri-arrow-up-line"></i>
                  <i className="ri-arrow-down-line"></i>
                  <i className="ri-delete-bin-line"></i>
                </div>
              </div>
            </article>
          ))}
      </section>

      {/* 시작전 섹션 */}
      <section className="task-section">
        <button
          className="section-header"
          onClick={() => toggleSection("notStarted")}
        >
          <span className="dot gray"></span>
          <span className="section-title">
            시작전 ({notStartedTasks.length})
          </span>
          <i
            className={`ri-arrow-${
              openSections.notStarted ? "up" : "down"
            }-s-line right`}
          ></i>
        </button>
        {openSections.notStarted &&
          notStartedTasks.map((task) => (
            <article className="task-card" key={task.id}>
              <div className="task-meta">
                {task.date} ~ {task.date}
              </div>
              <div className="task-main">
                <div className="left">
                  <span className="task-text">{task.text}</span>
                </div>
                <div className="right">
                  <i className="ri-arrow-up-line"></i>
                  <i className="ri-arrow-down-line"></i>
                  <i className="ri-delete-bin-line"></i>
                </div>
              </div>
            </article>
          ))}
      </section>
    </div>
  );
}
