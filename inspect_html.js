const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'out', 'index.html');
if (!fs.existsSync(htmlPath)) {
  console.error("out/index.html not found");
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

console.log("=== 1. PRELOAD HEAD TAGS ===");
const preloads = html.match(/<link[^>]*rel="preload"[^>]*>/gi) || [];
preloads.forEach(p => console.log(p));

console.log("\n=== 2. HOME HERO IMAGE (LCP) ===");
const heroImgMatch = html.match(/<img[^>]*alt="[^"]*hero[^"]*"[^>]*>/gi) || html.match(/<img[^>]*priority[^>]*>/gi) || [];
console.log("Hero img tag count:", heroImgMatch.length);
heroImgMatch.forEach(img => {
  console.log(img);
});

console.log("\n=== 3. ALL IMAGE TAGS AUDIT (SRC, SRCSET, SIZES) ===");
const imgTags = html.match(/<img[^>]*>/gi) || [];
console.log("Total <img> tags found:", imgTags.length);

imgTags.forEach((img, idx) => {
  const srcMatch = img.match(/src="([^"]*)"/i);
  const srcsetMatch = img.match(/srcset="([^"]*)"/i);
  const sizesMatch = img.match(/sizes="([^"]*)"/i);
  const altMatch = img.match(/alt="([^"]*)"/i);

  const src = srcMatch ? srcMatch[1] : 'NONE';
  const srcset = srcsetMatch ? srcsetMatch[1] : 'NONE';
  const sizes = sizesMatch ? sizesMatch[1] : 'NONE';
  const alt = altMatch ? altMatch[1] : '';

  console.log(`\n--- Img #${idx + 1} [alt="${alt}"] ---`);
  console.log(`SRC:   ${src.substring(0, 120)}${src.length > 120 ? '...' : ''}`);
  console.log(`SIZES: ${sizes}`);
  if (srcset !== 'NONE') {
    const candidates = srcset.split(', ').map(c => {
      const parts = c.split(' ');
      return parts[1] || parts[0];
    });
    console.log(`SRCSET Candidates (${candidates.length}): [${candidates.slice(0, 3).join(', ')} ... ${candidates.slice(-3).join(', ')}]`);
  } else {
    console.log(`SRCSET: NONE`);
  }
});
