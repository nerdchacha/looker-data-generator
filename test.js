import { serial, sleep } from "./util.js";
import flatten from "lodash/flattenDeep.js";
import { faker } from "@faker-js/faker";

import { lookerSDK } from "./sdk.js";
const sdk = lookerSDK("local.ini");

const requests = [];

const error = (e) => console.log(`Failed ${e}`);

// Adhoc way of calling bulk API on an instance
new Array(10).fill(0).forEach((group) => {
  requests.push([
    () => sdk.ok(sdk.create_group({ name: faker.company.name() })).catch(error),
    () => sleep(100),
  ]);
});

serial(flatten(requests)).then(() => console.log("DONE"));
