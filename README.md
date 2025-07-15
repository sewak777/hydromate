# HydroMate - Smart Hydration Tracking Application

A comprehensive hydration tracking application that helps users monitor their daily water intake through smart reminders, personalized goals, and detailed analytics.

## Features

- **Smart Goal Setting**: Personalized hydration goals based on weight, activity level, and weather conditions
- **Intelligent Reminders**: Customizable notifications that adapt to your schedule
- **Progress Tracking**: Beautiful visualizations of daily and weekly hydration patterns
- **Weather Integration**: Automatic goal adjustments based on temperature and humidity
- **Achievement System**: Gamification with unlockable badges and milestones
- **Cross-Platform**: Progressive Web App with native mobile capabilities

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Wouter, TanStack Query
- **Backend**: Node.js, Express, TypeScript, PostgreSQL, Drizzle ORM
- **Mobile**: Capacitor for iOS and Android native features
- **Payment**: Stripe integration for subscription management
- **Authentication**: Replit OAuth with session-based auth

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payment processing)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Push database schema:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Building for Production

```bash
npm run build
npm start
```

## Mobile App Development

The project includes Capacitor configuration for building native mobile apps:

```bash
# iOS
npx cap open ios

# Android  
npx cap open android
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Third-Party Licenses

This project uses various open-source libraries. See [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md) for a complete list of dependencies and their licenses.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support

For support, please contact the development team or create an issue in the repository.

## Copyright

Copyright (c) 2025 HydroMate. All rights reserved.