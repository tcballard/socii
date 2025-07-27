# Socii Mobile App

Socii is a privacy-first social network designed for authentic connections with close friends and family.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd socii-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Update .env with your actual values
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Run on device/emulator:**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── forms/              # Form components
│   ├── screens/            # Screen-specific components
│   └── navigation/         # Navigation components
├── screens/
│   ├── auth/              # Authentication screens
│   ├── feed/              # Feed-related screens
│   ├── connections/       # Connection management screens
│   ├── profile/           # Profile screens
│   └── settings/          # Settings screens
├── services/
│   ├── api/               # API service layer
│   ├── auth/              # Authentication services
│   ├── storage/           # Storage services
│   └── notifications/     # Notification services
├── store/
│   ├── slices/            # Zustand store slices
│   └── types/             # Store-related types
├── utils/
│   ├── constants/         # App constants
│   ├── helpers/           # Utility functions
│   └── types/             # TypeScript type definitions
├── hooks/                 # Custom React hooks
└── config/                # Configuration files
```

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **State Management**: Zustand
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Navigation**: React Navigation v7
- **UI Components**: Custom components with React Native
- **TypeScript**: Full type safety
- **Payments**: Stripe + RevenueCat

## 🔧 Development

### Available Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run on web browser
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# RevenueCat Configuration
EXPO_PUBLIC_REVENUECAT_API_KEY=your_revenuecat_api_key
```

## 📱 Features

### Core Features (MVP)
- ✅ User authentication (email/password)
- ✅ Chronological feed
- 🚧 Connection management (up to tier limits)
- 🚧 Photo/video sharing
- 🚧 Privacy controls
- 🚧 Subscription management

### Subscription Tiers
- **Inner Circle**: $2.99/month (25 connections)
- **Close Friends**: $4.99/month (50 connections)
- **Full Circle**: $7.99/month (100 connections)
- **Family Plan**: $9.99/month (150 connections, 5 accounts)

## 🔒 Privacy & Security

- End-to-end encryption for messages
- Row-level security in database
- No data mining or advertising
- GDPR & CCPA compliant
- User data export functionality

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure
```
__tests__/
├── components/            # Component tests
├── screens/              # Screen tests
├── services/             # Service tests
└── utils/                # Utility tests
```

## 🚀 Deployment

### Building for Production

1. **Update app.json** with production configuration
2. **Build the app:**
   ```bash
   eas build --platform all
   ```
3. **Submit to app stores:**
   ```bash
   eas submit --platform all
   ```

## 📖 Documentation

- [Product Requirements Document](../docs/ProductRequirementDocumentVersion2)
- [Technology Stack](../docs/TechnologyStack.md)
- [Active Tasks](../docs/ActiveTasks.md)

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Add tests for new features
3. Update documentation as needed
4. Ensure TypeScript types are properly defined

## 📄 License

Private - All rights reserved.
