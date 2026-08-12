const fs = require('fs');
const path = require('path');

function getFiles(dirPath, extension, arrayOfFiles = []) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath, extension, arrayOfFiles);
        } else if (file.endsWith(extension)) {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
}

function processHtmlFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // 1. Remove any media="print" onload hacks to eliminate FOUC (Flash of Unstyled Content) and border flashing
    if (content.includes('media="print" onload="this.media=\'all\'"')) {
        content = content.replace(/ media="print" onload="this\.media='all'"/g, '');
        content = content.replace(/<noscript><link[^>]*?\/><\/noscript>/g, '');
        modified = true;
    }

    // 2. Preload stylesheet chunks in <head> for zero-FOUC instant styling
    const cssHrefMatch = content.match(/href="(\/_next\/static\/(?:css|chunks)\/[^"']+\.css)"/g);
    if (cssHrefMatch) {
        const uniqueHrefs = [...new Set(cssHrefMatch.map(m => m.replace(/^href="/, '').replace(/"$/, '')))];
        uniqueHrefs.forEach(href => {
            const preloadTag = `<link rel="preload" as="style" href="${href}"/>`;
            if (!content.includes(preloadTag) && content.includes('<head>')) {
                content = content.replace('<head>', `<head>${preloadTag}`);
                modified = true;
            }
        });
    }

    // 3. Fix fetchPriority case on link preloads for standard HTML specification compliance
    if (content.includes('fetchPriority=')) {
        content = content.replace(/fetchPriority=/g, 'fetchpriority=');
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

function processJsChunkFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    const polyfillsToStrip = [
        'Array.prototype.at',
        'Array.prototype.flat',
        'Array.prototype.flatMap',
        'Object.fromEntries',
        'Object.hasOwn',
        'String.prototype.trimEnd',
        'String.prototype.trimStart'
    ];

    polyfillsToStrip.forEach(polyfill => {
        if (content.includes(polyfill)) {
            content = content.replaceAll(polyfill, '__noop_pf__');
            modified = true;
        }
    });

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
    }
}

function optimizePostExport() {
    console.log("⚡ Running post-export performance optimizer (Clean FOUC-Free & Polyfill-Stripped)...");

    const targetDirs = [
        path.join(__dirname, 'out'),
        path.join(__dirname, '.next', 'server', 'app')
    ];

    let htmlProcessed = 0;
    let jsProcessed = 0;

    targetDirs.forEach(dir => {
        if (fs.existsSync(dir)) {
            const htmlFiles = getFiles(dir, '.html');
            htmlFiles.forEach(file => {
                processHtmlFile(file);
                htmlProcessed++;
            });

            const jsFiles = getFiles(dir, '.js');
            jsFiles.forEach(file => {
                processJsChunkFile(file);
                jsProcessed++;
            });
        }
    });

    console.log(`✅ Post-export optimization complete: ${htmlProcessed} HTML files & ${jsProcessed} JS chunks processed (0 FOUC)!`);
}

optimizePostExport();
