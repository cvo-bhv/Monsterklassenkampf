import fs from 'fs';

const html = fs.readFileSync('index.html', 'utf-8');
fs.mkdirSync('src', { recursive: true });

// Extract CSS
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (cssMatch) {
  let css = cssMatch[1];
  // append to index.css
  fs.appendFileSync('src/index.css', css);
}

// Extract JS
const jsMatch = html.match(/<script type="text\/babel" data-type="module">([\s\S]*?)<\/script>/);
if (jsMatch) {
  let js = jsMatch[1];
  
  // Remove createRoot
  js = js.replace(/const root = createRoot\(document\.getElementById\('root'\)\);\s*root\.render\(<App \/>\);/, 'export default App;');
  
  fs.writeFileSync('src/App.tsx', js);
}

// Create main.tsx
const mainTsx = `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
`;
fs.writeFileSync('src/main.tsx', mainTsx);

// Create new index.html
const newHtml = `<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bruch-Monster: Klassenkampf (Cloud Edition)</title>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600;700&family=Nunito:wght@400;700;900&display=swap" rel="stylesheet">
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>`;
fs.writeFileSync('index.html', newHtml);

console.log("Extraction complete.");
