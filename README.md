# HydroMate - Smart Hydration Tracking Application

A cutting-edge hydration tracking application that transforms water intake monitoring into an engaging, personalized experience through intelligent location and weather-aware design.

## 🌟 Features

### Core Functionality
- **Smart Water Intake Tracking**: Log water and other beverages with hydration percentages
- **Personalized Daily Goals**: AI-calculated targets based on weight, gender, and activity level
- **Weather-Aware Recommendations**: Real-time adjustments based on local weather conditions
- **Achievement System**: Gamified tracking with unlockable badges and milestones

### Premium Features (PRO)
- **Advanced Analytics**: Detailed hydration patterns and insights
- **Weather Integration**: Location-based hydration recommendations
- **Weekly Progress Charts**: Visual progress tracking with trends
- **Enhanced Reminders**: Smart notifications based on weather and activity

### Technical Features
- **Cross-Platform**: Web app with mobile PWA capabilities
- **Real-time Data**: Live weather integration with OpenWeather API
- **Secure Authentication**: User accounts with session management
- **Responsive Design**: Beautiful UI that works on all devices

## 🚀 Live Demo

Visit [https://hydromate.ca](https://hydromate.ca) to try the app (deployment in progress)

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Wouter** for routing
- **TanStack Query** for state management
- **Recharts** for data visualization
- **Framer Motion** for animations

### Backend
- **Node.js** with Express
- **PostgreSQL** with Drizzle ORM
- **OpenWeather API** integration
- **Stripe** for payment processing
- **Session-based authentication**

### Deployment
- **Vercel** for hosting
- **Neon** for PostgreSQL database
- **Custom domain** support
- **SSL certificates** included

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database
- OpenWeather API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/hydromate.git
cd hydromate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
npm run db:push
```

5. Start the development server:
```bash
npm run dev
```

Visit `http://localhost:5000` to see the application running.

## 🔧 Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL=your_postgresql_connection_string

# API Keys
OPENWEATHER_API_KEY=your_openweather_api_key

# Authentication
SESSION_SECRET=your_session_secret
REPL_ID=your_repl_id
REPLIT_DOMAINS=your_domain.com

# Payment (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Environment
NODE_ENV=development
```

## 📁 Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                 # Node.js backend
│   ├── db.ts              # Database configuration
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data access layer
│   └── weather.ts         # Weather service
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema
└── docs/                   # Documentation
```

## 🎨 Design System

The app features a modern design with:
- **Gradient backgrounds** and smooth animations
- **Curved corners** (rounded-xl) for modern aesthetics
- **Consistent color palette** with blue-to-cyan gradients
- **Responsive layouts** that work on all screen sizes
- **Accessible UI** with proper contrast and screen reader support

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main branch

### Custom Domain Setup

1. Add your domain in Vercel project settings
2. Update DNS records:
   - A record: `@` → `76.76.19.61`
   - CNAME record: `www` → `cname.vercel-dns.com`

## 📊 Database Schema

The application uses PostgreSQL with the following main tables:
- `users` - User accounts and profiles
- `hydration_profiles` - User preferences and goals
- `intake_logs` - Water intake tracking
- `daily_summaries` - Analytics and progress
- `achievements` - Gamification system
- `subscriptions` - Premium features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Weather data provided by [OpenWeather](https://openweathermap.org/)
- Icons from [Lucide React](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)

## 📞 Support

For support, email support@hydromate.ca or create an issue in this repository.

---

**HydroMate** - Stay hydrated, stay healthy! 💧