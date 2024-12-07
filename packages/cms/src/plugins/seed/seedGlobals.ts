import { existsSync, promises as fs, readFileSync } from 'fs'
import path from 'path'
import { Payload } from 'payload'

import { SeedPluginOptions } from '.'

const seedGlobals = async (options: SeedPluginOptions, payload: Payload) => {
  payload.logger.info('Seeding globals')
  const globalSeedsDir = path.resolve(options.seedsDir, 'globals')

  if (!existsSync(globalSeedsDir)) {
    payload.logger.warn(
      `"globals" directory does not exist in "${options.seedsDir}", skipping global seeds`,
    )

    return
  }

  const locales = [
    options.defaultLocale,
    ...options.additionalLocales.filter((locale) => locale !== options.defaultLocale),
  ]

  for (const locale of locales) {
    const localizedSeedsDir = path.resolve(globalSeedsDir, locale)

    if (!existsSync(localizedSeedsDir)) {
      payload.logger.warn(
        `locale directory does not exist in "${localizedSeedsDir}", skipping locale seeds`,
      )

      continue
    }

    const localizedSeeds = await fs.readdir(localizedSeedsDir)

    for (const file of localizedSeeds) {
      payload.logger.debug(`Seeding ${file}`)
      const filePath = path.resolve(localizedSeedsDir, file)
      try {
        const fileData = readFileSync(filePath, 'utf-8')
        const data = JSON.parse(fileData)
        await payload.updateGlobal({
          slug: file.split('.')[0] as any,
          data,
          locale: locale,
        })
      } catch (e) {
        throw new Error(`Error while seeding file ${filePath}`)
      }
    }
  }
}

export default seedGlobals
