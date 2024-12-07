import { existsSync, lstatSync, promises as fs, readFileSync } from 'fs'
import path from 'path'
import { Payload } from 'payload'

import { SeedPluginOptions } from '.'

const seedCollections = async (options: SeedPluginOptions, payload: Payload) => {
  payload.logger.info('Seeding collections')
  const collectionSeedsDir = path.resolve(options.seedsDir, 'collections')
  if (!existsSync(collectionSeedsDir)) {
    payload.logger.warn(
      `"collections" directory does not exist in "${options.seedsDir}", skipping collection seeds`,
    )
  } else {
    const collectionSeedsDirs = await fs.readdir(collectionSeedsDir)

    for (const dir of collectionSeedsDirs) {
      const dirPath = path.resolve(collectionSeedsDir, dir)
      payload.logger.debug(`Seeding ${dir}`)
      if (existsSync(dirPath) && lstatSync(dirPath).isDirectory()) {
        const files = await fs.readdir(path.resolve(dirPath))
        for (const file of files) {
          const id = file.split('.')[0] as unknown as any
          const collection = dir as unknown as any

          let exists = false
          try {
            await payload.findByID({
              collection,
              id,
              locale: options.defaultLocale,
            })
            exists = true
          } catch { }

          if (!exists) {
            payload.logger.debug(`Seeding ${dir}/${file}`)
            const fileData = readFileSync(path.resolve(dirPath, file), 'utf-8')
            const data = JSON.parse(fileData)

            try {
              await payload.create({
                collection,
                data: {
                  ...data,
                  id,
                },
                locale: options.defaultLocale,
              })
            } catch (e) {
              throw `Error while seeding file ${dir}/${file}: ${e}`
            }
          } else {
            payload.logger.debug(`Skipping "${id}": already exists in collection "${dir}"`)
          }
        }
      }
    }
  }
}

export default seedCollections
