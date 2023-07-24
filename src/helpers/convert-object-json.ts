export function convertObjectToJson(object: any) {
  let jsonError: any = {}

  Object.getOwnPropertyNames(object).forEach(key => {
    jsonError[key] = object[key]
  })

  return JSON.stringify(jsonError, null, 2)
}
