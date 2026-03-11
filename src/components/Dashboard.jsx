export default function Dashboard({ lessons, progress, onSelect }) {
  const completed = Object.values(progress).filter(Boolean).length;
  const total = lessons.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="dashboard-hero-text">
          <h2 className="dashboard-title">Welcome to JavaScript Essentials</h2>
          <p className="dashboard-subtitle">
            Master modern JavaScript through interactive lessons, a live code playground, and quizzes.
          </p>
        </div>
        <div className="dashboard-stat">
          <div className="dashboard-stat-ring">
            <svg viewBox="0 0 36 36" className="stat-ring-svg">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" strokeWidth="3" />
              <circle
                cx="18" cy="18" r="15.9"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="3"
                strokeDasharray={`${pct} ${100 - pct}`}
                strokeDashoffset="25"
                strokeLinecap="round"
              />
            </svg>
            <span className="stat-ring-label">{pct}%</span>
          </div>
          <p className="stat-ring-text">{completed}/{total} done</p>
        </div>
      </div>

      <div className="lesson-grid">
        {lessons.map((lesson) => {
          const done = progress[lesson.id];
          return (
            <button
              key={lesson.id}
              className={`lesson-card ${done ? 'lesson-card--done' : ''}`}
              onClick={() => onSelect(lesson.id)}
            >
              <div className="lesson-card-icon">{lesson.icon}</div>
              <div className="lesson-card-body">
                <h3 className="lesson-card-title">{lesson.title}</h3>
                <p className="lesson-card-desc">{lesson.description}</p>
              </div>
              <div className="lesson-card-footer">
                {done ? (
                  <span className="lesson-card-badge lesson-card-badge--done">✓ Complete</span>
                ) : (
                  <span className="lesson-card-badge">Start →</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
