import { serial, sleep } from "./util.js";
import flatten from "lodash/flatten.js";
import sample from "lodash/sample.js";
import { faker } from "@faker-js/faker";
import { lookerSDK } from "./sdk.js";
import fetch from "node-fetch";

const sdk = lookerSDK("load.ini");

// const DeliveryFormats = {
//   assembled_pdf: "assembled_pdf",
//   csv: "csv",
//   html: "html",
//   inline_table: "inline_table",
//   inline_json: "inline_json",
//   inline_visualizations: "inline_visualizations",
//   json: "json",
//   json_label: "json_label",
//   json_detail: "json_detail",
//   json_detail_lite_stream: "json_detail_lite_stream",
//   txt: "txt",
//   xlsx: "xlsx",
//   wysiwyg_pdf: "wysiwyg_pdf",
//   wysiwyg_png: "wysiwyg_png",
//   csv_zip: "csv_zip",
// };

// const Address = {
//   email: "lookeruser@google.com",
//   webhook: "https://looker.com",
//   sftp: "sftp://user@1.1.1.1",
//   s3: "s3://looker",
// };

// const config = {
//   look: {
//     destination: {
//       email: [
//         DeliveryFormats.inline_table,
//         DeliveryFormats.inline_visualizations,
//         DeliveryFormats.csv,
//         DeliveryFormats.xlsx,
//         DeliveryFormats.json,
//         DeliveryFormats.txt,
//         DeliveryFormats.html,
//       ],
//       webhook: [
//         DeliveryFormats.csv,
//         DeliveryFormats.xlsx,
//         DeliveryFormats.json,
//         DeliveryFormats.json_label,
//         DeliveryFormats.inline_json,
//         DeliveryFormats.json_detail,
//         DeliveryFormats.txt,
//         DeliveryFormats.html,
//       ],
//       sftp: [
//         DeliveryFormats.csv,
//         DeliveryFormats.xlsx,
//         DeliveryFormats.txt,
//         DeliveryFormats.html,
//         DeliveryFormats.json,
//         DeliveryFormats.json_detail,
//       ],
//       s3: [
//         DeliveryFormats.csv,
//         DeliveryFormats.xlsx,
//         DeliveryFormats.txt,
//         DeliveryFormats.html,
//         DeliveryFormats.json,
//         DeliveryFormats.json_detail,
//       ],
//     },
//     id: "1",
//   },
//   dashboard: {
//     destination: {
//       email: [
//         DeliveryFormats.wysiwyg_pdf,
//         DeliveryFormats.wysiwyg_png,
//         DeliveryFormats.csv_zip,
//       ],
//       webhook: [
//         DeliveryFormats.wysiwyg_pdf,
//         DeliveryFormats.wysiwyg_png,
//         DeliveryFormats.csv_zip,
//       ],
//       sftp: [
//         DeliveryFormats.wysiwyg_pdf,
//         DeliveryFormats.wysiwyg_png,
//         DeliveryFormats.csv_zip,
//       ],
//       s3: [
//         DeliveryFormats.wysiwyg_pdf,
//         DeliveryFormats.wysiwyg_png,
//         DeliveryFormats.csv_zip,
//       ],
//     },
//     id: "1",
//   },
// };

// const response = await fetch(
//   "https://experiment-yatingera-load.dev.looker.com/api/internal/admin/scheduled_plans",
//   {
//     method: "GET",
//     headers: {
//       Accept: "application/json",
//       "X-Csrf-Token": "pfLtVkiJVbmZMwxA+4w6RUmkFosMhCiMBYkpSTti8nM=",
//       Cookie:
//         "looker.browser=3886530; looker.trust.hint=1; _ga=GA1.2.888881009.1690866950; __zlcmid=1Hrm7i5P4gYT2cX; _gcl_au=1.1.179879766.1696482766; _mkto_trk=id:131-VDZ-197&token:_mch-looker.com-1696482767015-24534; looker.expires_at=2023-11-08T10%3A15%3A46%2B00%3A00; looker.session_renewable=true; CSRF-TOKEN=pfLtVkiJVbmZMwxA%2B4w6RUmkFosMhCiMBYkpSTti8nM%3D; _gid=GA1.2.1487564020.1698647640; AUTH-MECHANISM-COOKIE=email; sqlRunnerLastConnectionName=d133efd9800e396abbeb9de0cc7a6f873d58159121a0fc587f8a2ec1208ad50a; rack.session=BAh7DEkiDl9fRkxBU0hfXwY6BkVGewBJIhp3YXJkZW4udXNlci5lbWFpbC5rZXkGOwBUWwdpBkkiIiQyYSQxMiRUN0d4Tk9ML2JwNFQvUHFpNjVsaFR1BjsAVEkiHHdhcmRlbi51c2VyLmRlZmF1bHQua2V5BjsAVFsHaQdJIiVhYTdkZTI4MDA5ZmU1MTQ1ZTIwNjY5MDdjYmVlNDlhNwY7AFRJIh53YXJkZW4udXNlci5lbWFpbC5zZXNzaW9uBjsAVHsASSIPc2Vzc2lvbl9pZAY7AFRvOh1SYWNrOjpTZXNzaW9uOjpTZXNzaW9uSWQGOg9AcHVibGljX2lkIkUzYzNhMzIwY2M0MmZkYjRkNzg4NDIzOWJkODRlZWRhNmIzMzM1YzhjNjA5NmFmODMzOWJiZTkwZjUwZDhlYjNiSSIPY3NyZi50b2tlbgY7AFRJIjFwZkx0VmtpSlZibVpNd3hBKzR3NlJVbWtGb3NNaENpTUJZa3BTVHRpOG5NPQY7AEZJIiB3YXJkZW4udXNlci5kZWZhdWx0LnNlc3Npb24GOwBUewA%3D--38889a0e450e0e7c796f39c2f5666869506b0402; last_heartbeat=[%22N7BzRfpqoN%22%2C1698917079151]; _gat=1; session_timeout_data={%22sess%22:1699438545%2C%22inac%22:null}",
//     },
//   }
// );

// console.log(response);

const requests = [];

const error = (e) => console.log(`Failed ${e}`);

new Array(500).fill(1).forEach(() => {
  requests.push([
    () =>
      fetch(
        "https://experiment-yatingera-load.dev.looker.com/api/internal/admin/scheduled_plans",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "X-Csrf-Token": "pfLtVkiJVbmZMwxA+4w6RUmkFosMhCiMBYkpSTti8nM=",
            Cookie:
              "looker.browser=3886530; looker.trust.hint=1; _ga=GA1.2.888881009.1690866950; __zlcmid=1Hrm7i5P4gYT2cX; _gcl_au=1.1.179879766.1696482766; _mkto_trk=id:131-VDZ-197&token:_mch-looker.com-1696482767015-24534; looker.expires_at=2023-11-08T10%3A15%3A46%2B00%3A00; looker.session_renewable=true; CSRF-TOKEN=pfLtVkiJVbmZMwxA%2B4w6RUmkFosMhCiMBYkpSTti8nM%3D; _gid=GA1.2.1487564020.1698647640; AUTH-MECHANISM-COOKIE=email; sqlRunnerLastConnectionName=d133efd9800e396abbeb9de0cc7a6f873d58159121a0fc587f8a2ec1208ad50a; rack.session=BAh7DEkiDl9fRkxBU0hfXwY6BkVGewBJIhp3YXJkZW4udXNlci5lbWFpbC5rZXkGOwBUWwdpBkkiIiQyYSQxMiRUN0d4Tk9ML2JwNFQvUHFpNjVsaFR1BjsAVEkiHHdhcmRlbi51c2VyLmRlZmF1bHQua2V5BjsAVFsHaQdJIiVhYTdkZTI4MDA5ZmU1MTQ1ZTIwNjY5MDdjYmVlNDlhNwY7AFRJIh53YXJkZW4udXNlci5lbWFpbC5zZXNzaW9uBjsAVHsASSIPc2Vzc2lvbl9pZAY7AFRvOh1SYWNrOjpTZXNzaW9uOjpTZXNzaW9uSWQGOg9AcHVibGljX2lkIkUzYzNhMzIwY2M0MmZkYjRkNzg4NDIzOWJkODRlZWRhNmIzMzM1YzhjNjA5NmFmODMzOWJiZTkwZjUwZDhlYjNiSSIPY3NyZi50b2tlbgY7AFRJIjFwZkx0VmtpSlZibVpNd3hBKzR3NlJVbWtGb3NNaENpTUJZa3BTVHRpOG5NPQY7AEZJIiB3YXJkZW4udXNlci5kZWZhdWx0LnNlc3Npb24GOwBUewA%3D--38889a0e450e0e7c796f39c2f5666869506b0402; last_heartbeat=[%22N7BzRfpqoN%22%2C1698917079151]; _gat=1; session_timeout_data={%22sess%22:1699438545%2C%22inac%22:null}",
          },
        }
      ).catch(error),
    // sdk
    //   .ok(
    //     // sdk.get("/scheduled_plans/search", { limit: "100", all_users: true })
    //     // sdk.all_scheduled_plans({ all_users: true })
    //     // request("/api/internal/admin/scheduled_plans", {
    //     //   method: "GET",
    //     //   headers: getRequestHeaders(),
    //     // })
    //   )
    //   .catch(error),
    () => sleep(200),
  ]);
});
// new Array(1000).fill(1).forEach(() => {
//   const type = sample(Object.keys(config));
//   const destination = sample(Object.keys(config[type].destination));
//   const format = sample(config[type].destination[destination]);
//   const scheduled_plan_destination = {
//     format,
//     address: Address[destination],
//     type: destination,
//     secret_parameters:
//       '{"password": "password", "secret_access_key": "secret_access_key"}',
//     parameters:
//       '{"username": "username", "access_key_id": "access_key_id", "region": "region"}',
//   };
//   const scheduled_plan = Object.assign(
//     {},
//     {
//       name: faker.company.name(),
//       crontab: "0 6 1 * *",
//       scheduled_plan_destination: [scheduled_plan_destination],
//       require_results: false,
//       require_no_results: false,
//       require_change: false,
//     },
//     type === "look" && { look_id: config[type].id },
//     type === "dashboard" && { dashboard_id: config[type].id }
//   );
//   requests.push([
//     () => sdk.ok(sdk.create_scheduled_plan(scheduled_plan)).catch(error),
//     () => sleep(150),
//   ]);
// });

serial(flatten(requests)).then(() => console.log("DONE"));
