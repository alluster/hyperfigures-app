# Hyperfigures App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the root directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

The port 3000 is proxy from port 5000 where the server.js file will serve the app.


## NPM audit Considerations

Running `npm audit` will report a critical vulnerability in `react-scripts`. The exposed attack vector is over the network, but `react-scripts` is a build-level dep and will not be included in any published versions of the app, so we can ignore this particular vulnerability. For further reading, start with [this comment](https://github.com/facebook/create-react-app/issues/11647#issuecomment-1243863292)
