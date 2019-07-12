
# iTunes APP


## Install

```
$ npm install
```

## Run app in dev mode

`npm start && node server`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.


## Build app

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### env vars

**iTunes API**
```
REACT_APP_PUBLIC_API_HOST=itunes.apple.com # iTunes API
REACT_APP_PUBLIC_API_PROTOCOL=https: # iTunes protocol
```

**Proxy vars**
```
REACT_APP_PROXY_PROTOCOL=http: # Proxy protocol
REACT_APP_PROXY_HOST=localhost # Proxy host
REACT_APP_PROXY_PORT=8080 # Proxy port
```

**Cache**
```
CACHE_EXPECTED_LIFE_TIME_HOURS=86400 # cache lifetime
```


## Run app in production mode

You have to build the app first.

```
$ node server
$ npx serve -s build
```
