import { useState } from 'react';

export default function Quiz({ questions, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState(false);

  const q = questions[current];
  const totalCorrect = answers.filter(Boolean).length;

  function handleSelect(idx) {
    if (!submitted) setSelected(idx);
  }

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
    setAnswers((prev) => [...prev, selected === q.answer]);
  }

  function handleNext() {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      setDone(true);
      const finalScore = [...answers, selected === q.answer].filter(Boolean).length;
      onComplete(finalScore === questions.length);
    }
  }

  if (done) {
    const score = answers.filter(Boolean).length;
    const passed = score === questions.length;
    return (
      <div className="quiz-result">
        <div className={`quiz-result-icon ${passed ? 'quiz-result-icon--pass' : 'quiz-result-icon--fail'}`}>
          {passed ? '🎉' : '📚'}
        </div>
        <h3 className="quiz-result-title">
          {passed ? 'Perfect score!' : `${score}/${questions.length} correct`}
        </h3>
        <p className="quiz-result-msg">
          {passed
            ? 'Excellent! You have mastered this topic.'
            : 'Good effort! Review the lesson and try again.'}
        </p>
        {passed && <div className="quiz-badge">Lesson Complete ✓</div>}
      </div>
    );
  }

  return (
    <div className="quiz">
      <div className="quiz-header">
        <span className="quiz-progress-text">
          Question {current + 1} of {questions.length}
        </span>
        <div className="quiz-progress-dots">
          {questions.map((_, i) => (
            <span
              key={i}
              className={`quiz-dot ${
                i < answers.length
                  ? answers[i]
                    ? 'quiz-dot--correct'
                    : 'quiz-dot--wrong'
                  : i === current
                  ? 'quiz-dot--current'
                  : ''
              }`}
            />
          ))}
        </div>
      </div>

      <p className="quiz-question">{q.question}</p>

      <div className="quiz-options">
        {q.options.map((opt, idx) => {
          let cls = 'quiz-option';
          if (submitted) {
            if (idx === q.answer) cls += ' quiz-option--correct';
            else if (idx === selected) cls += ' quiz-option--wrong';
          } else if (idx === selected) {
            cls += ' quiz-option--selected';
          }
          return (
            <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
              <span className="quiz-option-letter">{String.fromCharCode(65 + idx)}</span>
              <span>{opt}</span>
              {submitted && idx === q.answer && <span className="quiz-option-check">✓</span>}
              {submitted && idx === selected && idx !== q.answer && (
                <span className="quiz-option-x">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className={`quiz-feedback ${selected === q.answer ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'}`}>
          {selected === q.answer
            ? '✓ Correct!'
            : `✗ Incorrect — the correct answer is "${q.options[q.answer]}"`}
        </div>
      )}

      <div className="quiz-actions">
        {!submitted ? (
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={selected === null}
          >
            Submit Answer
          </button>
        ) : (
          <button className="btn btn-primary" onClick={handleNext}>
            {current + 1 < questions.length ? 'Next Question →' : 'Finish Quiz'}
          </button>
        )}
      </div>
    </div>
  );
}
