import fs from "fs";
import { Command } from "commander";

import { create as createGroup } from "./entities/group.js";
import { create as createModelSet } from "./entities/modelSet.js";
import { create as createPermissionSet } from "./entities/permissionSet.js";
import { create as createRole } from "./entities/role.js";
import { create as createTheme } from "./entities/theme.js";
import { create as createUser } from "./entities/user.js";
import { create as createUserAttribute } from "./entities/userAttribute.js";

import { assign as assignRoles } from "./actions/role.js";
import { assign as assignMembers, createHierarchy } from "./actions/group.js";

const SIZES = {
  xs: 20,
  s: 60,
  m: 200,
  l: 500,
  xl: 1000,
  xxl: 3000,
};

const DEFAULT_SDK_FILE = "looker.ini";

const program = new Command();

const configError =
  "<ERROR> CLI not configured. Use the config command to configure the CLI";

program
  .name("Looker Fake Data Generator")
  .description("CLI to generate random entity in looker")
  .version("0.0.1");

program
  .command("config")
  .description(
    "create a configuration file with details like base url, client_id and client_secret for the user with which all API calls will be made"
  )
  .option(
    "-e, --env [env]",
    "Name of the environment. This name will be used to create a config file which will contain details like base url, client_id and client_secret. Default value - looker"
  )
  .option("-b, --base-url <baseUrl>", "Base url of the looker instance")
  .option("-i, --client-id <clientId>", "Client ID for the looker instance")
  .option(
    "-s, --client-secret <clientSecret>",
    "Client Secret for the looker instance"
  )
  .action(({ env, baseUrl, clientId, clientSecret }) => {
    const filename = env ? `${env}.ini` : DEFAULT_SDK_FILE;
    fs.writeFileSync(
      filename,
      `[Looker]
base_url=${baseUrl}
client_id=${clientId}
client_secret=${clientSecret}
    `
    );
    console.log("<SUCCESS> Setup Successful");
  });

program
  .command("group")
  .option("-c, --count <count>", "Number of groups to create")
  .option(
    "-e, --env [env]",
    "Name of the environment (if one was created using the config command). Default value - looker"
  )
  .description("Creates random groups in the looker instance")
  .action(({ env, count }) => {
    const filename = env ? `${env}.ini` : DEFAULT_SDK_FILE;
    if (!filename) {
      console.log(configError);
    }
    createGroup(filename)(parseInt(count));
  });
program
  .command("model_set")
  .description(
    "Creates random model sets with All access in the looker instance"
  )
  .option("-c, --count <count>", "Number of model sets to create")
  .option(
    "-e, --env [env]",
    "Name of the environment (if one was created using the config command). Default value - looker"
  )
  .action(({ env, count }) => {
    const filename = env ? `${env}.ini` : DEFAULT_SDK_FILE;
    if (!filename) {
      console.log(configError);
    }
    createModelSet(filename)(parseInt(count));
  });
program
  .command("permission_set")
  .description(
    "Creates random permission sets with 6 random permissions in the looker instance"
  )
  .option("-c, --count <count>", "Number of permission sets to create")
  .option(
    "-e, --env [env]",
    "Name of the environment (if one was created using the config command). Default value - looker"
  )
  .action(({ env, count }) => {
    const filename = env ? `${env}.ini` : DEFAULT_SDK_FILE;
    if (!filename) {
      console.log(configError);
    }
    createPermissionSet(filename)(parseInt(count));
  });
program
  .command("role")
  .description(
    "Creates random roles in the looker instance and assigns existing model set and permission set in a random fashion"
  )
  .option("-c, --count <count>", "Number of roles to create")
  .option(
    "-e, --env [env]",
    "Name of the environment (if one was created using the config command). Default value - looker"
  )
  .action(({ env, count }) => {
    const filename = env ? `${env}.ini` : DEFAULT_SDK_FILE;
    if (!filename) {
      console.log(configError);
    }
    createRole(filename)(parseInt(count));
  });
program
  .command("theme")
  .description("Creates random themes in the looker instance")
  .option("-c, --count <count>", "Number of themes to create")
  .option(
    "-e, --env [env]",
    "Name of the environment (if one was created using the config command). Default value - looker"
  )
  .action(({ env, count }) => {
    const filename = env ? `${env}.ini` : DEFAULT_SDK_FILE;
    if (!filename) {
      console.log(configError);
    }
    createTheme(filename)(parseInt(count));
  });
program
  .command("user")
  .description("Creates random users in the looker instance")
  .option("-c, --count <count>", "Number of users to create")
  .option(
    "-e, --env [env]",
    "Name of the environment (if one was created using the config command). Default value - looker"
  )
  .action(({ env, count }) => {
    const filename = env ? `${env}.ini` : DEFAULT_SDK_FILE;
    if (!filename) {
      console.log(configError);
    }
    createUser(filename)(parseInt(count));
  });
program
  .command("user_attribute")
  .description("Creates random user attributes in the looker instance")
  .option("-c, --count <count>", "Number of user attributes to create")
  .option(
    "-e, --env [env]",
    "Name of the environment (if one was created using the config command). Default value - looker"
  )
  .action(({ env, count }) => {
    const filename = env ? `${env}.ini` : DEFAULT_SDK_FILE;
    if (!filename) {
      console.log(configError);
    }
    createUserAttribute(filename)(parseInt(count));
  });

program
  .command("user_management")
  .description(
    "Adds Users, Groups, Permission Sets, Model Set, Roles and User Attributes to the instance as per the size defined"
  )
  .option(
    "-s, --size <size>",
    "Size can be xs, s, m, l, xl and xxl where xs generates 20, s generates 60, m generates 100, l generates 500, xl generates 1000 and xxl generates 3000 entities"
  )
  .option(
    "-e, --env [env]",
    "Name of the environment (if one was created using the config command). Default value - looker"
  )
  .action(async ({ env, size }) => {
    const filename = env ? `${env}.ini` : DEFAULT_SDK_FILE;
    if (!filename) {
      console.log(configError);
    }
    if (!SIZES[size]) {
      console.log(
        '<WARNING> Unknown size provided. Creating fake data with size "s"'
      );
    }
    const count = SIZES[size] || SIZES.s;
    await createPermissionSet(filename)(count);
    await createModelSet(filename)(count);
    await createRole(filename)(count);
    await createUser(filename)(count);
    await createGroup(filename)(count);
    await createUserAttribute(filename)(count);
    await assignRoles(filename)();
    await assignMembers(filename)();
    console.log(`<SUCCESS> Instance populated with fake data`);
  });

const actionsCommand = program
  .command("action")
  .description("Exposes different actions that the sdk can perform");

const assignCommand = actionsCommand
  .command("assign")
  .description("Associates one entity with another in the looker instance");

assignCommand
  .command("role")
  .option(
    "-e, --env [env]",
    "Name of the environment (if one was created using the config command). Default value - looker"
  )
  .description(
    "Assigns existing roles to existing users and groups in the instance in a random fashion"
  )
  .action(({ env }) => {
    const filename = env ? `${env}.ini` : DEFAULT_SDK_FILE;
    if (!filename) {
      console.log(configError);
    }
    assignRoles(filename)();
  });

assignCommand
  .command("group_member")
  .option(
    "-e, --env [env]",
    "Name of the environment (if one was created using the config command). Default value - looker"
  )
  .description(
    "Assigns existing groups and users to existing groups in the instance in random a fashion"
  )
  .addHelpText(
    "after",
    "Some APIs may fail as we might try to assign groups to groups in cyclical fashion. This can be ignored"
  )
  .action(({ env }) => {
    const filename = env ? `${env}.ini` : DEFAULT_SDK_FILE;
    if (!filename) {
      console.log(configError);
    }
    assignMembers(filename)();
  });

assignCommand
  .command("group_hierarchy")
  .option(
    "-e, --env [env]",
    "Name of the environment (if one was created using the config command). Default value - looker"
  )
  .option("-c, --count <count>", "Number of groups in the hierarchy chain")
  .description(
    "Creates a group hierarchy with <count> number of groups in the hierarchy chain"
  )
  .action(({ env, count }) => {
    const filename = env ? `${env}.ini` : DEFAULT_SDK_FILE;
    if (!filename) {
      console.log(configError);
    }
    createHierarchy(filename)(parseInt(count));
  });

program.parse();
