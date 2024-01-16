import { faker } from "@faker-js/faker";
import sample from "lodash/sample.js";

import { createEntity } from "../util.js";
import { lookerSDK } from "../sdk.js";

const DeliveryFormats = {
  assembled_pdf: "assembled_pdf",
  csv: "csv",
  html: "html",
  inline_table: "inline_table",
  inline_json: "inline_json",
  inline_visualizations: "inline_visualizations",
  json: "json",
  json_label: "json_label",
  json_detail: "json_detail",
  json_detail_lite_stream: "json_detail_lite_stream",
  txt: "txt",
  xlsx: "xlsx",
  wysiwyg_pdf: "wysiwyg_pdf",
  wysiwyg_png: "wysiwyg_png",
  csv_zip: "csv_zip",
};

const Address = {
  email: "user@google.com",
  webhook: "https://user.com",
  sftp: "sftp://user@1.1.1.1",
  s3: "s3://user",
};

const config = {
  look: {
    destination: {
      email: [
        DeliveryFormats.inline_table,
        DeliveryFormats.inline_visualizations,
        DeliveryFormats.csv,
        DeliveryFormats.xlsx,
        DeliveryFormats.json,
        DeliveryFormats.txt,
        DeliveryFormats.html,
      ],
      webhook: [
        DeliveryFormats.csv,
        DeliveryFormats.xlsx,
        DeliveryFormats.json,
        DeliveryFormats.json_label,
        DeliveryFormats.inline_json,
        DeliveryFormats.json_detail,
        DeliveryFormats.txt,
        DeliveryFormats.html,
      ],
      sftp: [
        DeliveryFormats.csv,
        DeliveryFormats.xlsx,
        DeliveryFormats.txt,
        DeliveryFormats.html,
        DeliveryFormats.json,
        DeliveryFormats.json_detail,
      ],
      s3: [
        DeliveryFormats.csv,
        DeliveryFormats.xlsx,
        DeliveryFormats.txt,
        DeliveryFormats.html,
        DeliveryFormats.json,
        DeliveryFormats.json_detail,
      ],
    },
  },
  dashboard: {
    destination: {
      email: [
        DeliveryFormats.wysiwyg_pdf,
        DeliveryFormats.wysiwyg_png,
        DeliveryFormats.csv_zip,
      ],
      webhook: [
        DeliveryFormats.wysiwyg_pdf,
        DeliveryFormats.wysiwyg_png,
        DeliveryFormats.csv_zip,
      ],
      sftp: [
        DeliveryFormats.wysiwyg_pdf,
        DeliveryFormats.wysiwyg_png,
        DeliveryFormats.csv_zip,
      ],
      s3: [
        DeliveryFormats.wysiwyg_pdf,
        DeliveryFormats.wysiwyg_png,
        DeliveryFormats.csv_zip,
      ],
    },
    id: "1",
  },
};

export const create = (filename) => async (count) => {
  const sdk = lookerSDK(filename);
  console.log(`<INFO> Creating ${count} Scheduled Plans`);
  const type = sample(Object.keys(config));
  const destination = sample(Object.keys(config[type].destination));
  const format = sample(config[type].destination[destination]);
  const scheduled_plan_destination = {
    format,
    address: Address[destination],
    type: destination,
    secret_parameters:
      '{"password": "password", "secret_access_key": "secret_access_key"}',
    parameters:
      '{"username": "username", "access_key_id": "access_key_id", "region": "region"}',
  };
  const looks = await sdk.ok(sdk.all_looks("id"));
  const dashboards = await sdk.ok(sdk.all_dashboards("id"));
  const users = await sdk.ok(sdk.all_users("id"));
  if (!looks.length) {
    console.log(
      `<ERROR> No Looks available in the instance. Please ensure that at least 1 look is available. Existing without creating a any scheduled plans`
    );
    return;
  }
  if (!dashboards.length) {
    console.log(
      `<ERROR> No Dashboards available in the instance. Please ensure that at least 1 dashboard is available. Existing without creating a any scheduled plans`
    );
  }
  const scheduled_plan = Object.assign(
    {},
    {
      name: faker.company.name(),
      crontab: "0 6 1 * *",
      scheduled_plan_destination: [scheduled_plan_destination],
      require_results: false,
      require_no_results: false,
      require_change: false,
      user_id: sample(users).id,
    },
    type === "look" && { look_id: sample(looks).id },
    type === "dashboard" && { dashboard_id: sample(dashboards).id }
  );

  return createEntity({
    sdk,
    count,
    creator: () => sdk.ok(sdk.create_scheduled_plan(scheduled_plan)),
    type: "scheduled plan",
  });
};
