## Getting started

- Install dependencies

```
npm install
```

- Make generate file executable

```
chmod +x generate
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
```

- Create groups in the instance

```
generate group -e [env_name] -c [number_of_entities_to_create]
```

- Create user attributes in the instance

```
generate user_attribute -e [env_name] -c [number_of_entities_to_create]
```

- Create permission set with 6 random permissions in each permission_set in the instance

```
generate permission_set -e [env_name] -c [number_of_entities_to_create]
```

- Create empty model set in the instance

```
generate model_set -e [env_name] -c [number_of_entities_to_create]
```

- Create themes in the instance

```
generate theme -e [env_name] -c [number_of_entities_to_create]
```

- Create roles by picking existing random permission_set and existing random model_set from the in the instance

```
generate role -e [env_name] -c [number_of_entities_to_create]
```

- Randomly assign 3 existing roles in the system to all existing users and existing groups

```
generate assign role -e [env_name]
```

- Creates a group hierarchy with `[count]` number of groups in the hierarchy chain

```
./generate action group_hierarchy -c [count] -e [env_name]
```

- Generate random data for the User Management module.
  This command adds Users, Groups, Permission Sets, Model Set, Roles and User Attributes to the instance as per the size defined

  Size can be xs, s, m, l, xl and xxl where xs generates 20, s generates 60, m generates 100, l generates 500, xl generates 1000 and xxl generates 3000 entities

```
./generate user_management -e [env_name] -s [size]
```
