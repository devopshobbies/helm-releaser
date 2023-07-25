import {execSync} from 'child_process'
import {repositoryDirectory} from '../constants/repositoryDirectory'
import * as core from '@actions/core'

/**
 * This will adds and updates the repository then
 * returns the name of added repository
 * @param repository
 * @param name
 * @returns {Promise<string>}
 */
export async function addHelmRepository(
  repository: string,
  name = 'action-repo'
): Promise<string> {
  core.info('Adding helm repository')

  execSync(`helm repo add ${name} ${repository}`, {
    stdio: 'inherit',
    cwd: repositoryDirectory
  })

  core.info('updating helm repository')
  execSync(`helm repo update`, {
    stdio: 'inherit',
    cwd: repositoryDirectory
  })

  return name
}
