`brew install watchman # for relay`

get github access token and pass it to .env

`npm i`

`npm run relay:watch`

`npm start`

in vscode install prettier extension

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
                            └──────────────┬──────────────┘
                                           │
                                           │
                                           │
                             ┌─────────────▼──────────────┐
                             │ preset-typescript uses its │
                             │ own version of typescript, │
                             │ so tsconfig.json file and  │
                             │ typescript package uses by │
                             │        vscode only         │
                             └────────────────────────────┘
```

issues:

- gql endpoint written in multiple places
- no vscode gql query autocomplete
- ~~github access token should be on the backend~~
- ~~babel/preset-typeescript's typescript compiler is not configurable and uses 3.7x version (3.8 is last)~~

todo:

- move relay watching and compilation to webpack plugin (impossible, I tryed and it does not work)
