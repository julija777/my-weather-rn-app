# Welcome to my Weather App!

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

## Override the expo default simulator geolocation:

🛠 For iOS Simulator:
Open Simulator

In the top menu:

Go to Features > Location > Custom Location...

Enter coordinates for London (e.g., 51.5072, -0.1276)

🛠 For Android Emulator:
Use Android Studio or adb:

adb emu geo fix -0.1276 51.5072

## On the Real Device

If you deny location permission once, Expo will fall back to the default.

✅ Solution:
Delete the Expo Go app and reinstall it to reset permissions

Or go to your device’s Settings > App > Expo Go > Location > Allow
