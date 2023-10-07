import { faker } from '@faker-js/faker'

import { createEntity } from '../util.js'
import { lookerSDK } from '../sdk.js'

export const create = (filename) => (count) => {
  const sdk = lookerSDK(filename)
  console.log(`<INFO> Creating ${count} Users`)
  return createEntity({
    sdk,
    count,
    creator: () => sdk.create_user({ first_name: faker.person.firstName(), last_name: faker.person.lastName(), credentials_email: { email: faker.internet.email() } }),
    type: 'user'
  })
}