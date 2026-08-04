# CI/CD Pipeline Setup Guide for Next.js (Static Export) on Hostinger

Jab aap Next.js ko `output: export` karke Hostinger par deploy karte hain, to website static hoti hai. Database (Admin panel) mein kuch naya add karne par website automatically update nahi hoti kyunki static HTML files ko naye data ke sath dobara generate (build) karna padta hai. 

Is document me hum sikhenge ki kaise jab bhi Admin Panel me koi change ho, to website automatically background me build hokar Hostinger par live ho jaye.

Ise set karne ke 2 main tareeqe hain. Hum **GitHub Actions + Webhooks** (Industry Standard) wala tareeqa use karenge.

---

## Architecture Flow

1. Admin ne naya page/service banaya.
2. Backend (Node.js) database save karne ke baad GitHub API ko ek "Webhook" (trigger) bhejta hai.
3. GitHub Actions automatically start hota hai. Wo latest code uthata hai, live API se naya data fetch karke `npm run build` chalata hai.
4. Build complete hone ke baad, GitHub Actions automatically naya `out` folder Hostinger server par (via FTP ya SSH) upload kar deta hai.
5. Changes live ho jate hain!

---

## Step-by-Step Implementation

### Step 1: GitHub Repository Setup
Agar aapka `next-user` code pehle se GitHub par nahi hai, to usko GitHub par push karein.

### Step 2: GitHub Action Workflow Create Karein
Aapke `next-user` project ke root folder me ek folder banayein: `.github/workflows/`
Uske andar ek file banayein: `deploy.yml`

Aur usme ye code dalein:

```yaml
name: Deploy Next.js to Hostinger

# Ye tab chalega jab ya to aap code push karein, ya backend API isko trigger kare
on:
  push:
    branches:
      - main
  repository_dispatch:
    types: [admin_content_update] # Backend is event ko call karega

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18' # Ya jo version aap use karte hain

    - name: Install Dependencies
      run: npm install

    - name: Build Static Export
      # Yahan build process chalega aur naya 'out' folder generate hoga (with latest DB data)
      run: npm run build
      env:
        NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}

    - name: Upload to Hostinger via FTP
      uses: SamKirkland/FTP-Deploy-Action@v4.3.4
      with:
        server: ${{ secrets.FTP_SERVER }}
        username: ${{ secrets.FTP_USERNAME }}
        password: ${{ secrets.FTP_PASSWORD }}
        local-dir: ./out/
        server-dir: /public_html/ # Yahan aapka hostinger ka path aayega
```

### Step 3: GitHub me Secrets Add Karein
Aapki file me jo `${{ secrets.FTP_SERVER }}` likha hai, ye secure credentials hain.
1. GitHub Repository ki **Settings** > **Secrets and variables** > **Actions** me jayein.
2. **New repository secret** par click karein aur ye add karein:
   - `FTP_SERVER`: (hostinger ka ftp address e.g. ftp.kreeyadesign.com)
   - `FTP_USERNAME`: (Hostinger se banaya gaya FTP username)
   - `FTP_PASSWORD`: (Hostinger ka FTP password)
   - `NEXT_PUBLIC_API_URL`: https://api.kreeyadesign.com/api

### Step 4: Backend (Node.js/Express) me Webhook Trigger Code Likhein
Ab aapko apne backend admin controller me ek code likhna hai jo DB me save karne ke baad GitHub ko trigger kare.

Sabse pehle GitHub se ek **Personal Access Token (PAT)** generate karein (jisme 'repo' access ho).
Phir apne backend me ye function banayein:

```javascript
const axios = require('axios');

async function triggerFrontendBuild() {
    try {
        const GITHUB_TOKEN = 'your_github_personal_access_token';
        const GITHUB_OWNER = 'your_github_username';
        const GITHUB_REPO = 'your_repo_name';

        await axios.post(
            `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/dispatches`,
            {
                event_type: 'admin_content_update'
            },
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `token ${GITHUB_TOKEN}`
                }
            }
        );
        console.log("Frontend build triggered successfully!");
    } catch (error) {
        console.error("Failed to trigger build:", error);
    }
}
```

**Kahan use karna hai?**
Jab admin panel se koi "Create Service", "Update Blog", ya "Delete Portfolio" API call ho, to database me save karne ke turant baad is `triggerFrontendBuild()` ko call kar dein.

```javascript
// Example: Create Blog API
exports.createBlog = async (req, res) => {
    // 1. Save data to database
    const newBlog = await Blog.create(req.body);

    // 2. Trigger Next.js build
    triggerFrontendBuild();

    // 3. Send response to admin
    res.status(200).json({ success: true, message: 'Blog created & build started!' });
}
```

---

## Alternative: Server Side Build (Agar backend aur frontend ek hi server par hain)

Agar aapka Node.js backend bhi Hostinger par hi host hai aur usi server par Next.js ka code pada hai, to aap GitHub Actions ko bypass karke direct server terminal me build command chala sakte hain:

```javascript
const { exec } = require('child_process');

async function triggerLocalBuild() {
    // Ye direct aapke server par command run karega
    exec('cd /path/to/next-user && npm run build && cp -r out/* /path/to/public_html/', (error, stdout, stderr) => {
        if (error) {
            console.error(`Build Error: ${error.message}`);
            return;
        }
        console.log(`Build Output: ${stdout}`);
    });
}
```
*Note: Ye tareeqa sirf tab kaam aayega agar backend wale server par Next.js build run karne ki memory aur permission (Node.js installed) maujud ho.*

---

## Summary
- **Admin Panel Save -> Backend API -> GitHub Webhook -> GitHub Actions Build -> FTP to Hostinger**
- Is pipeline setup ke baad website 100% automate ho jayegi. Aap sirf content manage karenge, baaki sab backend aur GitHub Actions automatic karega.
