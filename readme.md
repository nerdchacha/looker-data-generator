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
