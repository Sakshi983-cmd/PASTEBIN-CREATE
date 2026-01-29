# ✅ PASTEBIN LITE - FINAL CHECKLIST

## 📦 TUMHE YE FOLDER MILEGA: `pastebin-ready`

### ✅ FILES JO ALREADY READY HAIN:

```
pastebin-ready/
├── app/
│   ├── api/
│   │   ├── healthz/
│   │   │   └── route.ts           ✅ Health check API
│   │   └── pastes/
│   │       ├── route.ts            ✅ Create paste API
│   │       └── [id]/
│   │           └── route.ts        ✅ Get paste API
│   ├── p/
│   │   └── [id]/
│   │       └── page.tsx            ✅ View paste HTML
│   ├── layout.tsx                  ✅ Root layout
│   └── page.tsx                    ✅ Home page UI
├── lib/
│   └── storage.ts                  ✅ KV storage logic
├── .gitignore                      ✅ Git ignore file
├── next.config.js                  ✅ Next config
├── package.json                    ✅ Dependencies
├── README.md                       ✅ Documentation
└── tsconfig.json                   ✅ TypeScript config
```

---

## 🚀 3 SIMPLE STEPS:

### STEP 1: GITHUB PE UPLOAD KARO

```bash
cd pastebin-ready

git init
git add .
git commit -m "Initial commit"
git branch -M main

# Pehle GitHub pe repo banao (https://github.com/new)
# Phir ye command run karo (APNA URL DAALO):
git remote add origin https://github.com/YOUR_USERNAME/pastebin-lite.git
git push -u origin main
```

### STEP 2: VERCEL PE DEPLOY KARO

1. Jao: https://vercel.com
2. Sign up with GitHub
3. "New Project" → Import "pastebin-lite"
4. **WAIT! Pehle Storage setup karo ↓**

### STEP 3: VERCEL KV DATABASE SETUP

1. Project dashboard → **"Storage"** tab
2. **"Create Database"** → Select **"KV"**
3. Name: `pastebin-kv`
4. **"Create"** → **"Connect Project"**
5. **"Settings"** → **"Environment Variables"**
6. Add: `TEST_MODE` = `1`
7. Ab **"Deploy"** karo!

---

## 🧪 TEST KAISE KARE:

### Browser me:
```
https://your-app.vercel.app
```

### Health check:
```bash
curl https://your-app.vercel.app/api/healthz
```

### Create paste:
```bash
curl -X POST https://your-app.vercel.app/api/pastes \
  -H "Content-Type: application/json" \
  -d '{"content":"Test","max_views":3}'
```

---

## ⚠️ IMPORTANT NOTES:

1. ❌ `.env.local` file kabhi GitHub pe mat daalo
2. ✅ Vercel automatically KV environment variables add kar dega
3. ✅ TEST_MODE=1 manually add karna hai
4. ✅ Sabhi API routes `/api/` se start hote hain
5. ✅ View pages `/p/` se start hote hain

---

## 🎯 KYA CHAHIYE TUMHE:

- [ ] GitHub account
- [ ] Vercel account (free)
- [ ] Git installed on computer
- [ ] Terminal/Command Prompt

**THAT'S IT! Bas 15-20 minute me deploy ho jayega! 🚀**

---

## 📞 HELP:

Agar koi error aaye to:
1. Vercel → Project → Logs dekho
2. Error message copy karo
3. Google pe search karo

**ALL THE BEST BHAI! 💪**
