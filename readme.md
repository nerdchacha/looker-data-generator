## Getting started

#### Requires node.js v18.9.0 or greater to run

- Clone the repo

```
git clone https://github.com/nerdchacha/looker-data-generator.git
```

- Install dependencies

```
npm install
```

- Make generate file executable

```
chmod +x generate
```

> alternatively, use node to run the `index.js` file.
> <br  />
> Replace `generate` with `node index` in all the following commands if you are using this method

```
node index [command]
```

- Run the following command to see help

```
./generate --help
```

- Run the following command to see help for a specific command

```
./generate [command_name] --help
```

- Configure the tool by setting details of the env where you want fake data to be populated

```
generate config -e [env_name] -b [base_url] -i [client_id] -s [client_secret]
```

> `env_name` any name to give to your config
>
> `base_url` Base URL of the looker instance where you need to generate data
>
> `client_id` Client Id of API creds of the Admin
>
> `client_secret` Client Secret of API creds of the Admin

## Usage

The following commands assume that you have already run the `config` command and have configured an environment for this sdk

- Create users in the instance

```
generate user -e [env_name] -c [number_of_entities_to_create]

<EXAMPLE> generate user -e local -c 200
```

- Create groups in the instance

```
generate group -e [env_name] -c [number_of_entities_to_create]

<EXAMPLE> generate group -e local -c 200
```

- Create user attributes in the instance

```
generate user_attribute -e [env_name] -c [number_of_entities_to_create]

<EXAMPLE> generate user_attribute -e local -c 200
```

- Create permission set with 6 random permissions in each permission_set in the instance

```
generate permission_set -e [env_name] -c [number_of_entities_to_create]

<EXAMPLE> generate permission_set -e local -c 200
```

- Create empty model set in the instance

```
generate model_set -e [env_name] -c [number_of_entities_to_create]

<EXAMPLE> generate model_set -e local -c 200
```

- Create themes in the instance

```
generate theme -e [env_name] -c [number_of_entities_to_create]

<EXAMPLE> generate theme -e local -c 200
```

- Create roles by picking existing random permission_set and existing random model_set from the in the instance

```
generate role -e [env_name] -c [number_of_entities_to_create]

<EXAMPLE> generate role -e local -c 200
```

- Randomly assign 3 existing roles in the system to all existing users and existing groups

```
generate action assign role -e [env_name]

<EXAMPLE> action assign role -e local
```

- Randomly Assigns existing groups and users to existing groups in the instance in random a fashion

```
generate action assign group_member -e [env_name]

<EXAMPLE> action assign group_member -e local
```

- Creates a group hierarchy with `[count]` number of groups in the hierarchy chain

```
./generate action group_hierarchy -c [count] -e [env_name]

<EXAMPLE> action assign group_hierarchy -e local
```

- Generate random data for the User Management module.
  This command adds Users, Groups, Permission Sets, Model Set, Roles and User Attributes to the instance as per the size defined

  Size can be xs, s, m, l, xl and xxl where xs generates 20, s generates 60, m generates 100, l generates 500, xl generates 1000 and xxl generates 3000 entities

```
./generate user_management -e [env_name] -s [size]
```
