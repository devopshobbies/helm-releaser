import path from 'path'
import {writeFile} from 'fs/promises'
import * as core from '@actions/core'
import {execSync} from 'child_process'
import {errorHandler} from '../helpers/error-handler'
import {repositoryDirectory} from '../constants/repositoryDirectory'

export async function setupKubectlConfig(kubeConfig: string) {
  try {
    if (!kubeConfig) {
      throw new Error('No kubeConfig provided')
    }

    core.info('Preparing the kubeConfig file')
    await writeFile('kubeconfig', kubeConfig)

    execSync(
      `export KUBECONFIG=${path.join(repositoryDirectory || '', 'kubeconfig')}`,
      {stdio: 'inherit', cwd: repositoryDirectory}
    )

    core.info('kubectl installation and configuration complete')
  } catch (error) {
    core.error('Failed to configure the kubectl')
    errorHandler(error)
  }
}
