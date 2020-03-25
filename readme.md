## Development

in vscode install prettier extension

`brew install watchman # for relay`

get github `client_id` and `client_secret` from your `github app` and pass them to `.env` in root and to `.env` in `server` repo

`npx lerna bootstrap`

`npm run dev`

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
- server can read .env file in its root only, [zeit/now will add monorepo support](https://github.com/zeit/now/issues/3547#issuecomment-587051749)
- move relay watching and compilation to webpack plugin (impossible, I tryed and it does not work)
