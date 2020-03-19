## Development

### Client

`brew install watchman # for relay`

`cd client`

get github `client_id` and `client_secret` from your `github app` and pass them to `.env`

`npm i`

`npm run relay:watch`

`npm start`

in vscode install prettier extension

### Server

`cd server`

`npm i`

`npm start`

## Client bundling scheme

```
┌──────────────────────────┐
│  webpack is entry point  │
└────────────┬─────────────┘
             │
             │
             │               ┌───────────────────────────┐
      ┌──────▼───────┐       │ relay-compiler and stuff  │
      │ babel-loader ├───────▶                           │
      └──────┬───────┘       │  (relay requires babel)   │
             │               └───────────────────────────┘
             │
             │
             │
             │              ┌─────────────────────────────┐
             │              │  @babel/preset-typescript   │
             │              │                             │
             └──────────────▶  and @babel/preset-react,   │
                            │      @babel/preset-env      │
                            │                             │
                            └─────────────────────────────┘
```

issues:

- gql endpoint written in multiple places
- no vscode gql query autocomplete

todo:

- move relay watching and compilation to webpack plugin (impossible, I tryed and it does not work)
