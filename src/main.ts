import * as core from '@actions/core'
import {installHelm} from './handlers/install-helm'
import {installKubectl} from './handlers/install-kubectl'
import {setupKubectlConfig} from './handlers/setup-kubectl-config'

async function run(): Promise<void> {
  try {
    const genericChart = core.getInput('genericChart', {
      required: true,
      trimWhitespace: true
    })

    const valuesPath = core.getInput('valuesPath', {required: true})
    const context = core.getInput('context', {required: true})
    const token = core.getInput('token', {required: true})
    const kubeConfig = core.getInput('kubeConfig', {required: true})

    await installKubectl()
    await setupKubectlConfig(kubeConfig)
    await installHelm()

    return
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
    throw error
  }
}

run()
