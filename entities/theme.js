import { faker } from '@faker-js/faker'

import { createEntity } from '../util.js'
import { lookerSDK } from '../sdk.js'

export const create = (filename) => (count) => {
  const sdk = lookerSDK((filename))
  return createEntity({
    sdk,
    count,
    creator: () => sdk.create_theme({name: `${faker.company.name()} ${faker.number.hex()}`}),
    type: 'theme'
  })
}