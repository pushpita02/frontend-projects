import React, { useState, useCallback, useEffect } from 'react';
import { marked } from 'marked';
import { Github, FileText, Eye, Copy, Download } from 'lucide-react';

const defaultMarkdown = `# Welcome to Markdown Editor

## Features
- Real-time preview
- GitHub-flavored markdown
- Copy to clipboard
- Download as markdown
- Beautiful syntax highlighting

### Try it out!
1. Write markdown on the left
2. See the preview on the right
3. Use the toolbar buttons to:
   - Copy content
   - Download as .md file

#### Example Code
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

#### Example Table
| Feature | Status |
|---------|--------|
| Preview | ✅ |
| Copy | ✅ |
| Download | ✅ |

> Built with React and Marked.js
`;

function App() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [html, setHtml] = useState('');

  const convertMarkdown = useCallback(() => {
    marked.setOptions({
      gfm: true,
      breaks: true,
      sanitize: false
    });
    const converted = marked(markdown);
    setHtml(converted);
  }, [markdown]);

  useEffect(() => {
    convertMarkdown();
  }, [markdown, convertMarkdown]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-indigo-600" />
              <h1 className="text-xl font-semibold text-gray-900">Markdown Editor</h1>
            </div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Toolbar */}
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 flex items-center space-x-4">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </button>
            <button
              onClick={downloadMarkdown}
              className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </button>
          </div>

          {/* Editor and Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
            {/* Editor */}
            <div className="h-[calc(100vh-16rem)]">
              <div className="px-4 py-2 bg-gray-50 border-b flex items-center">
                <FileText className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Editor</span>
              </div>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-full px-4 py-3 focus:outline-none font-mono text-sm resize-none"
                placeholder="Enter markdown here..."
              />
            </div>

            {/* Preview */}
            <div className="h-[calc(100vh-16rem)]">
              <div className="px-4 py-2 bg-gray-50 border-b flex items-center">
                <Eye className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Preview</span>
              </div>
              <div
                className="prose max-w-none p-4 h-full overflow-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;