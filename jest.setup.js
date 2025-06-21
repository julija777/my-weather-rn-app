import "@testing-library/jest-native/extend-expect";

jest.mock('expo-router', () => {
  return {
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    useLocalSearchParams: () => ({}),
    Slot: () => null,
  };
});

jest.mock("expo", () => ({
  ...jest.requireActual("expo"),
}));

jest.mock("expo-font", () => ({
  loadAsync: jest.fn(),
}));

jest.mock("expo-status-bar", () => ({
  StatusBar: () => null,
}));

jest.mock("react-native-reanimated", () =>
  require("react-native-reanimated/mock"),
);

jest.mock("react-native-gesture-handler", () => {
  const View = require("react-native/Libraries/Components/View/View");
  return {
    ...jest.requireActual("react-native-gesture-handler"),
    GestureHandlerRootView: View,
  };
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock other window properties that Tamagui might need
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

// Mock requestAnimationFrame
global.requestAnimationFrame = (cb) => setTimeout(cb, 0);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// Suppress react-test-renderer deprecation warning if needed
const originalError = console.error;
console.error = (...args) => {
  if (args[0]?.includes && args[0].includes('react-test-renderer is deprecated')) {
    return;
  }
  originalError.call(console, ...args);
};
