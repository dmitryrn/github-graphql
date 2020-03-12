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
