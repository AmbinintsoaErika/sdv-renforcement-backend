const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const appDir = path.join(projectRoot, "app");
const appExampleDir = path.join(projectRoot, "app-example");

// Move existing app/ to app-example/
if (fs.existsSync(appDir)) {
  fs.renameSync(appDir, appExampleDir);
  console.log("✓ Moved app/ to app-example/");
} else {
  console.log("⚠ No app/ directory found, skipping move.");
}

// Create fresh app/ directory with a minimal index.tsx
fs.mkdirSync(appDir, { recursive: true });

const indexContent = `export default function Page() {
  return (
    <main>
      <h1>Hello World</h1>
    </main>
  );
}
`;

fs.writeFileSync(path.join(appDir, "page.tsx"), indexContent);
console.log("✓ Created app/page.tsx");

console.log("\nDone! Your project has been reset.");
console.log("The original files are preserved in app-example/");