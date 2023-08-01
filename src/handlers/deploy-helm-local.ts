import {execSync} from 'child_process'
import {errorHandler} from '../helpers/error-handler'

/**
 * This function will install the helm chart using local
 * chart inside .helm or other specified path.
 * @returns {Promise<void>}
 * @argument {string} releaseName The name of helm release, you can see it by helm list
 * @argument {string} namespace The namespace you want to deploy the chart.
 * @argument {string} path The path of your local chart.
 */
export async function deployHelmLocal(
  releaseName: string,
  path: string = '.helm',
  namespace?: string
): Promise<void> {
  try {
    const namespaceFlag = namespace ? `--namespace ${namespace}` : ''

    execSync(
      `helm upgrade --install --timeout 180s ${releaseName} ${path} ${namespaceFlag} --kubeconfig kubeconfig`,
      {stdio: 'inherit'}
    )
  } catch (e) {
    throw errorHandler(e)
  }
}
