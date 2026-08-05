const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://weekend-backend.onrender.com/api').replace(/\/$/, '');
const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://weekendux.in').replace(/\/$/, '');

function buildCanonicalUrl(pathname = '/') {
    if (!pathname || pathname === '/') return `${SITE_URL}`;
    const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
    const hasFileExtension = /\.[a-z0-9]+$/i.test(path);
    if (hasFileExtension) return `${SITE_URL}${path}`;
    return `${SITE_URL}${path}`;
}

function fetchJson(url) {
    return new Promise((resolve) => {
        const client = url.startsWith('https') ? https : http;
        client.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch (e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

async function generateAllSeoFiles() {
    console.log("🚀 Generating SEO & LLM files at build time...");

    const siteRoot = buildCanonicalUrl('/');

    const [blogsData, coursesData] = await Promise.all([
        fetchJson(`${API_URL}/blogs`),
        fetchJson(`${API_URL}/courses`)
    ]);

    const urls = new Set();
    const addUrl = (relativePath) => {
        urls.add(buildCanonicalUrl(relativePath));
    };

    const staticPages = [
        '/',
        '/about-us',
        '/courses',
        '/contact-us',
        '/blog',
        '/location',
        '/privacy-policy',
        '/disclaimer',
        '/terms-and-conditions-enrolment',
    ];
    staticPages.forEach(addUrl);

    const blogsArray = blogsData?.blogs || blogsData?.data || (Array.isArray(blogsData) ? blogsData : []);
    blogsArray.forEach(blog => {
        if (blog.slug) addUrl(`/blog/${blog.slug}`);
    });

    const coursesArray = coursesData?.coursesPage?.course || coursesData?.courses || (Array.isArray(coursesData) ? coursesData : []);
    coursesArray.forEach(course => {
        if (course.slug) addUrl(`/courses/${course.slug}`);
    });

    const uniqueUrls = Array.from(urls);
    const publicDir = path.join(__dirname, 'public');

    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(path.join(publicDir, 'urllist.txt'), uniqueUrls.join('\n'));

    let llmsContent = `# ${siteRoot} Site Summary for AI Crawlers\n\n`;
    llmsContent += `> Generated on ${new Date().toISOString()}\n\n`;
    llmsContent += `## Primary Pages\n\n`;
    uniqueUrls.forEach(url => {
        llmsContent += `- [${url}](${url})\n`;
    });
    fs.writeFileSync(path.join(publicDir, 'llms.txt'), llmsContent);

    const d = new Date();
    const pad = (n) => n < 10 ? '0' + n : n;
    const today = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}+05:30`;

    let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    uniqueUrls.forEach(url => {
        sitemapXml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${today}</lastmod>\n  </url>\n`;
    });
    sitemapXml += '</urlset>';
    fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml);

    let rorXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    rorXml += '<rss xmlns:ror="http://rorweb.com/0.1/" version="2.0">\n';
    rorXml += `<channel>\n  <title>ROR Sitemap for ${SITE_URL}</title>\n  <link>${siteRoot}</link>\n`;
    uniqueUrls.forEach((url, i) => {
        rorXml += `  <item>\n    <link>${url}</link>\n    <title>Page ${i + 1}</title>\n    <ror:sortOrder>${i}</ror:sortOrder>\n    <ror:resourceOf>sitemap</ror:resourceOf>\n  </item>\n`;
    });
    rorXml += '</channel>\n</rss>';
    fs.writeFileSync(path.join(publicDir, 'ror.xml'), rorXml);

    let robotsTxt = `# robots.txt generated at build time\n`;
    robotsTxt += `User-agent: *\nAllow: /\n\n`;
    robotsTxt += `# AI Crawlers\n`;
    robotsTxt += `User-agent: GPTBot\nAllow: /\n`;
    robotsTxt += `User-agent: ChatGPT-User\nAllow: /\n`;
    robotsTxt += `User-agent: ClaudeBot\nAllow: /\n`;
    robotsTxt += `User-agent: PerplexityBot\nAllow: /\n\n`;
    robotsTxt += `Sitemap: ${buildCanonicalUrl('/sitemap.xml')}\n`;
    robotsTxt += `Sitemap: ${buildCanonicalUrl('/ror.xml')}\n`;

    fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);

    console.log(`✅ Generated ${uniqueUrls.length} URLs across sitemap.xml, robots.txt, urllist.txt, ror.xml & llms.txt successfully!`);
}

generateAllSeoFiles();
