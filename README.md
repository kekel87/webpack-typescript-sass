# Typescript Webpack Starter

>🚀 Typescript & SASS Starter kit using webpack for packaging.

## Built upon

- [x] [Typescript 2](https://github.com/Microsoft/TypeScript)
- [x] [Sass](http://sass-lang.com/)
- [x] [Webpack 3](https://webpack.js.org/)
- [x] [Webpack Dashboard](https://github.com/FormidableLabs/webpack-dashboard)

<img src="http://i.imgur.com/pETTX85.png" width="400">


# Getting started

## Clone Typescript Webpack Starter

```bash
git clone https://github.com/emyann/typescript-webpack-starter.git
cd typescript-webpack-starter
# Install the dependencies
npm install
```

## Run

Start a Webpack dev server 
```bash
npm start
```
And go to this URL: `http://localhost:3000` - 🎉

Start a Webpack server with the production configuration 
```bash
npm run server:prod
```

## Build Only
Build a development release
```bash
npm run build
```

Build a production release
```bash
npm run build:prod
```
After build phase, 3 files are generated into the `dist` folder:
- `app.bundle.js` - contains the core of the application. From the entry point `src/index.ts`
- `vendor.bundle.js` - contains the vendor dependencies
- `index.html` - html page with references to the 2 files above

Thanks :
- [emyann/typescript-webpack-starter](https://github.com/emyann/typescript-webpack-starter)
- [juristr/webpack-typescript-starter](https://github.com/juristr/webpack-typescript-starter)
- [Floriangomis/Webpack-Typescript-Sass-Starter_Project](https://github.com/Floriangomis/Webpack-Typescript-Sass-Starter_Project)
- [AngularClass/angular-starter](https://github.com/AngularClass/angular-starter)

