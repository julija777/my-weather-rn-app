// https://docs.expo.dev/guides/using-eslint/
import { defineConfig } from 'eslint/config';
import { expoConfig } from 'eslint-config-expoConfig';

export default defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
  "rules": {
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }]
  }
}
]);
