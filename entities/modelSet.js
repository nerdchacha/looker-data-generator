import { faker } from '@faker-js/faker'

import { createEntity } from '../util.js'
import { lookerSDK } from '../sdk.js'

export const create = (filename) => (count) => {
	const sdk = lookerSDK(filename)
	console.log(`<INFO> Creating ${count} Model Sets`)
	return createEntity({
		sdk,
		count,
		creator: () => sdk.create_model_set({name: `${faker.company.name()} ${faker.number.hex()}`}),
		type: 'model set'
	})
}