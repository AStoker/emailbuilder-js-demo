# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Building and Running

There is a `sample` folder that contains a simple Node server and a trivial html page that can be used to test the email builder as a web component. Assuming you've at least built the actual email builder and have a `dist` folder (if you don't, make sure you've run `yarn` to install the dependencies, then run `yarn run build`), you can run the sample server by first `cd`ing into the `sample` folder and then running `yarn run serve`. This will start a simple Node server that serves the `index.html` file, which includes the email builder as a web component.