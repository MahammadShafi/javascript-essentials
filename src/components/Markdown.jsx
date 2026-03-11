/**
 * Minimal Markdown renderer — handles:
 *  ## headings, ### headings
 *  **bold**, `inline code`
 *  ```code blocks```
 *  - list items
 *  blank lines → paragraphs
 */
export default function Markdown({ content }) {
  const lines = content.split('\n');
  const elements = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    if (line.startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre key={key++} className="md-code-block">
          <code>{codeLines.join('\n')}</code>
        </pre>
      );
      i++;
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="md-h2">{inline(line.slice(3))}</h2>);
      i++;
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="md-h3">{inline(line.slice(4))}</h3>);
      i++;
      continue;
    }

    // List item
    if (line.startsWith('- ')) {
      const items = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(<li key={i}>{inline(lines[i].slice(2))}</li>);
        i++;
      }
      elements.push(<ul key={key++} className="md-list">{items}</ul>);
      continue;
    }

    // Blank line — skip
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph
    elements.push(<p key={key++} className="md-p">{inline(line)}</p>);
    i++;
  }

  return <div className="markdown">{elements}</div>;
}

function inline(text) {
  // Split on **bold**, `code`, and regular text
  const parts = [];
  const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
  let last = 0;
  let match;
  let k = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith('`')) {
      parts.push(<code key={k++} className="md-inline-code">{token.slice(1, -1)}</code>);
    } else {
      parts.push(<strong key={k++}>{token.slice(2, -2)}</strong>);
    }
    last = match.index + token.length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
