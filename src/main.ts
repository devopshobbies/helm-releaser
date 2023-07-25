import * as core from '@actions/core'
import {installHelm} from './handlers/install-helm'
import {installKubectl} from './handlers/install-kubectl'
import {setupKubectlConfig} from './handlers/setup-kubectl-config'
import {errorHandler} from './helpers/error-handler'
import {deployHelmChart} from './handlers/deploy-helm'
import {setKubectlContext} from './handlers/kubectl-set-context'
import {addHelmRepository} from './handlers/add-helm-repo'

async function run(): Promise<void> {
  try {
    const kubeConfig = core.getInput('kubeConfig', {required: true})
    const releaseName = core.getInput('releaseName') || 'default'
    const namespace = core.getInput('namespace')
    const context = core.getInput('context')

    const chartRemote = core.getInput('remoteRepository', {required: true})
    const chartVersion = core.getInput('chartVersion', {required: true})
    const chartName = core.getInput('chartName', {required: true})
    const valuesPath = core.getInput('valuesPath')

    await installKubectl()
    await setupKubectlConfig(kubeConfig)
    await installHelm()
    await setKubectlContext(context)

    const addedHelmRepositoryName = await addHelmRepository(chartRemote)

    await deployHelmChart({
      addedHelmRepositoryName,
      releaseName,
      chartVersion,
      chartName,
      valuesPath,
      namespace
    })

    return
  } catch (error) {
    core.error('Problem in releasing your helm chart')
    errorHandler(error)
  }
}

run()
