# Setup Guide - Comunidad Dashboard

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration (REQUIRED for database functionality)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# OpenAI Configuration (for AI features)
OPENAI_API_KEY=your_openai_api_key_here

# WhatsApp Cloud API (for notifications)
WHATSAPP_TOKEN=your_whatsapp_token_here
WHATSAPP_PHONE_NUMBER_ID=your_whatsapp_phone_number_id_here

# SendGrid (for emails)
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Stripe (for payments)
STRIPE_SECRET_KEY=your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
```

### 3. Set Up Supabase Database

#### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

#### Step 2: Run the Database Schema
1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `database/schema.sql`
4. Execute the script to create all tables and initial data

#### Step 3: Configure Environment Variables
Update your `.env.local` file with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Test the Database Connection
1. Start the development server:
```bash
npm run dev
```

2. Open your browser to `http://localhost:3000`
3. Scroll down to the "Supabase Database Test" section
4. Check the connection status:
   - 🟢 Green: Connected to Supabase
   - 🔴 Red: Using mock data (check your environment variables)

### 5. Test Database Operations
1. Click "Load Members" to fetch data from the database
2. Click "Add Test Member" to create a new member
3. Verify that the operations work correctly

## 📚 Learning Path

### Phase 1: Database Integration (Week 1-2)
- ✅ Set up Supabase connection
- ✅ Test database operations
- 🔄 Connect registration form to database
- 🔄 Update dashboard to use real data

### Phase 2: Authentication & Authorization (Week 3-4)
- 🔄 Implement user authentication
- 🔄 Set up role-based access control
- 🔄 Create protected routes

### Phase 3: AI Integration (Week 5-6)
- 🔄 Implement commission suggestion AI
- 🔄 Add progress summarization
- 🔄 Create activity scoring

### Phase 4: Automation & Notifications (Week 7-8)
- 🔄 Set up n8n workflows
- 🔄 Implement WhatsApp notifications
- 🔄 Create email automation

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard page
│   ├── registro/          # Registration page
│   ├── proyectos/         # Projects page
│   └── api/              # API routes
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
│   ├── supabase.ts       # Database configuration
│   └── mockData.ts       # Mock data for development
└── types/                 # TypeScript type definitions
```

## 🔧 Troubleshooting

### Database Connection Issues
1. Verify your Supabase URL and anon key are correct
2. Check that the database schema has been applied
3. Ensure your Supabase project is active
4. Check the browser console for error messages

### Environment Variables Not Loading
1. Make sure `.env.local` is in the root directory
2. Restart the development server after adding environment variables
3. Verify variable names start with `NEXT_PUBLIC_` for client-side access

### TypeScript Errors
1. Run `npm run lint` to check for issues
2. Make sure all imports are correct
3. Check that type definitions match your database schema

## 🎯 Next Steps

Once you have the database connection working:

1. **Update the Registration Form**: Connect it to save real data to Supabase
2. **Enhance the Dashboard**: Load real data instead of mock data
3. **Add Authentication**: Implement user login/logout functionality
4. **Create API Routes**: Build backend endpoints for data operations

## 📖 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) 