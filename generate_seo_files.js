const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

// Project Configuration
const SITE_URL = 'https://www.weekendux.com'; // Canonical main domain (www)
const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://weekend-backend.onrender.com/api').replace(/\/$/, '');

// Helper to fetch JSON from API
function fetchJson(url) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch(e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

async function generateAllSeoFiles() {
    console.log("🚀 Generating SEO & LLM files at build time...");

    // 1. Fetch Dynamic Data from Backend API
    const [blogsData, coursesData] = await Promise.all([
        fetchJson(`${API_URL}/blogs`),
        fetchJson(`${API_URL}/courses`)
    ]);

    const urls = new Set();
    const addUrl = (relativePath) => {
        let cleanPath = relativePath.startsWith('/') ? relativePath : '/' + relativePath;
        urls.add(`${SITE_URL}${cleanPath}`);
    };

    // 2. Static Pages List
    const staticPages = [
        '/',
        '/about-us',
        '/courses',
        '/contact-us',
        '/blog',
        '/privacy-policy',
        '/disclaimer'
    ];
    staticPages.forEach(addUrl);

    // 3. Dynamic Routes Processing (Blogs & Courses)
    // Blogs: API returns { blogs: [...] }
    const blogsArray = blogsData?.blogs || blogsData?.data || (Array.isArray(blogsData) ? blogsData : []);
    blogsArray.forEach(blog => {
        if (blog.slug) addUrl(`/blog/${blog.slug}`);
    });

    // Courses: API returns { coursesPage: { course: [...] } }
    const coursesArray = coursesData?.coursesPage?.course || coursesData?.courses || (Array.isArray(coursesData) ? coursesData : []);
    coursesArray.forEach(course => {
        if (course.slug) addUrl(`/courses/${course.slug}`);
    });

    const uniqueUrls = Array.from(urls);
    const publicDir = path.join(__dirname, 'public');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    // -------------------------------------------------------------
    // FILE 1: urllist.txt
    // -------------------------------------------------------------
    fs.writeFileSync(path.join(publicDir, 'urllist.txt'), uniqueUrls.join('\n'));

    // -------------------------------------------------------------
    // FILE 2: llms.txt (Format for LLM / AI Crawlers)
    // -------------------------------------------------------------
    let llmsContent = `# ${SITE_URL} Site Summary for AI Crawlers\n\n`;
    llmsContent += `> Generated on ${new Date().toISOString()}\n\n`;
    llmsContent += `## Primary Pages\n\n`;
    uniqueUrls.forEach(url => {
        llmsContent += `- [${url}](${url})\n`;
    });
    fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsContent);

    // -------------------------------------------------------------
    // FILE 3: sitemap.xml
    // -------------------------------------------------------------
    const d = new Date();
    const pad = (n) => n < 10 ? '0' + n : n;
    const today = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}+05:30`;

    let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    uniqueUrls.forEach(url => {
        sitemapXml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`;
    });
    sitemapXml += '</urlset>';
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);

    // -------------------------------------------------------------
    // FILE 4: ror.xml (Resource-of-Resource XML Format)
    // -------------------------------------------------------------
    let rorXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    rorXml += '<rss xmlns:ror="http://rorweb.com/0.1/" version="2.0">\n';
    rorXml += `<channel>\n  <title>ROR Sitemap for ${SITE_URL}</title>\n  <link>${SITE_URL}</link>\n`;
    uniqueUrls.forEach((url, i) => {
        rorXml += `  <item>\n    <link>${url}</link>\n    <title>Page ${i + 1}</title>\n    <ror:sortOrder>${i}</ror:sortOrder>\n    <ror:resourceOf>sitemap</ror:resourceOf>\n  </item>\n`;
    });
    rorXml += '</channel>\n</rss>';
    fs.writeFileSync(path.join(publicDir, 'ror.xml'), rorXml);

    // -------------------------------------------------------------
    // FILE 5: robots.txt
    // -------------------------------------------------------------
    let robotsTxt = `# robots.txt generated at build time\n`;
    robotsTxt += `User-agent: *\nAllow: /\n\n`;
    robotsTxt += `# AI Crawlers\n`;
    robotsTxt += `User-agent: GPTBot\nAllow: /\n`;
    robotsTxt += `User-agent: ChatGPT-User\nAllow: /\n`;
    robotsTxt += `User-agent: ClaudeBot\nAllow: /\n`;
    robotsTxt += `User-agent: PerplexityBot\nAllow: /\n\n`;
    robotsTxt += `Sitemap: ${SITE_URL}/sitemap.xml\n`;
    robotsTxt += `Sitemap: ${SITE_URL}/ror.xml\n`;

    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

    console.log(`✅ Generated ${uniqueUrls.length} URLs across sitemap.xml, robots.txt, urllist.txt, ror.xml & llms.txt successfully!`);
}

generateAllSeoFiles();
