import * as core from '@actions/core'
import {installHelm} from './handlers/install-helm'
import {installKubectl} from './handlers/install-kubectl'
import {setupKubectlConfig} from './handlers/setup-kubectl-config'
import {execSync} from 'child_process'
import {repositoryDirectory} from './constants/repositoryDirectory'
import {errorHandler} from './helpers/error-handler'

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

    execSync(`cat ${valuesPath}`, {stdio: 'inherit', cwd: repositoryDirectory})

    await installKubectl()
    await setupKubectlConfig(kubeConfig)
    await installHelm()

    execSync(`ls -lha`, {stdio: 'inherit', cwd: repositoryDirectory})

    return
  } catch (error) {
    core.error('Problem in releasing your helm chart')
    errorHandler(error)
  }
}

run()
