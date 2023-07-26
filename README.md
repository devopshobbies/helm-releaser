# DevopsHobbies helm chart releaser action

![DevOps Hobbies Helm Chart Releaser](./.github/assets/helm-releaser-banner.png)

This action is in the **testing** stage.

Using this helm chart releaser you can pass any chart repository then install your favorite chart and apply your `values.yaml` file to get the result you want.

## Inputs

| Name             | description                                                                           | required | default            |
| ---------------- | ------------------------------------------------------------------------------------- | -------- | ------------------ |
| remoteRepository | Address of your remote repository like `https://devopshobbies.github.io/helm-generic` | true     | none               |
| chartName        | The name of the chart you want to get from remote repository                          | true     | none               |
| chartVersion     | The version of the chart you want to deploy                                           | true     | none               |
| kubeConfig       | The KubeConfig file as string (for kubernetes)                                        | true     | none               |
| releaseName      | The release name for released service on kubernetes                                   | true     | none               |
| valuesPath       | The path of your values.yaml file                                                     | false    | `.helm/values.yml` |
| context          | The context for your kubernetes configuration                                         | false    | none               |
| namespace        | The namespace you want to deploy your chart                                           | false    | `default`          |

## Sample

```
- name: Helm Release on staging
  uses: devopshobbies/helm-releaser@v1.1.0
  if: ${{ steps.isStaging.outputs.result == 'true' }}
  with:
    remoteRepository: ${{ vars.GENERIC_REPOSITORY }}
    chartName: "generic"
    releaseName: ${{ steps.repoName.outputs.result }}
    chartVersion: ${{ steps.genericVersion.outputs.version }}
    kubeConfig: ${{ secrets.KUBECONFIG }}
    context: "*-staging"
    valuesPath: ".helm/values.yaml"
```
