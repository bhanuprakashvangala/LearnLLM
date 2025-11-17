# 🚀 Deployment Options for LearnLLM

## 🆓 FREE Deployment Options (Recommended)

### Option 1: Vercel (BEST for Next.js) ⭐ HIGHLY RECOMMENDED

**Why Vercel:**
- Built specifically for Next.js (same company)
- Zero configuration deployment
- Automatic HTTPS
- Global CDN
- Generous free tier

**Free Tier Includes:**
- ✅ Unlimited projects
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Automatic deployments from Git
- ✅ Preview deployments for PRs
- ✅ Custom domains
- ✅ PostgreSQL database (limited)

**Deploy in 2 Minutes:**
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# That's it! 🎉
```

**Or use Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "Import Project"
4. Select your GitHub repo
5. Click "Deploy"

**Database (Vercel Postgres):**
```bash
# Create database in Vercel dashboard or:
vercel storage create postgres

# Automatically adds DATABASE_URL to your environment
```

**Limits:**
- 100GB bandwidth/month (plenty for starting out)
- 100 serverless function invocations/day on free plan
- Upgrade to Pro ($20/month) if you need more

---

### Option 2: Netlify

**Good for:**
- Simple static sites
- Form handling
- Edge functions

**Free Tier:**
- 100GB bandwidth/month
- 300 build minutes/month
- Custom domains

**Deploy:**
```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

---

### Option 3: Railway (Great for Databases)

**Why Railway:**
- Generous free database hosting
- Easy PostgreSQL/MySQL setup
- One-click deployments

**Free Tier:**
- $5 credit/month (usually enough for hobby projects)
- PostgreSQL included
- Auto-scaling

**Deploy:**
```bash
# Install
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

---

### Option 4: Render

**Free Tier:**
- Static sites: Unlimited
- Web services: 750 hours/month
- PostgreSQL: 90 days free, then $7/month

**Deploy:**
1. Go to [render.com](https://render.com)
2. Connect GitHub
3. Select repo
4. Deploy

---

## 💰 AWS Deployment (More Complex, But Powerful)

### AWS Free Tier (12 Months Free)

**Includes:**
- EC2: 750 hours/month (t2.micro instance)
- RDS: 750 hours/month (db.t2.micro)
- S3: 5GB storage
- Lambda: 1M requests/month
- CloudFront: 50GB data transfer

### Option A: AWS Amplify (Easiest AWS Option)

**Deploy Next.js to Amplify:**

1. **Install Amplify CLI:**
```bash
npm install -g @aws-amplify/cli
amplify configure
```

2. **Initialize Amplify:**
```bash
amplify init
amplify add hosting
amplify publish
```

3. **Or use AWS Console:**
- Go to AWS Amplify console
- Connect GitHub repo
- Deploy

**Cost:**
- Build minutes: $0.01/min
- Hosting: $0.15/GB served
- Free tier: 1000 build minutes/month, 15GB served

---

### Option B: AWS EC2 + RDS (Traditional Approach)

**1. Launch EC2 Instance:**
```bash
# Choose t2.micro (free tier)
# Ubuntu 22.04 LTS
# Open ports: 22 (SSH), 80 (HTTP), 443 (HTTPS)
```

**2. SSH into instance:**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

**3. Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo npm install -g pm2
```

**4. Clone and Build:**
```bash
git clone your-repo
cd learnllm
npm install
npm run build
```

**5. Run with PM2:**
```bash
pm2 start npm --name "learnllm" -- start
pm2 save
pm2 startup
```

**6. Set up Nginx:**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/learnllm
```

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/learnllm /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**7. Set up RDS (PostgreSQL):**
- Go to RDS console
- Create database (PostgreSQL, db.t3.micro for free tier)
- Note connection string
- Add to `.env` on EC2

**8. SSL with Let's Encrypt:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

**Estimated AWS Cost:**
- Free tier: $0/month (first 12 months)
- After free tier: ~$15-30/month

---

### Option C: AWS Lambda + API Gateway (Serverless)

**Deploy Next.js as Serverless:**

Using Serverless Framework:
```bash
npm install -g serverless
npm install --save-dev serverless-nextjs-plugin

# serverless.yml
service: learnllm
provider:
  name: aws
  runtime: nodejs18.x
  region: us-east-1

plugins:
  - serverless-nextjs-plugin

# Deploy
serverless deploy
```

**Cost:**
- Lambda: 1M requests free, then $0.20/1M requests
- API Gateway: 1M calls free, then $3.50/M
- CloudFront: 50GB free, then $0.085/GB

---

## 🎯 My Recommendations

### For Learning / MVP:
**→ Vercel (FREE)**
- Easiest setup
- Best Next.js support
- Generous free tier
- Deploy in 2 minutes

### For Production with Control:
**→ Railway ($5 credit/month)**
- Good database hosting
- Simple deployment
- Affordable scaling

### For Enterprise / High Traffic:
**→ AWS EC2 + RDS**
- Full control
- Better pricing at scale
- More configuration options

---

## 🗄️ Free Database Options

### 1. Vercel Postgres (with Vercel deployment)
- 256MB storage
- 60 hours compute/month
- Good for hobby projects

### 2. Supabase (BEST FREE OPTION)
- **500MB database** ⭐
- **2GB file storage**
- **50,000 monthly active users**
- **5GB bandwidth**
- Authentication included!

**Setup Supabase:**
```bash
# 1. Create project at supabase.com
# 2. Get connection string from Settings → Database
# 3. Add to .env:
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"

# 4. Run migrations:
npx prisma migrate deploy
```

### 3. PlanetScale (MySQL)
- 5GB storage
- 1B row reads/month
- 10M row writes/month

### 4. Railway
- $5 credit/month
- ~500MB PostgreSQL
- Auto-scales

### 5. Neon (Serverless Postgres)
- 512MB storage
- 3 projects
- Autoscaling

---

## 💡 Recommended Stack (100% FREE)

```
Frontend/Backend: Vercel (FREE)
Database: Supabase (FREE - 500MB)
Auth: Supabase Auth (FREE)
File Storage: Supabase Storage (FREE - 2GB)
Email: Resend free tier (3000 emails/month)
Analytics: Vercel Analytics (FREE)
Monitoring: Better Uptime (FREE tier)
```

**Total Cost: $0/month** ✨

---

## 🚀 Quick Start: Deploy to Vercel NOW

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo
git push -u origin main

# 2. Go to vercel.com
# 3. Click "Import Project"
# 4. Select your GitHub repo
# 5. Add environment variables:
#    - DATABASE_URL (from Supabase)
#    - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)
#    - NEXTAUTH_URL (https://your-app.vercel.app)
# 6. Click "Deploy"

# Done! Your site is live in ~2 minutes 🎉
```

---

## 📊 Cost Comparison

| Option | Free Tier | After Free Tier | Best For |
|--------|-----------|-----------------|----------|
| Vercel | Generous (100GB/mo) | $20/mo | Next.js apps |
| Railway | $5 credit/mo | $5-20/mo | Full-stack |
| AWS Amplify | 1000 build mins | $0.01/min + $0.15/GB | AWS ecosystem |
| AWS EC2 | 12 months | $15-30/mo | Full control |
| Netlify | 100GB/mo | $19/mo | Static sites |
| Render | 750hrs/mo | $7/mo | Simple apps |

---

## ⚡ Fastest Deployment (5 Minutes):

```bash
# 1. Create Supabase project (2 min)
# Get DATABASE_URL

# 2. Deploy to Vercel (2 min)
vercel

# 3. Add env vars in Vercel dashboard (1 min)
DATABASE_URL=your-supabase-url
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=https://your-app.vercel.app

# 4. Redeploy
vercel --prod

# DONE! ✅
```

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment

**Recommended**: Start with Vercel + Supabase (both FREE), migrate to AWS later if needed.
