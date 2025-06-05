import { createTamagui } from 'tamagui'
import { config as defaultConfig } from '@tamagui/config/v3'

const config = createTamagui({
  ...defaultConfig,
})

export default config
export type AppConfig = typeof config
