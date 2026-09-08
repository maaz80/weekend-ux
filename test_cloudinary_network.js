const https = require('https');

const testUrls = [
  {
    name: "Blog Image - Mobile 375px (1x DPR) [w_380]",
    url: "https://res.cloudinary.com/dlek2xgkd/image/upload/f_auto,q_50,w_380,h_222,c_fill,g_auto/v1784276861/blogs/what-is-the-difference-between-ui-and-ux"
  },
  {
    name: "Blog Image - Mobile 375px (2x DPR) [w_680]",
    url: "https://res.cloudinary.com/dlek2xgkd/image/upload/f_auto,q_50,w_680,h_397,c_fill,g_auto/v1784276861/blogs/what-is-the-difference-between-ui-and-ux"
  },
  {
    name: "Blog Image - Mobile 390px (3x DPR) [w_1080]",
    url: "https://res.cloudinary.com/dlek2xgkd/image/upload/f_auto,q_50,w_1080,h_630,c_fill,g_auto/v1784276861/blogs/what-is-the-difference-between-ui-and-ux"
  },
  {
    name: "Blog Image - Desktop 1440px (1x DPR) [w_380]",
    url: "https://res.cloudinary.com/dlek2xgkd/image/upload/f_auto,q_50,w_380,h_222,c_fill,g_auto/v1784276861/blogs/what-is-the-difference-between-ui-and-ux"
  },
  {
    name: "Navbar Search Dropdown Thumbnail [w_72]",
    url: "https://res.cloudinary.com/dlek2xgkd/image/upload/f_auto,q_50,w_72,h_72,c_fill,g_auto/v1784276861/blogs/what-is-the-difference-between-ui-and-ux"
  }
];

function fetchSize(item) {
  return new Promise((resolve) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    };
    https.get(item.url, options, (res) => {
      let len = 0;
      res.on('data', (chunk) => { len += chunk.length; });
      res.on('end', () => {
        resolve({
          name: item.name,
          url: item.url,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          bytes: len,
          kb: (len / 1024).toFixed(2)
        });
      });
    }).on('error', (err) => {
      resolve({ name: item.name, error: err.message });
    });
  });
}

async function run() {
  console.log("=== REAL CHROME BROWSER CLOUDINARY RESPONSIVE DELIVERY TEST ===");
  for (const item of testUrls) {
    const res = await fetchSize(item);
    console.log(`\n[${res.name}]`);
    console.log(`URL: ${res.url}`);
    console.log(`Content-Type: ${res.contentType}`);
    console.log(`HTTP Status: ${res.status}`);
    console.log(`Downloaded Size: ${res.kb} KB (${res.bytes} bytes)`);
  }
}

run();
