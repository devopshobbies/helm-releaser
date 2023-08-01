import * as core from '@actions/core'
import {installHelm} from './handlers/install-helm'
import {errorHandler} from './helpers/error-handler'
import {deployHelmChart} from './handlers/deploy-helm'
import {installKubectl} from './handlers/install-kubectl'
import {addHelmRepository} from './handlers/add-helm-repo'
import {deployHelmLocal} from './handlers/deploy-helm-local'
import {setKubectlContext} from './handlers/kubectl-set-context'
import {setupKubectlConfig} from './handlers/setup-kubectl-config'
import {errorOnNullProperty} from './helpers/error-on-null-property'

/**
 * This is the entry point of our github action
 * every part of the application is linked down here.
 *
 * @returns {Promise<void>}
 */
async function run(): Promise<void> {
  try {
    const releaseName = core.getInput('releaseName', {
      required: true,
      trimWhitespace: true
    })

    const remoteRepository = core.getInput('remoteRepository', {
      required: false
    })

    const chartVersion = core.getInput('chartVersion', {required: false})
    const kubeConfig = core.getInput('kubeConfig', {required: true})
    const chartName = core.getInput('chartName', {required: false})
    const chartPath = core.getInput('chartPath', {required: false})
    const namespace = core.getInput('namespace') || 'default'
    const valuesPath = core.getInput('valuesPath')
    const context = core.getInput('context')

    // The sequence of invoking functions are important here
    await installKubectl()
    await setupKubectlConfig(kubeConfig)
    await installHelm()
    await setKubectlContext(context)

    if (!chartPath) {
      errorOnNullProperty({
        remoteRepository,
        chartVersion,
        chartName
      })

      const addedHelmRepositoryName = await addHelmRepository(remoteRepository)

      await deployHelmChart({
        addedHelmRepositoryName,
        releaseName,
        chartVersion,
        chartName,
        valuesPath,
        namespace
      })
    } else {
      deployHelmLocal(releaseName, chartPath)
    }

    return
  } catch (error) {
    core.error('Problem in releasing your helm chart')
    errorHandler(error)
  }
}

// Sad and alone run function invocation :).
run()
