export function errorOnNullProperty(object: {
  [key: string]: any | undefined
}): void {
  for (let key of Object.keys(object)) {
    if (!!!object[key]) {
      throw new Error(`The ${key} is not defined but it's required !`)
    }
  }
}
