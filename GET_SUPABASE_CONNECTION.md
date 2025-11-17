# 🔧 Get Your Supabase Connection String

We need to get the correct connection string from Supabase. Follow these steps:

## Step-by-Step Instructions

### 1. Go to Your Supabase Project

Visit: https://supabase.com/dashboard/project/emvqsczrvbgoinunrswg/settings/database

### 2. Get the Connection String

On the **Database Settings** page:

1. Scroll down to **"Connection string"** section
2. You'll see multiple tabs:
   - **URI** (for direct connection)
   - **Connection pooling** (for Prisma - this is what we need!)
   - **Session mode**
   - **Transaction mode**

### 3. Select the RIGHT Tab

**For Prisma, we need the "Connection pooling" string:**

1. Click on the **"Connection pooling"** tab (or "Transaction mode")
2. You'll see a connection string that looks like:
   ```
   postgresql://postgres.emvqsczrvbgoinunrswg:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

   OR it might look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.emvqsczrvbgoinunrswg.supabase.co:5432/postgres?pgbouncer=true
   ```

3. Copy the ENTIRE string

### 4. Replace [YOUR-PASSWORD]

In the connection string you copied, replace `[YOUR-PASSWORD]` with your actual password: `Gknb@8897534317`

**IMPORTANT**: If your password contains special characters like `@`, you need to URL-encode them:
- `@` becomes `%40`
- `#` becomes `%23`
- `$` becomes `%24`
- `%` becomes `%25`

So your password `Gknb@8897534317` becomes `Gknb%408897534317`

### 5. Examples of Correct Connection Strings

**Option 1 (Connection Pooler - Port 6543):**
```
postgresql://postgres.emvqsczrvbgoinunrswg:Gknb%408897534317@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Option 2 (Direct with pgbouncer - Port 5432):**
```
postgresql://postgres:Gknb%408897534317@db.emvqsczrvbgoinunrswg.supabase.co:5432/postgres?pgbouncer=true
```

**Option 3 (Session mode - Port 6543):**
```
postgresql://postgres.emvqsczrvbgoinunrswg:Gknb%408897534317@aws-0-us-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1
```

### 6. Check if Project is Active

Also verify:
1. Your Supabase project is **not paused**
2. Go to: https://supabase.com/dashboard/project/emvqsczrvbgoinunrswg
3. If you see a message saying "Project is paused", click **"Restore project"**

### 7. Copy the Connection String Here

Once you have the correct connection string from Supabase dashboard, provide it to me and I'll update the `.env` files!

---

## Alternative: Use Supabase Web Interface

If the connection keeps failing, you can also:

1. Go to Supabase Dashboard → SQL Editor
2. Run this SQL to create tables manually:

```sql
-- I can generate the SQL script for you if needed
```

Then we can still deploy the app and it will work!

---

**What to do next:**

Please go to your Supabase dashboard and copy the **Connection pooling** connection string, then share it with me!
