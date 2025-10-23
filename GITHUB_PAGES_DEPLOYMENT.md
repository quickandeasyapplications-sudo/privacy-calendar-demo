# GitHub Pages Deployment Guide

This guide provides step-by-step instructions for deploying the Privacy Calendar demo to GitHub Pages.

## 📋 Prerequisites

- A GitHub account (free account is sufficient)
- Git installed on your computer
- Basic familiarity with GitHub

## 🚀 Deployment Steps

### Step 1: Create a GitHub Repository

1. **Go to GitHub** and sign in to your account
   - Visit: https://github.com

2. **Create a New Repository**
   - Click the "+" icon in the top-right corner
   - Select "New repository"
   - Fill in the details:
     - **Repository name**: `privacy-calendar-demo`
     - **Description**: "Interactive demo of Privacy Calendar with 50+ templates"
     - **Visibility**: Public (required for GitHub Pages)
     - **Initialize with**: Add a README file (optional)
   - Click "Create repository"

### Step 2: Clone the Repository

1. **Copy the Repository URL**
   - On your new repository page, click the green "Code" button
   - Copy the HTTPS URL (e.g., `https://github.com/yourusername/privacy-calendar-demo.git`)

2. **Clone to Your Computer**
   ```bash
   git clone https://github.com/yourusername/privacy-calendar-demo.git
   cd privacy-calendar-demo
   ```

### Step 3: Add Demo Files

1. **Copy the Demo Files**
   - Copy the following files to your repository directory:
     - `index.html`
     - `styles.css`
     - `script.js`
     - `README.md`
     - `LICENSE`
     - `.gitignore`

2. **Verify File Structure**
   ```
   privacy-calendar-demo/
   ├── index.html
   ├── styles.css
   ├── script.js
   ├── README.md
   ├── LICENSE
   ├── .gitignore
   └── (any other files from your repo)
   ```

### Step 4: Commit and Push Files

1. **Stage Files**
   ```bash
   git add .
   ```

2. **Commit Changes**
   ```bash
   git commit -m "Add Privacy Calendar interactive demo"
   ```

3. **Push to GitHub**
   ```bash
   git push origin main
   ```

### Step 5: Enable GitHub Pages

1. **Go to Repository Settings**
   - Navigate to your repository on GitHub
   - Click the "Settings" tab
   - Scroll down to "Pages" section (or click "Pages" in the left sidebar)

2. **Configure GitHub Pages**
   - Under "Source", select "Deploy from a branch"
   - Select branch: `main`
   - Select folder: `/ (root)`
   - Click "Save"

3. **Wait for Deployment**
   - GitHub will build and deploy your site
   - This usually takes 1-2 minutes
   - You'll see a green checkmark when deployment is complete

### Step 6: Access Your Demo

1. **Find Your Demo URL**
   - In the "Pages" section, you'll see: "Your site is live at: https://yourusername.github.io/privacy-calendar-demo"
   - Click the link to view your live demo

2. **Share the URL**
   - Share this URL with stakeholders, investors, and potential users
   - The demo is now publicly accessible

## 🔧 Custom Domain (Optional)

If you want to use a custom domain:

1. **Configure Custom Domain**
   - In GitHub Pages settings, enter your custom domain
   - Update your domain's DNS records to point to GitHub Pages

2. **DNS Configuration**
   - For apex domain: Add A records pointing to GitHub's IP addresses
   - For subdomain: Add CNAME record pointing to `yourusername.github.io`

See [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) for detailed instructions.

## 📝 Making Updates

After deployment, you can easily update your demo:

1. **Make Local Changes**
   ```bash
   # Edit files locally
   # e.g., modify index.html, styles.css, etc.
   ```

2. **Commit and Push**
   ```bash
   git add .
   git commit -m "Update demo with new features"
   git push origin main
   ```

3. **GitHub Pages Updates Automatically**
   - Your changes will be live within 1-2 minutes
   - No additional configuration needed

## 🎯 Best Practices

### Performance
- Keep file sizes small (CSS and JS are already optimized)
- Minify code if making custom changes
- Use browser caching effectively

### Security
- The demo runs entirely in the browser
- No sensitive data is transmitted
- All events are stored locally in the user's browser

### SEO (Optional)
Add meta tags to `index.html` for better search engine visibility:

```html
<meta name="description" content="Interactive demo of Privacy Calendar with 50+ professional templates">
<meta name="keywords" content="calendar, privacy, scheduling, templates, secure">
<meta name="author" content="Quick and Easy Tech">
<meta name="og:title" content="Privacy Calendar Demo">
<meta name="og:description" content="Experience the world's most secure calendar application">
<meta name="og:image" content="https://yourusername.github.io/privacy-calendar-demo/og-image.png">
```

### Analytics (Optional)
To track demo usage, add Google Analytics:

```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Replace `GA_MEASUREMENT_ID` with your Google Analytics ID.

## 🐛 Troubleshooting

### Site Not Live
- Wait 1-2 minutes after enabling GitHub Pages
- Check that you selected the correct branch and folder
- Verify that `index.html` is in the root directory

### 404 Errors
- Ensure all file paths in HTML are relative (not absolute)
- Check that CSS and JS files are in the root directory
- Verify file names match exactly (case-sensitive)

### Styling Not Loading
- Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
- Clear browser cache
- Check browser console for errors (F12)

### JavaScript Not Working
- Check browser console for errors (F12)
- Verify script.js is in the root directory
- Ensure JavaScript is enabled in browser settings

## 📊 Monitoring

### View Deployment Status
1. Go to your repository
2. Click "Deployments" tab
3. View deployment history and status

### Check Analytics
1. Go to GitHub Pages settings
2. View traffic analytics (if available)
3. Monitor user engagement

## 🔄 Updating to Production Version

When you're ready to deploy the full production application:

1. **Keep Demo Active**
   - The demo can remain on GitHub Pages
   - Use a separate repository for the production app

2. **Link to Production**
   - Add a link in the demo to the production application
   - Direct users to upgrade for full features

3. **Maintain Both**
   - Demo: Lightweight, GitHub Pages
   - Production: Full-stack, Docker/Kubernetes deployment

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/troubleshooting-common-issues-with-github-pages)
- [HTML5 Best Practices](https://www.w3.org/TR/html5/)
- [Web Performance Best Practices](https://web.dev/performance/)

## 🎉 Success!

Your Privacy Calendar demo is now live on GitHub Pages! 

**Next Steps:**
1. Share the demo URL with stakeholders
2. Gather feedback from users
3. Track engagement and user interactions
4. Plan for production deployment
5. Link to the full production application when ready

---

**Need Help?**
- Check the README.md for feature documentation
- Review the troubleshooting section above
- Open an issue on GitHub for support
- Contact the Privacy Calendar team

**Privacy Calendar v2.0.1**  
*Your Schedule. Your Privacy. Your Control.*

