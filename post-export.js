const fs = require('fs');
const path = require('path');

function getHtmlFiles(dirPath, arrayOfFiles = []) {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            getHtmlFiles(fullPath, arrayOfFiles);
        } else if (file.endsWith('.html')) {
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

function optimizePostExport() {
    console.log("⚡ Running post-export performance optimizer...");

    const targetDirs = [
        path.join(__dirname, 'out'),
        path.join(__dirname, '.next', 'server', 'app')
    ];

    let totalProcessed = 0;
    targetDirs.forEach(dir => {
        if (fs.existsSync(dir)) {
            const htmlFiles = getHtmlFiles(dir);
            htmlFiles.forEach(file => {
                processHtmlFile(file);
                totalProcessed++;
            });
        }
    });

    console.log(`✅ Post-export optimization complete: ${totalProcessed} HTML files processed for non-blocking CSS & instant LCP!`);
}

optimizePostExport();
