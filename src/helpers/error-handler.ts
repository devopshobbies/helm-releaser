import * as core from '@actions/core'
import {convertObjectToJson} from './convert-object-json'

export function errorHandler(error: unknown) {
  if (error instanceof Error) {
    core.error(error.message)
  } else {
    core.error(convertObjectToJson(error))
  }

  process.exit(1)
}
