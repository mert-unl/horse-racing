import { defineConfig } from 'cypress'
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin'

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on) {
      addMatchImageSnapshotPlugin(on)
    },
  },
})