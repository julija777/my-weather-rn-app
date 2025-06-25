# Weather Forecast App 🌤️

A React Native weather application built with Expo, providing current weather conditions, forecasts, and city search functionality with a beautiful glass-morphism UI design.



## Demo
<video src="https://github.com/user-attachments/assets/7be24f90-2898-48c3-aa92-e7305d8ee8f8"> </video>

- Real-time weather data display
- 5-day forecast visualisation  
- Location-based weather detection
- City search and save functionality
- Interactive hourly weather details
- Smart weather notifications
- Glass-morphism design with dynamic themes

<details>
<summary><b>📱 Features Overview</b></summary>

### Core Features
- **Current Weather Display**: Real-time temperature, weather conditions, and location-based data
- **5-Day Forecast**: Extended weather predictions with detailed daily information
- **Hourly Weather Details**: Tap weather cards to view hourly breakdowns
- **City Search & Save**: Search for any city and save favorites for quick access
- **Smart Notifications**: UV index alerts and umbrella reminders based on weather conditions
- **Location Services**: Automatic location detection with fallback to London
- **Responsive Design**: Optimised for various screen sizes with glass-morphism effects

### Technical Features
- **Tab Navigation**: Three main sections (Home, FlyAway, More)
- **Dynamic Theming**: Color-coded weather categories (Now/Tomorrow/5-Day)
- **Error Handling**: Graceful error states with user-friendly messages
- **Loading States**: Smooth loading indicators throughout the app
- **API Integration**: Open-Meteo API for reliable weather data

</details>

<details>
<summary><b>🏗️ Architecture & Tech Stack</b></summary>

### Tech Stack
- **Framework**: React Native with Expo
- **Navigation**: Expo Router (file-based routing)
- **UI Library**: Tamagui for consistent design system
- **State Management**: Legend State for observable state
- **Icons**: Lucide React Native & Expo Vector Icons
- **Location Services**: Expo Location
- **API**: Open-Meteo Weather API (free, no API key required)

### Project Structure
```
app/
├── (tabs)/                 # Tab-based navigation
│   ├── index.tsx          # Home screen
│   ├── flyaway.tsx        # City search screen
│   └── more.tsx           # Information screen
├── screens/               # Modal screens
│   └── hourly-weather-screen.tsx
└── _layout.tsx           # Root layout

components/
├── Cards/                # Reusable card components
├── Headers/              # Header components
├── common/               # Shared UI components
└── ui/                   # Base UI components

hooks/                    # Custom React hooks
├── useLocation.ts        # Location services
├── useWeatherData.ts     # Weather API integration
└── useWeatherNotification.tsx

services/                 # Business logic
├── weatherService.ts     # API service layer
└── handleWeatherCardPress.ts

store/                    # State management
└── cityStore.ts          # Saved cities state

types/                    # TypeScript definitions
├── types.ts             # Weather data types
└── colourTypes.ts       # Theme types
```

### Design Patterns
- **Custom Hooks**: Separation of concerns for data fetching and state management
- **Component Composition**: Reusable UI components with props-based customisation
- **Service Layer**: Abstracted API calls with error handling
- **Type Safety**: Comprehensive TypeScript definitions
- **Responsive Design**: Adaptive layouts for different screen sizes

</details>

<details>
<summary><b>⚙️ Installation & Setup</b></summary>

### Prerequisites
- Node.js (v16 or higher)
- npm 
- Expo CLI
- iOS Simulator or Android Emulator (for testing)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <my-weather-rn-app>
   cd weather-forecast-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

### Environment Setup
No additional environment variables required. The app uses the free Open-Meteo API which doesn't require an API key.

### Override the expo default simulator geolocation:

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

</details>

<details>
<summary><b>📖 Usage Guide</b></summary>

### Home Screen
- **Weather Tabs**: Switch between "Now", "Tomorrow", and "Next 5 Days"
- **Location Display**: Shows current location
- **Weather Cards**: Tap cards to view hourly details (Now/Tomorrow only)
- **Smart Notifications**: Receive UV alerts and rain reminders

### FlyAway Screen
- **City Search**: Enter any city name to get weather information
- **Save Cities**: Searched cities are automatically saved
- **Saved Cities List**: Quick access to previously searched locations
- **Delete Cities**: Remove saved cities with trash icon

### More Screen
- **API Information**: Learn about the Open-Meteo API
- **Sample Data**: View example API requests

### Navigation
- **Tab Navigation**: Bottom tabs for main screens
- **Modal Navigation**: Hourly weather opens as modal
- **Back Navigation**: Hardware back button and header back buttons

</details>

<details>
<summary><b>🔧 API Integration</b></summary>

### Open-Meteo API
The app uses the free Open-Meteo Weather API for all weather data:

**Base URL**: `https://api.open-meteo.com/v1/forecast`

### API Endpoints Used

1. **Current Weather**
   ```
   ?latitude={lat}&longitude={lng}&current_weather=true&hourly=temperature_2m,weathercode&timezone=auto
   ```

2. **Daily Forecast**
   ```
   ?latitude={lat}&longitude={lng}&daily=temperature_2m_max,temperature_2m_min,weathercode&start_date={date}&end_date={date}&timezone=auto
   ```

3. **Hourly Forecast**
   ```
   ?latitude={lat}&longitude={lng}&hourly=temperature_2m,weathercode,relative_humidity_2m,wind_speed_10m,precipitation&start_date={date}&end_date={date}&timezone=auto
   ```

4. **UV Index**
   ```
   ?latitude={lat}&longitude={lng}&current=uv_index&timezone=auto
   ```

### Error Handling
- Network errors are caught and display user-friendly messages
- API errors show appropriate fallback content
- Location permission denials use default London coordinates

</details>

<details>
<summary><b>📱 Screen Details</b></summary>

### Home Screen (`app/(tabs)/index.tsx`)
- Dynamic icons based on weather
- Three-tab system (Now/Tomorrow/5-Day)
- Interactive weather cards with tap navigation
- Location-based weather display
- Smart notification system

### FlyAway Screen (`app/(tabs)/flyaway.tsx`)
- City search functionality with geocoding
- Automatic city saving to local state
- Saved cities list with delete functionality
- Weather display for searched cities
- Glass-card design for weather information

### More Screen (`app/(tabs)/more.tsx`)
- Information about the Open-Meteo API
- Sample API request links
- Clean, minimal design with external links

### Hourly Weather Screen (`app/screens/hourly-weather-screen.tsx`)
- Modal presentation style
- 24-hour forecast display
- Detailed weather metrics (humidity, wind, precipitation)
- Scrollable list of hourly cards
- Back navigation with header

</details>

<details>
<summary><b>🔄 State Management</b></summary>

### Legend State Implementation
```typescript
// cityStore.ts
export const cityState = observable({
  savedCities: [] as { name: string; weather: CurrentWeatherData }[],
});
```

### Custom Hooks
- **useLocation**: Manages location services and city detection
- **useWeatherData**: Fetches weather data based on active tab
- **useHourlyWeatherData**: Handles hourly forecast API calls
- **useWeatherNotification**: Generates smart weather alerts

### Data Flow
1. Location detected or city searched
2. Weather data fetched from API
3. Data processed and formatted
4. UI components render with loading/error states
5. User interactions trigger navigation or data updates

</details>

<details>
<summary><b>🔧 Configuration</b></summary>

### Tamagui Config
The app uses Tamagui for consistent design system with custom configurations:

```typescript
// tamagui.config.ts
export default createTamagui({
  // Custom theme configuration
  // Color schemes and design tokens
  // Animation configurations
});
```

### Constants
```typescript
// constants/constants.ts
export const TABS = [
  { key: "teal", label: "Now" },
  { key: "blue", label: "Tomorrow" },
  { key: "purple", label: "Next 5 Days" },
] as const;

export const WEATHER_DESCRIPTIONS = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  // ... weather code mappings
};
```

</details>

<details>
<summary><b>🧪 Error Handling & Edge Cases</b></summary>

### Error Scenarios Handled
1. **Location Permission Denied**: Falls back to London coordinates
2. **Network Errors**: Shows error state with retry options
3. **API Failures**: Displays user-friendly error messages
4. **Invalid City Search**: Alert notification for city not found
5. **Missing Weather Data**: Fallback values and empty states

### Loading States
- Spinner indicators during API calls
- Skeleton loading for weather cards
- Progressive loading for different data types

</details>

<details>
<summary><b>📈 Performance Optimisations</b></summary>

### Optimisation Strategies
- **Memoised Components**: Prevent unnecessary re-renders
- **Efficient API Calls**: Debounced search and cached responses
- **Image Optimisation**: Compressed background images
- **Lazy Loading**: Components loaded on demand
- **State Management**: Observable patterns for efficient updates

### Bundle Optimisation
- Tree-shaking unused code
- Optimised imports from component libraries
- Compressed assets and images
- Efficient navigation structure

</details>

<details>
<summary><b>📝 Development Guidelines</b></summary>

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Component Naming**: PascalCase for components, camelCase for functions
- **File Organisation**: Feature-based folder structure

### Testing Approach
- Unit tests for utility functions
- Integration tests for API services
- Component testing with React Native Testing Library


</details>

<details>
<summary><b>🚀 Deployment</b></summary>

### Build for Production

1. **Create production build**
   ```bash
   npx expo build:android
   npx expo build:ios
   ```

2. **Generate app bundles**
   ```bash
   npx expo export
   ```

3. **Submit to app stores**
   ```bash
   npx expo submit:android
   npx expo submit:ios
   ```

### Environment Configuration
- Production API endpoints
- Analytics configuration
- Crash reporting setup
- Performance monitoring

</details>

<details>
<summary><b>📋 Plan for Improvements</b></summary>

### Code Quality Improvements

1. **TypeScript Enhancements**
   - Add stricter type definitions for API responses
   - Implement discriminated unions for weather states
   - Add generic types for reusable components

2. **Error Boundary Implementation**
   ```typescript
   // Add React Error Boundary for graceful error handling
   class WeatherErrorBoundary extends React.Component {
     // Catch and handle component errors
   }
   ```

3. **Performance Optimisations**
   - Implement React.memo for expensive components
   - Add useMemo for computed values
   - Optimise re-renders with useCallback


### Feature Enhancements

1. **Offline Support**
   - Cache weather data locally
   - Implement offline-first architecture
   - Add sync capabilities when online

2. **Advanced Notifications**
   - Push notifications for weather alerts
   - Customisable notification preferences
   - Location-based weather warnings

3. **Data Visualisation**
   - Charts for temperature trends
   - Precipitation probability graphs
   - Wind direction indicators

4. **User Preferences**
   - Temperature unit selection (°C/°F)
   - Theme customisation options
   - Language localisation support

5. **Advanced Features**
   - Weather radar integration
   - Air quality index display
   - Sunrise/sunset times
   - Moon phase information

### Technical Debt

1. **API Layer Improvements**
   - Implement request/response interceptors
   - Add retry logic with exponential backoff
   - Implement proper caching strategy

2. **Accessibility**
   - Add comprehensive screen reader support
   - Implement keyboard navigation
   - Add high contrast mode
   - High contrast text and backgrounds
   - Proper ARIA labels for screen readers
   - Keyboard navigation support


3. **Testing Infrastructure**
   - Unit tests for hooks and utilities
   - Integration tests for API services
   - Component snapshot testing
   - E2E testing with Detox

4. **Git Workflow
   - Feature branches for new development
   - Pull requests with code review
   - Semantic commit messages
   - Automated testing on CI/CD pipeline
     
</details>

## Acknowledgments

- [Open-Meteo API](https://open-meteo.com/) for free weather data
- [Expo](https://expo.dev/) for the development platform
- [Tamagui](https://tamagui.dev/) for the UI component library
- [Lucide](https://lucide.dev/) for beautiful icons

---

*Built by Julija Stepanova with ❤️ using React Native and Expo*
