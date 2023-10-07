## Getting started

- Make generate file executable

```
chmod +x generate
```

- Configure the tool by running

```
generate config -e [env_name] -b [base_url] -i [client_id] -s [client_secret]
```

`env_name` any name to give to your config

`base_url` Base URL of the looker instance where you need to generate data

`client_id` Client Id of API creds of the Admin

`client_secret` Client Secret of API creds of the Admin

- Run the following command to see all options and how to use them

```
./generate --help
```
