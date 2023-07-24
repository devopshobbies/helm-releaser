import * as core from '@actions/core'
import {installHelm} from './handlers/install-helm'
import {installKubectl} from './handlers/install-kubectl'
import {setupKubectlConfig} from './handlers/setup-kubectl-config'
import {execSync} from 'child_process'
import {repositoryDirectory} from './constants/repositoryDirectory'
import {errorHandler} from './helpers/error-handler'
import {deployHelmChart} from './handlers/deploy-helm'
import {setKubectlContext} from './handlers/kubectl-set-context'

async function run(): Promise<void> {
  try {
    const genericChart = core.getInput('genericChart', {
      required: true,
      trimWhitespace: true
    })

    const valuesPath = core.getInput('valuesPath')
    const releaseName = core.getInput('releaseName')
    const namespace = core.getInput('namespace')
    const context = core.getInput('context')
    const token = core.getInput('token', {required: true})
    const kubeConfig = core.getInput('kubeConfig', {required: true})

    await installKubectl()
    await setupKubectlConfig(kubeConfig)
    await installHelm()
    await setKubectlContext(context)
    await deployHelmChart(releaseName, genericChart, namespace)

    return
  } catch (error) {
    core.error('Problem in releasing your helm chart')
    errorHandler(error)
  }
}

run()
