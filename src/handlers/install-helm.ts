import * as core from '@actions/core'
import {execSync} from 'child_process'
import {errorHandler} from '../helpers/error-handler'
import {repositoryDirectory} from '../constants/repositoryDirectory'

/**
 * Downloads the helm installer bash script and runs
 * the script to install the helm.
 * @author Mehdi Rahimi mehdirahimi.dev@gmail.com
 * @returns {Promise<void>}
 */
export async function installHelm(_options?: {}): Promise<void> {
  try {
    core.info('Installing helm')
    execSync(
      'curl https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 | bash',
      {stdio: 'inherit', cwd: repositoryDirectory}
    )

    console.log('Helm is installed')
  } catch (error: unknown) {
    core.error('Failed to install helm')
    errorHandler(error)
  }
}
