# Mangrove Guardian App - Authentication Setup

## Overview
This app includes a complete authentication system with email verification using Supabase. Users can register, verify their email, and sign in to access the protected app features.

## Features
- ✅ User registration with email verification
- ✅ Secure login/logout functionality
- ✅ Password reset via email
- ✅ Form validation with real-time feedback
- ✅ Professional UI with nature-inspired design
- ✅ Protected routes
- ✅ Responsive design

## Setup Instructions

### 1. Supabase Configuration
1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Create a `.env` file in the root directory with:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

### 2. Database Setup
The app includes SQL migrations that will automatically:
- Create a `profiles` table for user data
- Set up Row Level Security (RLS) policies
- Create triggers for automatic profile creation
- Handle user metadata storage

### 3. Email Configuration
1. In your Supabase dashboard, go to Authentication > Settings
2. Configure your email provider (SMTP or use Supabase's built-in email service)
3. Customize email templates for:
   - Email confirmation
   - Password reset
   - Magic link (if enabled)

### 4. Authentication Flow
1. **Registration**: User fills out form → Email verification sent → User clicks link → Account activated
2. **Login**: User enters credentials → Redirected to main app
3. **Password Reset**: User requests reset → Email sent → User sets new password

## File Structure
```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication state management
├── pages/
│   ├── AuthPage.tsx             # Main auth page (register/login)
│   ├── EmailVerificationPage.tsx # Email verification handler
│   └── PasswordResetPage.tsx    # Password reset handler
├── components/
│   └── ProtectedRoute.tsx       # Route protection
└── integrations/
    └── supabase/
        ├── client.ts            # Supabase client
        └── types.ts             # Database types
```

## Usage

### Registration
1. User visits `/auth`
2. Fills out registration form with:
   - Full name
   - Email address
   - Mobile number
   - Password (with validation)
3. Clicks "Create Account"
4. Receives verification email
5. Clicks verification link
6. Account is activated

### Login
1. User visits `/auth`
2. Switches to "Login" tab
3. Enters email and password
4. Clicks "Log In"
5. Redirected to main app

### Password Reset
1. User clicks "Forgot Password?" on login form
2. Enters email address
3. Receives reset email
4. Clicks reset link
5. Sets new password
6. Account updated

## Security Features
- Email verification required for account activation
- Password strength validation
- Form input sanitization
- Protected routes
- Row Level Security in database
- Secure session management

## Customization
- Colors and styling can be modified in `src/index.css`
- UI components use shadcn/ui and can be customized
- Email templates can be customized in Supabase dashboard
- Validation rules can be adjusted in the form components

## Troubleshooting
- Ensure Supabase project is properly configured
- Check that environment variables are set correctly
- Verify email provider settings in Supabase
- Check browser console for any errors
- Ensure database migrations have been applied
