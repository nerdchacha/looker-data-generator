import flatten from 'lodash/flatten.js'

export const serial = funcs => 
  funcs.reduce((promise, func) =>
    promise.then(result => func().then(Array.prototype.concat.bind(result))), Promise.resolve([]))

export const sleep = (time = 200) => new Promise((resolve) => setTimeout(resolve, time))

export const createEntity = (config) => {
  const { count = 250, type, creator, sdk } = config
  const requests = new Array(count).fill(0)
  .map(() => [
      () => sdk.ok(creator()).catch((e) => console.log(`<WARNING> Failed to create ${type} - ${e.message}`)),
      sleep
    ])
  return serial(flatten(requests)).then(() => console.log(`<SUCCESS> All ${type} created`))
}