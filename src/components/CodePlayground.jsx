import { useState, useRef } from 'react';

function runCode(code) {
  const logs = [];
  const sandbox = {
    console: {
      log: (...args) => logs.push({ type: 'log', text: args.map(stringify).join(' ') }),
      error: (...args) => logs.push({ type: 'error', text: args.map(stringify).join(' ') }),
      warn: (...args) => logs.push({ type: 'warn', text: args.map(stringify).join(' ') }),
    },
  };

  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function('console', code);
    fn(sandbox.console);
  } catch (err) {
    logs.push({ type: 'error', text: `${err.name}: ${err.message}` });
  }

  return logs;
}

function stringify(val) {
  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (typeof val === 'function') return val.toString();
  if (typeof val === 'object') {
    try { return JSON.stringify(val, null, 2); } catch { return String(val); }
  }
  return String(val);
}

export default function CodePlayground({ starter }) {
  const [code, setCode] = useState(starter);
  const [output, setOutput] = useState([]);
  const [ran, setRan] = useState(false);
  const textareaRef = useRef(null);

  function handleRun() {
    const logs = runCode(code);
    setOutput(logs);
    setRan(true);
  }

  function handleReset() {
    setCode(starter);
    setOutput([]);
    setRan(false);
  }

  function handleKeyDown(e) {
    // Tab key inserts spaces instead of tabbing away
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const spaces = '  ';
      const newCode = code.slice(0, selectionStart) + spaces + code.slice(selectionEnd);
      setCode(newCode);
      // Restore cursor position after state update
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = selectionStart + spaces.length;
          textareaRef.current.selectionEnd = selectionStart + spaces.length;
        }
      });
    }
    // Ctrl+Enter / Cmd+Enter runs code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleRun();
    }
  }

  return (
    <div className="playground">
      <div className="playground-header">
        <span className="playground-title">
          <span className="playground-dot red" />
          <span className="playground-dot yellow" />
          <span className="playground-dot green" />
          Code Playground
        </span>
        <div className="playground-actions">
          <button className="btn btn-ghost" onClick={handleReset}>Reset</button>
          <button className="btn btn-primary" onClick={handleRun}>
            ▶ Run <kbd>Ctrl+↵</kbd>
          </button>
        </div>
      </div>

      <div className="playground-editor">
        <textarea
          ref={textareaRef}
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>

      {ran && (
        <div className="playground-output">
          <div className="output-header">Output</div>
          {output.length === 0 ? (
            <div className="output-empty">No output</div>
          ) : (
            output.map((line, i) => (
              <div key={i} className={`output-line output-line--${line.type}`}>
                <span className="output-prefix">
                  {line.type === 'error' ? '✗' : line.type === 'warn' ? '⚠' : '>'}
                </span>
                <pre className="output-text">{line.text}</pre>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
