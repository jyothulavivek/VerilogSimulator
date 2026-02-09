// Script to set build time as a TypeScript constant
const fs = require('fs');
const path = require('path');

const buildTime = new Date().toISOString();
const constantsPath = path.join(__dirname, '..', 'lib', 'buildTime.ts');

// Create lib directory if it doesn't exist
const libDir = path.dirname(constantsPath);
if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
}

// Write build time constant
const content = `// Auto-generated file - do not edit manually
// Generated at build time

export const BUILD_TIME = "${buildTime}";
`;

fs.writeFileSync(constantsPath, content);
console.log(`✓ Build time set to: ${buildTime}`);
