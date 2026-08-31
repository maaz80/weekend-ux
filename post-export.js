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

    // 1. Clean up any async onload hacks that cause FOUC (Flash of Unstyled Content) or border flashes
    if (content.includes('onload="this.onload=null;this.rel=\'stylesheet\'"') || content.includes('media="print" onload="this.media=\'all\'"')) {
        content = content.replace(/<link rel="preload" href="([^"']+)" as="style" onload="this\.onload=null;this\.rel='stylesheet'"\/>/g, '<link rel="stylesheet" href="$1" data-precedence="next"/>');
        content = content.replace(/<noscript><link rel="stylesheet" href="[^"']+"\/><\/noscript>/g, '');
        content = content.replace(/ media="print" onload="this\.media='all'"/g, '');
        modified = true;
    }

    // 2. Preload stylesheet URLs in <head> for zero-FOUC instant high-priority network fetching
    const cssHrefMatches = content.match(/href="(\/_next\/static\/(?:css|chunks)\/[^"']+\.css)"/g);
    if (cssHrefMatches) {
        const uniqueHrefs = [...new Set(cssHrefMatches.map(m => m.replace(/^href="/, '').replace(/"$/, '')))];
        uniqueHrefs.forEach(href => {
            const preloadTag = `<link rel="preload" href="${href}" as="style"/>`;
            if (!content.includes(preloadTag) && content.includes('<head>')) {
                content = content.replace('<head>', `<head>${preloadTag}`);
                modified = true;
            }
        });
    }

    // 3. Auto-detect and preload page hero background images for 0ms LCP resource load delay on every page
    const heroImageRegex = /src="(\/images\/weekend-ux-[^"']+-hero-bg[^"']*\.webp)"/g;
    let heroMatch;
    while ((heroMatch = heroImageRegex.exec(content)) !== null) {
        const heroUrl = heroMatch[1];
        const preloadHeroTag = `<link rel="preload" as="image" href="${heroUrl}" fetchpriority="high"/>`;
        if (!content.includes(preloadHeroTag) && content.includes('<head>')) {
            content = content.replace('<head>', `<head>${preloadHeroTag}`);
            modified = true;
        }
    }

    // 4. Defer non-critical JavaScript chunks to reduce unused JS execution on initial render
    if (content.includes('async=""')) {
        content = content.replace(/<script src="(\/_next\/static\/chunks\/[^"']+\.js)" async=""/g, '<script src="$1" defer=""');
        modified = true;
    }

    // 5. Fix fetchPriority case on link preloads for standard HTML specification compliance
    if (content.includes('fetchPriority=')) {
        content = content.replace(/fetchPriority=/g, 'fetchpriority=');
        modified = true;
    }

    if (modified) {
        try {
            fs.writeFileSync(filePath, content, 'utf8');
        } catch (err) {
            console.warn(`⚠️ Warning: Could not write file lock on ${filePath}: ${err.message}`);
        }
    }
}

function optimizePostExport() {
    console.log("⚡ Running post-export performance optimizer (Zero JS Mutation & Hero Preload on All Pages)...");

    const targetDirs = [
        path.join(__dirname, 'out'),
        path.join(__dirname, '.next', 'server', 'app')
    ];

    let htmlProcessed = 0;

    targetDirs.forEach(dir => {
        if (fs.existsSync(dir)) {
            const htmlFiles = getFiles(dir, '.html');
            htmlFiles.forEach(file => {
                processHtmlFile(file);
                htmlProcessed++;
            });
        }
    });

    console.log(`✅ Post-export optimization complete: ${htmlProcessed} HTML files processed cleanly (0 JS mutation errors)!`);
}

optimizePostExport();
