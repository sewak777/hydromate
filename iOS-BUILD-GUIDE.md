# HydroMate iOS App Build Guide

## Current Status ✅

Your HydroMate app is **already configured** for iOS development! Here's what's ready:

- ✅ **Capacitor iOS Setup**: iOS platform added successfully
- ✅ **App Configuration**: Bundle ID `com.hydromate.app` configured
- ✅ **Native Features**: Push notifications, haptics, location services
- ✅ **App Assets**: Icons, splash screens, and branding ready

## Prerequisites

Before building the iOS app, ensure you have:

1. **macOS Computer** - Required for iOS development
2. **Xcode** - Latest version from App Store (free)
3. **Node.js** - Already installed in your Replit environment
4. **Apple Developer Account** - Required for App Store distribution

## Step 1: Download Your Project

Since this is running in Replit, you need to download your project to a Mac:

1. **Download Project**: Click the "Download as ZIP" button in Replit
2. **Extract on Mac**: Unzip the project folder
3. **Open Terminal**: Navigate to the project folder
4. **Install Dependencies**: Run `npm install`

## Step 2: Build the Web App

Build the web application for iOS:

```bash
# In your project terminal on Mac
npm run build
```

This creates the `client/dist` folder with your compiled web app.

## Step 3: Sync with Capacitor

Sync your web app with the iOS platform:

```bash
# Sync web app to iOS (iOS platform already added!)
npx cap sync ios
```

This command:
- Copies your web app to the iOS project
- Updates native dependencies
- Configures the iOS project

## Step 4: Open in Xcode

Open the iOS project in Xcode:

```bash
# Open iOS project in Xcode
npx cap open ios
```

This will launch Xcode with your QuenchNow iOS project.

## Step 5: Configure iOS Settings

### App Information
In Xcode, configure these settings:

1. **Bundle Identifier**: `com.quenchnow.app`
2. **App Name**: `QuenchNow`
3. **Version**: `1.0.0`
4. **Build Number**: `1`

### Capabilities
Enable these capabilities in Xcode:

1. **Push Notifications** - For hydration reminders
2. **Background App Refresh** - For scheduled notifications
3. **Location Services** - For weather-based recommendations

### Privacy Permissions
Add these to Info.plist:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>QuenchNow uses your location to provide weather-based hydration recommendations.</string>

<key>NSUserNotificationsUsageDescription</key>
<string>QuenchNow sends hydration reminders to help you stay healthy.</string>
```

## Step 6: Test on iOS Simulator

1. **Select iOS Simulator** in Xcode
2. **Choose device**: iPhone 15 Pro (recommended)
3. **Click Run button** or press `Cmd+R`

The app will launch in the iOS simulator where you can test all features.

## Step 7: Test on Physical Device

### Development Build
1. **Connect your iPhone** via USB
2. **Trust the developer** in iPhone Settings
3. **Select your device** in Xcode
4. **Click Run** to install on device

### Features to Test
- Push notifications
- Location services
- Offline functionality
- Native UI components
- Performance

## Step 8: App Store Preparation

### Icons and Assets
Ensure you have all required app icons:

- **App Icon**: 1024x1024 PNG
- **Launch Screen**: Various sizes
- **Screenshots**: For App Store listing

### App Store Connect
1. **Create App Store Connect account**
2. **Add new app** with Bundle ID: `com.quenchnow.app`
3. **Fill app metadata**:
   - App Name: QuenchNow
   - Description: Smart hydration tracking with personalized reminders
   - Keywords: water, hydration, health, wellness, tracker
   - Category: Health & Fitness

### Build for Release
1. **Archive the app** in Xcode
2. **Upload to App Store Connect**
3. **Submit for review**

## iOS-Specific Features

### Native Components
Your app includes these native iOS features:

1. **Push Notifications**
   - Daily hydration reminders
   - Goal achievement celebrations
   - Progress updates

2. **Haptic Feedback**
   - Button press feedback
   - Success vibrations
   - Alert haptics

3. **Status Bar**
   - Custom blue color theme
   - Light content style

4. **Splash Screen**
   - 2-second launch duration
   - Blue background (#2563eb)
   - QuenchNow branding

### Performance Optimizations
- **WKWebView**: Uses iOS's optimized web engine
- **Native Navigation**: Smooth transitions
- **Background Processing**: Efficient notification handling

## Development Commands

Use these commands for iOS development:

```bash
# Build web app and sync to iOS
npm run build && npx cap sync ios

# Open iOS project in Xcode
npx cap open ios

# Run on iOS simulator
npx cap run ios

# Add iOS platform (if needed)
npx cap add ios

# Update Capacitor
npx cap update ios
```

## Troubleshooting

### Common Issues

1. **Build Errors**
   - Clean build folder in Xcode
   - Run `npx cap sync ios` again
   - Check Capacitor plugin versions

2. **Simulator Issues**
   - Reset iOS simulator
   - Clear derived data in Xcode
   - Restart Xcode

3. **Device Testing**
   - Check developer certificates
   - Verify Bundle ID matches
   - Enable developer mode on device

### Support
- **Capacitor Docs**: https://capacitorjs.com/docs/ios
- **Xcode Help**: Built-in documentation
- **Apple Developer**: https://developer.apple.com

## App Store Submission Checklist

- [ ] App icons (all sizes)
- [ ] Screenshots (iPhone, iPad)
- [ ] App description and keywords
- [ ] Privacy policy URL
- [ ] Age rating completed
- [ ] App pricing set
- [ ] Release notes written
- [ ] App tested on multiple devices
- [ ] Push notification certificates configured
- [ ] In-app purchases configured (if applicable)

## Next Steps

1. **Build the web app**: `npm run build`
2. **Sync to iOS**: `npx cap sync ios`
3. **Open Xcode**: `npx cap open ios`
4. **Test in simulator**
5. **Deploy to device**
6. **Submit to App Store**

Your QuenchNow iOS app is ready for native mobile deployment!