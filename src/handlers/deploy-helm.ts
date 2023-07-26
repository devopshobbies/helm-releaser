import * as core from '@actions/core'
import {errorHandler} from '../helpers/error-handler'
import {execSync} from 'child_process'
import {repositoryDirectory} from '../constants/repositoryDirectory'

/**
 * This method will installs the helm chart on target kubernetes cluster
 * please be noticed before using this you need to configure kubectl
 * and installed helm.
 *
 * @author Mehdi Rahimi mehdirahimi.dev@gmail.com
 * @param {string} releaseName the name of release
 * @param {string} namespace default value is 'default'
 * @returns {Promise<void>}
 */
export async function deployHelmChart(config: {
  addedHelmRepositoryName: string
  releaseName: string
  chartVersion: string
  chartName: string
  valuesPath: string
  namespace?: string
}): Promise<void> {
  try {
    core.info('Deploying the helm')
    const namespaceFlag = config.namespace
      ? `--namespace ${config.namespace}`
      : ''

    execSync(
      `helm upgrade --install --timeout 180s ${config.releaseName} ${config.addedHelmRepositoryName}/${config.chartName} -f ${config.valuesPath} --version ${config.chartVersion} ${namespaceFlag} --kubeconfig kubeconfig`,
      {stdio: 'inherit', cwd: repositoryDirectory}
    )

    core.info('Deploying is done')
  } catch (error) {
    core.error('Deploying helm error')
    errorHandler(error)
  }
}
