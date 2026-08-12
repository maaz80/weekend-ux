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

    // 1. Convert render-blocking CSS links into non-render-blocking async CSS
    const cssLinkRegex = /<link([^>]*?\brel=["']stylesheet["'][^>]*?\bhref=["']\/_next\/static\/(?:css|chunks)\/[^"']+\.css["'][^>]*?)\/?>/gi;

    content = content.replace(cssLinkRegex, (match, p1) => {
        if (match.includes('media=') || match.includes('onload=')) {
            return match;
        }
        const cleanAttributes = p1.replace(/\/+$/, '').trim();
        modified = true;
        const nonBlockingLink = `<link ${cleanAttributes} media="print" onload="this.media='all'"/>`;
        const noscriptFallback = `<noscript><link ${cleanAttributes}/></noscript>`;
        return `${nonBlockingLink}${noscriptFallback}`;
    });

    // 2. Fix fetchPriority case on link preloads for standard HTML specification compliance
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
    console.log("⚡ Running post-export performance optimizer...");

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

    console.log(`✅ Post-export optimization complete: ${htmlProcessed} HTML files & ${jsProcessed} JS chunks processed!`);
}

optimizePostExport();
