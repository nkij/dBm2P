# Deploy to Netlify (Free)

## Option 1: Drag & Drop (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Sign up for free account
3. Drag your entire project folder to the deploy area
4. Wait for deployment (usually 30 seconds)
5. Get your URL: `https://amazing-name-123456.netlify.app`
6. Share with friends!

## Option 2: Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from your project folder
netlify deploy --prod --dir .

# Get your URL and share!
```

## What to Upload
Make sure to include these files:
- ✅ index.html
- ✅ script.js
- ✅ manifest.json
- ✅ sw.js
- ✅ icons/ folder
- ✅ All other files

## After Deployment
- Your app will be available at a public URL
- Friends can access it from anywhere
- They can install it as PWA on their phones
- Works on all devices and browsers

## Custom Domain (Optional)
- You can add a custom domain like `dbconverter.com`
- Netlify provides free SSL certificates
- Professional look for your app
