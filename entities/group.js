import { faker } from '@faker-js/faker'

import { createEntity } from '../util.js'
import { lookerSDK } from '../sdk.js'

export const create = (filename) => (count) => {
  const sdk = lookerSDK(filename)
  console.log(`<INFO> Creating ${count} Groups`)
  return createEntity({
    sdk,
    count,
    creator: () => sdk.create_group({name: `${faker.company.name()} ${faker.number.hex()}`}),
    type: 'group'
  })
}