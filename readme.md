`brew install watchman # for relay`

`npm i`

`npm run relay:watch`

`npm start`

babel/preset-typescript does not use tsconfig, it uses it's own version of typescript, at this moment it's 3.7x, so you can't use import type (https://github.com/babel/babel/pull/11171).
So I use tsconfig.json and typescipt package in package.json for vscode only
