`brew install watchman # for relay`

`npm i`

`npm run relay:watch`

`npm start`

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
* babel/preset-typeescript's typescript compiler is not configurable
* gql endpoint written in multiple places
* relay watching and compilation to webpack plugin
* no vscode gql query autocomplete

todo:
* move relay watching and compilation to webpack plugin
