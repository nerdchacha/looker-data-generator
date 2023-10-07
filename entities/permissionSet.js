import { faker } from '@faker-js/faker'
import sampleSize from 'lodash/sampleSize.js'

import { createEntity } from '../util.js'
import { lookerSDK } from '../sdk.js'

const allPermissions = [
  "access_data",
  "see_lookml_dashboards",
  "see_looks",
  "see_user_dashboards",
  "explore",
  "create_table_calculations",
  "create_custom_fields",
  "can_create_forecast",
  "can_override_vis_config",
  "save_content",
  "save_dashboards",
  "save_looks",
  "create_public_looks",
  "download_with_limit",
  "download_without_limit",
  "schedule_look_emails",
  "schedule_external_look_emails",
  "create_alerts",
  "follow_alerts",
  "send_to_s3",
  "send_to_sftp",
  "send_outgoing_webhook",
  "send_to_integration",
  "see_sql",
  "see_lookml",
  "develop",
  "deploy",
  "support_access_toggle",
  "manage_project_models",
  "use_global_connections",
  "manage_project_connections",
  "use_sql_runner",
  "clear_cache_refresh",
  "see_drill_overlay",
  "manage_spaces",
  "manage_homepage",
  "manage_models",
  "manage_stereo",
  "create_prefetches",
  "login_special_email",
  "embed_browse_spaces",
  "embed_save_shared_space",
  "see_alerts",
  "see_queries",
  "see_logs",
  "see_users",
  "sudo",
  "see_schedules",
  "see_pdts",
  "see_datagroups",
  "update_datagroups",
  "see_system_activity",
  "mobile_app_access"
]

export const create = (filename) => (count) => {
  const sdk = lookerSDK(filename)
  console.log(`<INFO> Creating ${count} Permission Sets`)
  return createEntity({
    sdk,
    count,
    creator: () => sdk.create_permission_set({
      name: `${faker.company.name()} ${faker.number.hex()}`,
      permissions: [sampleSize(allPermissions, 6)]
    }),
    type: 'permission set'
  })
}