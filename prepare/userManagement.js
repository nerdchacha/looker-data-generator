import { LookerNodeSDK } from '@looker/sdk-node'
import chunk from 'lodash/chunk.js'
import sampleSize from 'lodash/sampleSize.js'
import flattenDeep from 'lodash/flattenDeep.js'
import reject from 'lodash/reject.js'

import { serial, sleep } from '../util.js'

const sdk = LookerNodeSDK.init40()

const assign = async () => {
  const me = await sdk.ok(sdk.me('id'))
  const allRoles = await sdk.ok(sdk.all_roles({fields: 'id'}))
  const allUsers = await sdk.ok(sdk.all_users({fields: 'id'}))
  const allGroups = await sdk.ok(sdk.all_groups({fields: 'id'}))

  const chunks = chunk(reject(allRoles, ({id}) => id === me.id), Math.ceil(allRoles.length / 3))

  const error = () => console.log('Unable to assign role')

  const request = []
  chunks[0].forEach((role) => {
    request.push([
      () => sdk.ok(sdk.set_role_users(role.id, sampleSize(allUsers, 3).map(({id}) => id))).catch(error),
      sleep
    ])
  })
  chunks[1].forEach((role) => {
    request.push([
      () => sdk.ok(sdk.set_role_groups(role.id, sampleSize(allGroups, 3).map(({id}) => id))).catch(error),
      sleep
    ])
  })
  chunks[2].forEach((role) => {
    request.push([
      () => sdk.ok(sdk.set_role_users(role.id, sampleSize(allUsers, 3).map(({id}) => id))).catch(error),
      sleep,
      () => sdk.ok(sdk.set_role_groups(role.id, sampleSize(allGroups, 3).map(({id}) => id))).catch(error),
      sleep
    ])
  })

  serial(flattenDeep(request))
}

assign()