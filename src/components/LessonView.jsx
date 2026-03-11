import { useState } from 'react';
import Markdown from './Markdown';
import CodePlayground from './CodePlayground';
import Quiz from './Quiz';

const TABS = ['lesson', 'playground', 'quiz'];

export default function LessonView({ lesson, isComplete, onComplete, onNext, isLast }) {
  const [tab, setTab] = useState('lesson');

  return (
    <div className="lesson-view">
      <div className="lesson-header">
        <div className="lesson-header-top">
          <span className="lesson-header-icon">{lesson.icon}</span>
          <div>
            <h2 className="lesson-header-title">{lesson.title}</h2>
            <p className="lesson-header-desc">{lesson.description}</p>
          </div>
          {isComplete && <span className="lesson-complete-badge">✓ Complete</span>}
        </div>

        <div className="tab-bar">
          {TABS.map((t) => (
            <button
              key={t}
              className={`tab-btn ${tab === t ? 'tab-btn--active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'lesson' && '📖 Lesson'}
              {t === 'playground' && '💻 Playground'}
              {t === 'quiz' && '🧠 Quiz'}
            </button>
          ))}
        </div>
      </div>

      <div className="lesson-body">
        {tab === 'lesson' && (
          <div className="lesson-content">
            <Markdown content={lesson.content} />
            <div className="lesson-footer">
              <button className="btn btn-primary" onClick={() => setTab('playground')}>
                Try it in the Playground →
              </button>
            </div>
          </div>
        )}

        {tab === 'playground' && (
          <div className="playground-wrap">
            <CodePlayground starter={lesson.playground.starter} />
            <div className="lesson-footer">
              <button className="btn btn-primary" onClick={() => setTab('quiz')}>
                Take the Quiz →
              </button>
            </div>
          </div>
        )}

        {tab === 'quiz' && (
          <div className="quiz-wrap">
            <Quiz
              key={lesson.id}
              questions={lesson.quiz}
              onComplete={(passed) => {
                if (passed) onComplete(lesson.id);
              }}
            />
            {isComplete && !isLast && (
              <div className="lesson-footer">
                <button className="btn btn-primary" onClick={onNext}>
                  Next Lesson →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
