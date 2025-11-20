# Deployment Guide - Campus Connect

This guide covers deploying Campus Connect to production.

## 🚀 Quick Deploy (Recommended)

### Deploy with Lovable

Campus Connect is optimized for deployment with Lovable, which provides seamless integration with GitHub and Supabase.

1. **Connect GitHub**
   - Click "Connect to GitHub" in Lovable
   - Authorize the Lovable GitHub App
   - Your code syncs automatically

2. **Deploy**
   - Click "Publish" in Lovable
   - Your app goes live instantly
   - SSL included automatically

3. **Custom Domain** (Optional)
   - Go to Project > Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## 🔧 Manual Deployment

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- Supabase account and project
- Web hosting service

### Step 1: Prepare for Production

1. **Update Environment Variables**

Create `.env.production`:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. **Update Configuration Files**

Update `public/sitemap.xml` and `public/robots.txt` with your actual domain:
```xml
<!-- In sitemap.xml -->
<loc>https://your-actual-domain.com/</loc>
```

```txt
# In robots.txt
Sitemap: https://your-actual-domain.com/sitemap.xml
```

3. **Update Meta Tags**

In `index.html`, update the Open Graph and Twitter URLs:
```html
<meta property="og:url" content="https://your-actual-domain.com" />
```

### Step 2: Build for Production

```bash
# Install dependencies
npm install

# Run production build
npm run build

# Test production build locally (optional)
npm run preview
```

The build output will be in the `dist/` directory.

### Step 3: Deploy to Hosting Service

#### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard > Project Settings > Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

4. **Set Build Configuration**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

#### Deploy to Netlify

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Deploy**
```bash
netlify deploy --prod
```

3. **Configure**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variables in Netlify Dashboard

#### Deploy to Custom Server

1. **Build the project**
```bash
npm run build
```

2. **Upload `dist/` folder to your server**
```bash
scp -r dist/* user@your-server:/var/www/html/
```

3. **Configure Web Server**

**Nginx Example:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Apache Example (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### Step 4: Configure SSL/HTTPS

For production, always use HTTPS:

**Using Let's Encrypt (Free):**
```bash
sudo certbot --nginx -d your-domain.com
```

**Using Cloudflare:**
1. Add your domain to Cloudflare
2. Update DNS settings
3. Enable SSL in Cloudflare dashboard

### Step 5: Set Up Database

1. **Run Migrations**

In your Supabase project dashboard:
- Navigate to SQL Editor
- Run migration scripts from `supabase/migrations/`

2. **Set Up Required Tables**

See `FUNCTIONAL_CHANGES.md` for SQL scripts to create:
- `profiles` table with trigger
- `referrals` table (optional)
- RLS policies

3. **Configure Row Level Security**

Ensure RLS policies are properly configured for all tables.

### Step 6: Configure Analytics

1. **Google Analytics**

Already configured in `index.html` with ID: `G-WSRHGYH7CL`

To use your own:
- Replace the GA ID in `index.html`
- Update tracking code

2. **Error Monitoring** (Recommended)

Consider adding Sentry or similar:
```bash
npm install @sentry/react
```

## 🔍 Post-Deployment Checklist

After deploying, verify:

- [ ] Site is accessible at your domain
- [ ] SSL certificate is valid (https://)
- [ ] All pages load correctly
- [ ] Authentication works (sign up, sign in, sign out)
- [ ] Database connection works
- [ ] Images load properly
- [ ] Forms submit successfully
- [ ] Payment integration works (if applicable)
- [ ] Admin dashboard accessible
- [ ] Mobile responsive
- [ ] PWA installable
- [ ] No console errors
- [ ] Analytics tracking works
- [ ] SEO meta tags present

## 🔄 Continuous Deployment

### GitHub Actions (Example)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
        VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
```

## 📊 Monitoring & Maintenance

### Performance Monitoring

1. **Google Lighthouse**
   - Run Lighthouse audits regularly
   - Target scores: 90+ across all categories

2. **Web Vitals**
   - Monitor Core Web Vitals
   - Use Chrome DevTools or web-vitals library

### Database Maintenance

1. **Regular Backups**
   - Set up automated backups in Supabase
   - Test backup restoration periodically

2. **Performance Optimization**
   - Add indexes for frequently queried columns
   - Monitor slow queries
   - Optimize database queries

### Security Updates

1. **Keep Dependencies Updated**
```bash
npm audit
npm update
```

2. **Monitor Security Advisories**
   - Subscribe to security advisories for key dependencies
   - Apply security patches promptly

## 🆘 Troubleshooting

### Build Fails

**Issue:** Build fails with dependency errors
**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

**Issue:** Supabase connection fails
**Solution:**
- Ensure environment variables are prefixed with `VITE_`
- Rebuild after changing environment variables
- Check that variables are set in hosting platform

### Routes Not Working (404 on Refresh)

**Issue:** SPA routing breaks on page refresh
**Solution:**
- Configure server to serve `index.html` for all routes
- See web server configuration examples above

### SSL Certificate Issues

**Issue:** Mixed content warnings
**Solution:**
- Ensure all assets load via HTTPS
- Update external resource URLs to use HTTPS

## 🔐 Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use environment variables for all secrets
   - Rotate keys regularly

2. **API Keys**
   - Use Supabase RLS policies
   - Never expose service role keys
   - Use anon key only for client-side

3. **Content Security Policy**
   - Consider adding CSP headers
   - Restrict inline scripts if possible

## 📞 Support

If you encounter issues during deployment:

1. Check the [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
2. Review [FUNCTIONAL_CHANGES.md](./FUNCTIONAL_CHANGES.md)
3. Check Supabase logs for database issues
4. Review browser console for client-side errors

---

**Last Updated:** January 2025
**Version:** 1.0.0
