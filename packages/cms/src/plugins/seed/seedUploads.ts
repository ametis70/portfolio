import { existsSync, lstatSync, promises as fs } from 'fs'
import path from 'path'
import { Payload } from 'payload'

import { SeedPluginOptions } from '.'

const seedUploads = async (options: SeedPluginOptions, payload: Payload) => {
  payload.logger.info('Seeding uploads')
  const uploadSeedsDir = path.resolve(options.seedsDir, 'uploads')
  if (!existsSync(uploadSeedsDir)) {
    payload.logger.warn(
      `"uploads" directory does not exist in "${options.seedsDir}", skipping upload seeds`,
    )
  } else {
    const uploadSeedDirs = await fs.readdir(uploadSeedsDir)

    for (const dir of uploadSeedDirs) {
      const dirPath = path.resolve(uploadSeedsDir, dir)
      payload.logger.debug(`Seeding ${dir}`)
      if (existsSync(dirPath) && lstatSync(dirPath).isDirectory()) {
        const files = await fs.readdir(path.resolve(dirPath))
        for (const file of files) {
          const id = file.split('.')[0]
          const collection = dir as unknown as any

          let exists = false
          try {
            await payload.findByID({
              collection,
              id,
              locale: 'es',
            })
            exists = true
          } catch { }

          if (!exists) {
            payload.logger.debug(`Seeding ${dir}/${file}`)

            try {
              await payload.create({
                collection,
                data: {
                  id,
                },
                locale: 'es',
                filePath: path.resolve(dirPath, file),
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

export default seedUploads
