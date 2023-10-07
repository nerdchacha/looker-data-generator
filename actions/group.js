import chunk from "lodash/chunk.js";
import sample from "lodash/sample.js";
import flattenDeep from "lodash/flattenDeep.js";
import { faker } from "@faker-js/faker";

import { serial, sleep } from "../util.js";
import { lookerSDK } from "../sdk.js";

export const assign = (filename) => async () => {
  const sdk = lookerSDK(filename);
  console.log(`<INFO> Assigning members to groups`);
  const allUsers = await sdk.ok(sdk.all_users({ fields: "id" }));
  const allGroups = await sdk.ok(sdk.all_groups({ fields: "id" }));

  const chunks = chunk(allGroups, Math.ceil(allGroups.length / 2));
  const error = (e) =>
    console.log(`<WARNING> Failed to add member to a group - ${e.message}`);

  const request = [];
  chunks[0].forEach((group) => {
    request.push([
      () =>
        sdk
          .ok(sdk.add_group_group(group.id, { group_id: sample(chunks[1]).id }))
          .catch(error),
      sleep,
      () =>
        sdk
          .ok(sdk.add_group_group(group.id, { group_id: sample(chunks[1]).id }))
          .catch(error),
      sleep,
      () =>
        sdk
          .ok(sdk.add_group_user(group.id, { user_id: sample(allUsers).id }))
          .catch(error),
      sleep,
      () =>
        sdk
          .ok(sdk.add_group_user(group.id, { user_id: sample(allUsers).id }))
          .catch(error),
      sleep,
    ]);
  });

  return serial(flattenDeep(request)).then(() =>
    console.log(`<SUCCESS> Added members to groups`)
  );
};

export const createHierarchy = (filename) => async (count) => {
  const sdk = lookerSDK(filename);
  console.log(`<INFO> Creating group hierarchy with length - ${count}`);
  const request = [];
  let parent, child;
  parent = await sdk.ok(
    sdk.create_group({
      name: `${faker.company.name()} ${faker.number.hex()}`,
    })
  );
  new Array(count - 1).fill(1).forEach(() => {
    request.push([
      async () => {
        child = await sdk.ok(
          sdk.create_group({
            name: `${faker.company.name()} ${faker.number.hex()}`,
          })
        );
      },
      sleep,
      async () => {
        await sdk.ok(
          sdk.add_group_group(parent.id, {
            group_id: child.id,
          })
        );
        parent = child;
      },
      sleep,
    ]);
  });
  return serial(flattenDeep(request)).then(() =>
    console.log(`<SUCCESS> Group hierarchy successfully created`)
  );
};
