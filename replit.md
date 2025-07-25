# HydroMate - Smart Hydration Tracking Application

## Overview

HydroMate is a comprehensive hydration tracking application that helps users monitor their daily water intake through smart reminders, personalized goals, and detailed analytics. The application features a modern React frontend with a Node.js/Express backend, PostgreSQL database, and optional mobile app capabilities through Capacitor.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for fast development and optimized builds
- **Mobile**: Capacitor integration for iOS/Android native features

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Authentication**: Replit OAuth integration with session-based auth
- **Database**: PostgreSQL with Drizzle ORM
- **Payment Processing**: Stripe integration for subscriptions

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon/Replit
- **ORM**: Drizzle with schema-first approach
- **Session Storage**: PostgreSQL-based session storage
- **Schema**: Comprehensive user profiles, hydration tracking, subscriptions, and analytics

## Key Components

### Authentication System
- Replit OAuth integration for seamless authentication
- Session-based authentication with PostgreSQL storage
- Feature flag system for testing with/without authentication
- Conditional authentication middleware for development flexibility

### Hydration Tracking Core
- **User Profiles**: Weight, gender, activity level-based goal calculations
- **Intake Logging**: Multi-beverage type tracking with hydration percentages
- **Smart Reminders**: Customizable notification scheduling
- **Progress Tracking**: Daily, weekly, and historical analytics

### Premium Subscription System
- **Stripe Integration**: Live payment processing with test/production modes
- **Feature Gating**: Weather-based adjustments, advanced analytics
- **Subscription Management**: Customer portal for billing management
- **Plan Options**: Monthly ($9.99) and annual ($95.99) pricing

### Mobile Integration
- **Capacitor Framework**: Cross-platform mobile app capabilities
- **Native Features**: Push notifications, haptic feedback, geolocation
- **Progressive Web App**: Web-based mobile experience with native feel

### Analytics & Insights
- **Dashboard**: Real-time hydration progress visualization
- **Charts**: Recharts integration for progress tracking
- **Achievement System**: Gamification with unlockable badges
- **Weather Integration**: OpenWeather API for climate-based recommendations

## Data Flow

### User Registration & Onboarding
1. OAuth authentication via Replit
2. Profile creation with physical metrics
3. Personalized daily goal calculation
4. Reminder preferences setup

### Daily Hydration Tracking
1. User logs water intake through multiple interfaces
2. Data stored with timezone-aware timestamps
3. Real-time progress updates and goal tracking
4. Achievement checking and badge unlocking

### Premium Feature Access
1. Subscription status verification
2. Feature gate enforcement
3. Enhanced analytics and weather integration
4. Advanced notification capabilities

### Analytics Generation
1. Daily summary calculations
2. Weekly/monthly trend analysis
3. Achievement progress tracking
4. Export capabilities for user data

## External Dependencies

### Authentication & Infrastructure
- **Replit Auth**: OAuth provider integration
- **PostgreSQL**: Primary database (Neon/Replit hosted)
- **Stripe**: Payment processing and subscription management

### Weather & Location Services
- **OpenWeather API**: Weather-based hydration recommendations
- **Browser Geolocation**: User location detection
- **Timezone Handling**: Accurate date/time calculations

### Mobile & Notifications
- **Capacitor Plugins**: Native mobile functionality
- **Web Push API**: Browser-based notifications
- **PWA Features**: Service worker and offline capabilities

### Development & Monitoring
- **Vite**: Development server and build tooling
- **TanStack Query**: Server state management
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Environment Configuration
- **Development**: Feature flags enabled, mock data available
- **Production**: Stripe live mode, authentication required
- **Mobile**: Capacitor builds for iOS/Android app stores

### Build Process
1. Frontend: Vite builds React app to `dist/public`
2. Backend: esbuild compiles TypeScript server to `dist/index.js`
3. Database: Drizzle migrations applied automatically
4. Mobile: Capacitor sync for native app builds

### Scaling Considerations
- Database connection pooling with Neon
- Rate limiting implementation
- CDN-ready static asset structure
- Mobile app store deployment ready

## Security Implementation
- **Production Ready**: Comprehensive security audit completed
- **Authentication**: Enforced in production, bypass only in development
- **Data Protection**: User isolation, input sanitization, SQL injection prevention
- **Environment Security**: Sensitive data moved to environment variables
- **Rate Limiting**: Advanced protection against abuse and DoS attacks
- **Security Headers**: Full browser-level protection implemented

## Legal Compliance
- **MIT License**: Open source license applied to the project
- **Copyright Notice**: Copyright (c) 2025 HydroMate
- **Third-Party Licenses**: All dependencies documented in THIRD_PARTY_LICENSES.md
- **License Files**: LICENSE file created, README.md includes licensing information
- **Source Code Headers**: Copyright notices added to main application files

## Changelog
- July 18, 2025. Prepared HydroMate project for GitHub migration to user's "hobby" repository - created comprehensive documentation including README.md, deployment checklist, contributing guidelines, and setup instructions for GitHub integration and production deployment to hydromate.ca domain
- July 18, 2025. Created GoDaddy DNS setup guide for hydromate.ca domain - comprehensive step-by-step instructions for updating DNS records, deployment process, and troubleshooting for Canadian domain deployment
- July 18, 2025. Prepared custom domain deployment setup - created deployment configuration files for Vercel, Netlify, and Railway platforms, comprehensive deployment guide with step-by-step instructions, domain candidates list, and production-ready configuration for easy custom domain deployment
- July 18, 2025. Configured domain setup for HydroMate application - created domain configuration file with environment-aware URLs, updated authentication and navigation to use centralized domain configuration, and created comprehensive domain setup documentation
- July 18, 2025. Implemented comprehensive user access control system for testing purposes - added approval workflow with pending/approved/rejected/suspended status tracking, admin panel at /admin route, database tables for user_access_control and admin_users, access control middleware, and admin setup documentation
- July 16, 2025. Updated welcome message to show user name - changed "Welcome back!" to "Welcome [user name]!" for personalized greeting using first name, email prefix, or "Sunny" as dev fallback
- July 16, 2025. Changed all PREMIUM branding to PRO - updated badges, pricing plans, subscription pages, and all user-facing text to use "PRO" instead of "PREMIUM" for consistent branding
- July 16, 2025. Updated HydroMate logo to match analytics gradient - changed navigation logo text to use same blue-to-cyan gradient as "Hydration Analytics" header for brand consistency
- July 16, 2025. Updated all card components to use weather insights background - applied cyan-to-blue gradient background (from-cyan-50 to-blue-50) and cyan border to all cards for visual consistency
- July 16, 2025. Updated main app header gradient to match analytics page - changed "Stay Hydrated" text to use same blue-to-cyan gradient as "Hydration Analytics" for visual consistency
- July 16, 2025. Made Analytics a premium feature - added PREMIUM badge to analytics page header and PRO badge to analytics navigation item in both desktop and mobile views
- July 16, 2025. Enhanced UI design with more curved corners - updated all cards, buttons, dialogs, and input fields from rounded-md/lg to rounded-xl for a more modern appearance
- July 16, 2025. Fixed chart hover behavior issue - replaced dark shadow overlay with light, subtle background highlight for better readability on both weekly progress and analytics charts
- July 16, 2025. Fixed analytics consistency tracking by resolving user profile requirement issue - daily summaries now generate properly when intake is logged, showing authentic data instead of 0% consistency
- July 16, 2025. Successfully integrated live OpenWeather API with valid key - weather service now provides real-time data for Toronto (28°C), London (19°C), New Delhi (27°C) with intelligent hydration recommendations
- July 16, 2025. Connected OpenWeather API with real weather data - app now displays actual temperature, humidity, and weather conditions with personalized hydration recommendations
- July 16, 2025. Enhanced location settings with localStorage persistence, geolocation detection, and automatic weather refresh when location changes
- July 16, 2025. Implemented intelligent location autocomplete with popular city suggestions - users can now type partial city names and select from dropdown suggestions
- July 16, 2025. Changed weather update behavior to only trigger on user intent (Enter key press or suggestion selection) instead of automatic updates while typing
- July 16, 2025. Added comprehensive city database with popular cities from Canada, US, UK, and Australia for better location suggestions
- July 16, 2025. Added premium badge to Weekly Progress section to make it a premium feature
- July 16, 2025. Restored premium badges to Weather Insights section and Achievements section as requested by user
- July 16, 2025. Removed all premium status displays from main app including "Premium Active" cards, "PREMIUM" badges on achievements and weather insights sections, and premium badges on achievement items since app has no free tier
- July 16, 2025. Completely removed all mock ratings, reviews, and user statistics from both landing pages and auth page - eliminated fake testimonials, download counts, star ratings, and user number claims for authentic presentation
- July 15, 2025. Removed Terms of Service and Privacy Policy documents from authentication dashboard as requested by user
- July 15, 2025. Fixed beverage distribution chart to display proper percentages instead of ratios (e.g., "Water: 76%" instead of "3:18")
- July 15, 2025. Updated analytics navigation tabs to show black text that turns blue when active as requested
- July 15, 2025. Added helpful info message under "Log Custom Amount" button: "💡 Log drinks other than water like coffee, juice etc."
- July 15, 2025. Fixed analytics database queries to use proper date fields and show real beverage distribution data
- July 15, 2025. Fixed hydration percentage calculation - beverages now correctly record effective hydration amount (e.g., 100ml soda at 60% = 60ml recorded)
- July 15, 2025. Improved dialog UI visibility - brightened custom amount input field borders and Cancel button for better user experience
- July 15, 2025. Enhanced milk icon visibility by changing color from light gray to darker gray
- July 15, 2025. Changed "Log Custom Amount" button to always display filled blue background for consistent visual appearance
- July 15, 2025. Removed "How Notifications Work" informational section from reminders page for cleaner UI
- July 15, 2025. Fixed analytics API errors by implementing missing storage functions and improved empty data handling
- July 15, 2025. Removed Replit dev banner script that was causing 404 errors at bottom of pages
- July 15, 2025. Major navigation restructuring: created new "Reminders" navigation item as fourth main feature alongside Home, Profile, and Analytics
- July 15, 2025. Consolidated notification settings by merging reminder settings from profile page into home page to eliminate duplicate settings
- July 15, 2025. Removed all test notification features from main app - cleaned up notification test components, simulators, and troubleshooting tools for production readiness
- July 12, 2025. App name changed from "QuenchNow" to "HydroMate" across all landing pages, main app, navigation, iOS configuration, and documentation
- July 12, 2025. Updated pricing structure with promotional discounts: Free plan $2.99 (15% off), Premium Monthly $7.99 (discounted), Premium Annual $86.39 (30% total discount)
- July 12, 2025. Cleaned up notification center by removing test features and creating production-ready settings interface
- July 01, 2025. Created modern landing page based on Figma design inspiration with clean layout, animations, and contemporary styling
- July 01, 2025. Implemented custom authentication pages to remove Replit branding and provide better user experience
- June 30, 2025. Major security audit and hardening completed
- June 30, 2025. Fixed timezone handling for Canadian users (America/Toronto)
- June 23, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.