### Welcome to my Weather App!

The MVP for the app:

**Weather Forecast App**

You have been tasked with creating a weather forecast app using React Native.

Your app should fetch weather data from an open API and display it to the user.

**Requirements:**

The app should have two screens:

👉 a. Home screen:

Display the current weather conditions:

temperature,

weather description,

and any other relevant information for the user's current location.

👉 b. Forecast screen:

Display a 5-day weather forecast for the user's current location.

The app should make use of an open API to fetch weather data.

👉 You can choose any open weather API of your choice (e.g., OpenWeatherMap, WeatherAPI, etc.).

👉 The app should handle errors gracefully. If there is an error fetching weather data or the API returns an error response, display an appropriate error message to the user.

👉 Use React Navigation or any other navigation library of your choice to implement navigation between the home and forecast screens.

👉 Implement the ability for the user to search for weather conditions in different locations, and save a City once you’ve searched for it.

👉 Please provide a GitHub repository link containing your React Native code along with a 👉README file explaining how to run the app and any additional information you think is necessary.

👉 Note: You are free to use any additional libraries or tools you deem necessary to complete the task.

👉 Focus on writing clean, maintainable code, and demonstrate your proficiency in working with

👉 React Native components,

👉 state management,

👉 API integration,

👉 and navigation.

## Run the App

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
