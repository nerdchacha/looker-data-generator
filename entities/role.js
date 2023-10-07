import { faker } from '@faker-js/faker'
import sample from 'lodash/sample.js'
import reject from 'lodash/reject.js'

import { createEntity } from '../util.js'
import { lookerSDK } from '../sdk.js'

export const create = (filename) => async (count) => {
  const sdk = lookerSDK((filename))
  console.log(`<INFO> Creating ${count} Roles`)
  const permissionSets = await sdk.ok(sdk.all_permission_sets('id, all_access'))
  const modelSets = await sdk.ok(sdk.all_model_sets('id'))
  return createEntity({
    sdk,
    count,
    creator: () => sdk.create_role({
      name: `${faker.company.name()} ${faker.number.hex()}`,
      permission_set_id: sample(reject(permissionSets, 'all_access')).id,
      model_set_id: sample(modelSets).id
    }),
    type: 'role'
  })
}