import { Plugin, Payload, TypedLocale } from 'payload'

import seed from './seed'

export type SeedPluginOptions = {
  enabled: boolean
  seedsDir: string
  defaultLocale: TypedLocale
  additionalLocales: TypedLocale[]
}

export const seedPlugin =
  (options: SeedPluginOptions): Plugin =>
    (incomingConfig) => {
      const config = { ...incomingConfig }

      config.bin = [
        {
          key: 'test',
          scriptPath: './plugins/seed',
        },
      ]

      if (options.enabled === false) {
        return config
      }

      config.onInit = async (payload: Payload) => {
        if (incomingConfig.onInit) await incomingConfig.onInit(payload)
        seed(options, payload)
      }

      return config
    }
