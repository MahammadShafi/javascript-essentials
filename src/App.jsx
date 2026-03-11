import { useState, useEffect } from 'react';
import { lessons } from './data/lessons';
import Sidebar from './components/Sidebar';
import LessonView from './components/LessonView';
import Dashboard from './components/Dashboard';

const STORAGE_KEY = 'js-essentials-progress';

function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export default function App() {
  const [progress, setProgress] = useState(loadProgress);
  const [currentId, setCurrentId] = useState(null); // null = dashboard
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  function markComplete(lessonId) {
    setProgress((prev) => ({ ...prev, [lessonId]: true }));
  }

  function goToNext() {
    const idx = lessons.findIndex((l) => l.id === currentId);
    if (idx < lessons.length - 1) {
      setCurrentId(lessons[idx + 1].id);
    }
  }

  const currentLesson = lessons.find((l) => l.id === currentId) ?? null;
  const isLast = currentId === lessons[lessons.length - 1].id;

  return (
    <div className={`app-layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Mobile overlay */}
      <div className="mobile-overlay" onClick={() => setSidebarOpen(false)} />

      <Sidebar
        lessons={lessons}
        currentId={currentId}
        progress={progress}
        onSelect={(id) => {
          setCurrentId(id);
          setSidebarOpen(false);
        }}
      />

      <div className="main">
        <header className="topbar">
          <button
            className="hamburger"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          <button
            className="topbar-home"
            onClick={() => { setCurrentId(null); setSidebarOpen(false); }}
          >
            🏠 Dashboard
          </button>
          {currentLesson && (
            <span className="topbar-current">{currentLesson.icon} {currentLesson.title}</span>
          )}
        </header>

        <main className="content">
          {currentLesson ? (
            <LessonView
              key={currentLesson.id}
              lesson={currentLesson}
              isComplete={!!progress[currentLesson.id]}
              onComplete={markComplete}
              onNext={goToNext}
              isLast={isLast}
            />
          ) : (
            <Dashboard
              lessons={lessons}
              progress={progress}
              onSelect={setCurrentId}
            />
          )}
        </main>
      </div>
    </div>
  );
}
