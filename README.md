# বাজার দর

বাংলাদেশের নিত্যপণ্যের দর, দামের ওঠানামা এবং বাজারভিত্তিক মূল্যতথ্য দেখানোর Next.js অ্যাপ।

## কী আছে

- হোমপেজে দাম বাড়া ও কমা পণ্যের তালিকা, সঙ্গে সব পণ্যের বর্তমান গড় দাম
- বিভাগভিত্তিক পণ্য দেখা ও দাম অনুযায়ী সাজানো
- পণ্যের সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং বিভাগভিত্তিক বাজারদর
- ইমেইল/পাসওয়ার্ড এবং Google, GitHub ও Discord দিয়ে লগইন
- প্রোফাইল দেখা ও নাম পরিবর্তন
- মূল্যতথ্যের জন্য দুটি API ঠিকানা; প্রথমটি ব্যর্থ হলে বিকল্প ঠিকানায় চেষ্টা করা হয়

## স্থানীয়ভাবে চালানো

MongoDB server চালু করুন অথবা MongoDB Atlas cluster তৈরি করুন। `.env.example` থেকে `.env.local` বানিয়ে MongoDB connection string, Better Auth secret এবং প্রয়োজনীয় OAuth তথ্য দিন। PowerShell-এ:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

`MONGODB_URI`-তে database name-সহ connection string দিন, যেমন `mongodb://127.0.0.1:27017/bazardor` অথবা Atlas-এর `mongodb+srv://.../bazardor` URI। `BETTER_AUTH_SECRET`-ও আবশ্যক। OAuth লগইন চালু করতে সংশ্লিষ্ট provider-এর developer console থেকে আসল client ID ও client secret `.env.local`-এ বসান; `.env.example`-এর ফাঁকা মান বা নমুনা মান দিয়ে লগইন হবে না। Provider-এ redirect/callback URL হিসেবে `http://localhost:3000/api/auth/callback/google`, `http://localhost:3000/api/auth/callback/github` এবং `http://localhost:3000/api/auth/callback/discord` যোগ করুন। Production-এ `localhost:3000`-এর বদলে প্রকাশিত সাইটের origin ব্যবহার করুন এবং `BETTER_AUTH_URL` ও `NEXT_PUBLIC_APP_URL`-কে সেই একই origin-এ সেট করুন। ইমেইল/পাসওয়ার্ডে আগে `/signup` থেকে অ্যাকাউন্ট খুলে পরে `/signin` দিয়ে লগইন করুন। Better Auth-এর MongoDB adapter প্রয়োজনীয় collections ও indexes তৈরি করে; আলাদা database migration command নেই।

## প্রকাশ

Vercel-এ প্রকাশের সময় MongoDB Atlas বা অন্য hosted MongoDB database ব্যবহার করুন। `.env.example`-এর প্রয়োজনীয় মানগুলো deployment settings-এ যোগ করুন; `MONGODB_URI`-তে database name-সহ URI দিন এবং `BETTER_AUTH_URL` ও `NEXT_PUBLIC_APP_URL`-এ প্রকাশিত সাইটের URL বসান। পণ্যের বিস্তারিত ও বিভাগের route সরাসরি refresh করেও খোলা যায়।

PostgreSQL-এর পুরোনো `DATABASE_URL` এই অ্যাপ আর ব্যবহার করে না। PostgreSQL-এ আগে থেকে থাকা account-গুলো MongoDB-তে স্বয়ংক্রিয়ভাবে কপি হবে না; দরকার হলে আলাদাভাবে user data migrate করতে হবে।
