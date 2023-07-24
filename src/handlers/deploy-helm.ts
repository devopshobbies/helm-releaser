import {execSync} from 'child_process'
import {repositoryDirectory} from '../constants/repositoryDirectory'
import {info} from '@actions/core'

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
export async function deployHelmChart(
  releaseName: string,
  genericChart: string,
  namespace: string = 'default'
): Promise<void> {
  info('deploying works')

  function wait() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {}, 2000)
    })
  }

  execSync('kubectl get pods --kubeconfig=kubeconfig')
  await wait()
}
