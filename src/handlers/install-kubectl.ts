import {repositoryDirectory} from '../constants/repositoryDirectory'
import {errorHandler} from '../helpers/error-handler'
import {execSync} from 'child_process'
import * as core from '@actions/core'

/**
 * This method will install the kubectl on our runner
 * please be noticed that it does not setups the config
 * and for that you need to use setupKubectlConfig method.
 *
 * @author Mehdi Rahimi mehdirahimi.dev@gmail.com
 * @returns {Promise<void>}
 */
export async function installKubectl(): Promise<void> {
  try {
    core.info('Downloading kubectl config file')

    execSync(
      'curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"',
      {stdio: 'inherit', cwd: repositoryDirectory}
    )

    execSync('chmod +x kubectl', {stdio: 'inherit', cwd: repositoryDirectory})

    core.info('Moving the kubectl binary to /usr/local/bin/')

    execSync('sudo mv kubectl /usr/local/bin/', {
      stdio: 'inherit',
      cwd: repositoryDirectory
    })

    core.info('Kubectl installation is done !')
  } catch (error) {
    core.error('Failed to install kubectl')
    errorHandler(error)
  }
}
