import { faker } from '@faker-js/faker'

import { createEntity } from '../util.js'
import { lookerSDK } from '../sdk.js'

export const create = (filename) => (count) => {
  const sdk = lookerSDK(filename)
  console.log(`<INFO> Creating ${count} User Attributes`)
  return createEntity({
    sdk,
    count,
    creator: () => sdk.create_user_attribute({
      name: faker.lorem.words(3).toLocaleLowerCase().split(' ').join('_'),
      label: faker.lorem.words(3),
      type: 'string'
    }),
    type: 'user attribute'
  })
}