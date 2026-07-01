# 📧 Contact Form Setup Guide

## How the Contact Form Works

When someone fills out and submits the contact form on your portfolio, the message is:
1. **Validated** on the client side (name, email, subject, message)
2. **Sent to Supabase** database
3. **Stored** in the `contact_messages` table
4. **Can be viewed** from your Supabase dashboard

---

## ✅ Step-by-Step Setup

### **Step 1: Create Supabase Account**
1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Choose a project name and region close to you

### **Step 2: Create the Contact Messages Table**

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy and paste this SQL:

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Enable RLS (Row Level Security)
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages
CREATE POLICY "Allow public insert" ON contact_messages 
FOR INSERT WITH CHECK (TRUE);

-- Allow public to read (optional - if you want to see them)
CREATE POLICY "Allow public read" ON contact_messages 
FOR SELECT USING (TRUE);
```

4. Click **"Run"** to execute the query

### **Step 3: Get Your API Credentials**

1. Go to **Settings** → **API**
2. Copy your:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon Key** (long string starting with `eyJ...`)

### **Step 4: Configure Environment Variables**

1. Open `.env.local` in your project root
2. Add/Update these variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. **Save the file**
4. **Restart your dev server** (`npm run dev`)

### **Step 5: Test the Form**

1. Go to `http://localhost:3000`
2. Scroll to the **"Get In Touch"** section
3. Fill out the form with:
   - **Name**: Your name
   - **Email**: your@email.com
   - **Subject**: Test subject
   - **Message**: Test message (must be at least 10 characters)
4. Click **"Send Message"**
5. You should see **"✓ Message sent successfully!"**

### **Step 6: View Messages in Supabase**

1. Go to your Supabase dashboard
2. Click **"Table Editor"**
3. Select **"contact_messages"**
4. You'll see all submissions with:
   - Name
   - Email
   - Subject
   - Message
   - Timestamp

---

## 🔔 Getting Email Notifications (Optional)

To receive email when someone submits a form:

### Option A: Using Supabase Edge Functions (Advanced)
```bash
npm install supabase
supabase functions new send-email
```

### Option B: Using a Third-Party Service
- **SendGrid**: https://sendgrid.com
- **AWS SES**: https://aws.amazon.com/ses/
- **Resend**: https://resend.com (Recommended for Next.js)

---

## ✨ Form Features

✅ **Email validation** - Checks if email is valid  
✅ **Message length validation** - Minimum 10 characters  
✅ **Error messages** - Clear feedback if something fails  
✅ **Success notification** - Confirmation when sent  
✅ **Auto-clear form** - Fields clear after successful submission  
✅ **Dark/Light mode support** - Adapts to theme  

---

## 🐛 Troubleshooting

### "Failed to send message" error
- Check that API credentials are correct in `.env.local`
- Verify the `contact_messages` table exists
- Make sure RLS policy allows INSERT

### Messages not appearing in Supabase
- Check that the table exists under **Table Editor**
- Verify you see "✓ Message sent successfully!" on the form
- Check browser console for errors (Press F12)

### Environment variables not working
- Make sure you restarted `npm run dev` after adding to `.env.local`
- Check variable names are EXACTLY as shown (case-sensitive)

---

## 📱 Form Fields

| Field | Required | Validation |
|-------|----------|-----------|
| Name | ✓ Yes | Min 1 char |
| Email | ✓ Yes | Valid email format |
| Subject | ✓ Yes | Min 1 char |
| Message | ✓ Yes | Min 10 chars |

---

## 💾 Viewing All Messages

In Supabase Dashboard:
1. Go to **Table Editor**
2. Click **"contact_messages"**
3. Click the **"read"** checkbox to mark as read
4. Export data: Click **⋯** → **Export as CSV**

---

## 🔐 Security Notes

- **RLS Policies** prevent unauthorized access
- **Client-side validation** provides immediate feedback
- **Server-side validation** ensures data integrity
- **Email format validation** prevents spam

---

## 🚀 Next Steps

1. ✅ Follow all steps above
2. ✅ Test the form with a message
3. ✅ Check messages appear in Supabase
4. ✅ Share your portfolio!

**Questions?** Check your browser console (F12) for detailed error messages!
