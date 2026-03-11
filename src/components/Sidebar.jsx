export default function Sidebar({ lessons, currentId, progress, onSelect }) {
  const completedCount = Object.values(progress).filter(Boolean).length;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">JS</div>
        <div>
          <h1 className="sidebar-title">JS Essentials</h1>
          <p className="sidebar-subtitle">Interactive Learning</p>
        </div>
      </div>

      <div className="progress-bar-wrap">
        <div className="progress-bar-label">
          <span>Progress</span>
          <span>{completedCount}/{lessons.length}</span>
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${(completedCount / lessons.length) * 100}%` }}
          />
        </div>
      </div>

      <nav className="lesson-nav">
        {lessons.map((lesson) => {
          const done = progress[lesson.id];
          const active = lesson.id === currentId;
          return (
            <button
              key={lesson.id}
              className={`nav-item ${active ? 'nav-item--active' : ''} ${done ? 'nav-item--done' : ''}`}
              onClick={() => onSelect(lesson.id)}
            >
              <span className="nav-icon">{lesson.icon}</span>
              <span className="nav-label">{lesson.title}</span>
              {done && <span className="nav-check">✓</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
