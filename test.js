// import { serial, sleep } from "./util.js";
// import flatten from "lodash/flattenDeep.js";
// import sample from "lodash/sample.js";
// import { faker } from "@faker-js/faker";

// import { lookerSDK } from "./sdk.js";
// const sdk = lookerSDK("local.ini");

// const requests = [];

// const error = (e) => console.log(`Failed ${e}`);

// new Array(1000).fill(1).forEach((i) => {
//   requests.push([
//     () => sdk.ok(sdk.create_permission_set({})).catch(error),
//     () => sleep(100),
//   ]);
// });

// serial(flatten(requests)).then(() => console.log("DONE"));
