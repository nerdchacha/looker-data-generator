import { LookerNodeSDK, NodeSettingsIniFile } from '@looker/sdk-node'

export const lookerSDK = (filename) => {
  console.log(`<INFO> Using config defined in ${filename}`)
  const setting = new NodeSettingsIniFile('', filename)
  return LookerNodeSDK.init40(setting)
}