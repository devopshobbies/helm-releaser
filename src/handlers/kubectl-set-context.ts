import {execSync} from 'child_process'
import {repositoryDirectory} from '../constants/repositoryDirectory'
import * as core from '@actions/core'
import {errorHandler} from '../helpers/error-handler'

export async function setKubectlContext(context?: string) {
  try {
    if (!context) {
      return
    }

    core.info('Configuring context')
    execSync(`kubectl config use-context ${context}`, {
      stdio: 'inherit',
      cwd: repositoryDirectory
    })

    core.info(`Context successfully is set to ${context}`)
  } catch (error) {
    core.error('error in setting context')
    errorHandler(error)
  }
}
