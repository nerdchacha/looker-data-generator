import sampleSize from 'lodash/sampleSize.js'
import flattenDeep from 'lodash/flattenDeep.js'

import { serial, sleep } from '../util.js'
import { lookerSDK } from '../sdk.js'

export const assign = (filename) => async () => {
  const sdk = lookerSDK(filename)
  console.log(`<INFO> Assigning roles to users and groups`)
  const me = await sdk.ok(sdk.me('id'))
  const allRoles = await sdk.ok(sdk.all_roles({fields: 'id'}))
  const allUsers = await sdk.ok(sdk.all_users({fields: 'id'}))
  const allGroups = await sdk.ok(sdk.all_groups({fields: 'id'}))

  const error = (e) => console.log(`<WARNING> Failed to assign a role - ${e.message}`)

  // Users
  allUsers.forEach((user) => {
    request.push([
      () => sdk.ok(sdk.set_user_roles(user.id, sampleSize(allRoles, 3).map(({id}) => id))).catch(error),
      sleep
    ])
  })

  // Groups
  const groupRoleMapping = {}
  allGroups.forEach((group) => {
    sampleSize(allRoles, 3).forEach((role) => {
      groupRoleMapping[role.id] = groupRoleMapping[role.id] || []
      groupRoleMapping[role.id].push(group.id)
    })
  })

  Object.keys(groupRoleMapping).forEach((roleId) => {
    request.push([
      () => sdk.ok(sdk.set_group(roleId, groupRoleMapping[roleId])).catch(error),
      sleep
    ])
  })

  return serial(flattenDeep(request)).then(() => console.log(`<SUCCESS> Assigned roles to users and groups`))
}