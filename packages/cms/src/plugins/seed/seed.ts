import { existsSync } from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import seedGlobals from './seedGlobals'

import type { SeedPluginOptions } from '.'

const seed = async (options: SeedPluginOptions, payload: Payload): Promise<void> => {
  try {
    const seedsDir = path.resolve(options.seedsDir)

    if (!existsSync(seedsDir)) {
      throw `Directory "${options.seedsDir}" does not exist`
    }

    await seedGlobals(options, payload)
  } catch (err: unknown) {
    payload.logger.error({ msg: 'Error in seed plugin', err })
  }
}

export default seed
