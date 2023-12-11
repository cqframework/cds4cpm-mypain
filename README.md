This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

## Docker
### To run an image from dockerhub
The images for PainManger version are stored at [dockerhub](https://hub.docker.com/r/alphora/pain-manager). They may be used by running docker and specifying
   ```
   docker pull alphora/my-pain:v0.5.1 
   ```

This image may be used by
   ```
   docker run -p 80:80 pain-manager:v0.5.1 
   ``` 
### To build with docker run:

`docker build .`

from the root directory. This is will build a container which serves content on port 80. You can run this with:

`docker run -p 80:80 <hash>`

## Version v0.5.1
For v0.5.1 the launch-context.json file
   ```json
   {
     "clientId": "6c12dff4-24e7-4475-a742-b08972c4ea27",
     "scope":  "patient/*.read launch/patient",
     "iss": "url-goes-here"
   }
   ```
was removed from the docker setup to allow implementers to have an external file that they could edit and use without rebuilding the docker image. The PainManager application is now using the following to load the contents of that file by:

      fetch(process.env.PUBLIC_URL + '/pain-manager-config/launch-context.json')
and if using "docker run" to start the docker image, it may be loaded by

      docker run -p 8010:80 -v /home/ec2-user/my-pain-config:/home/node/app/public/my-pain-config <docker image id>
or when using docker-compose adding the following volume:

    volumes:
      - '/home/ec2-user/my-pain-config:/home/node/app/public/my-pain-config'

The first part of the command '/home/ec2-user/my-pain-config:' should be the path to wherever the implementer has their edited location-context.json file. It is critical for the location of the volume in the docker container to be '/home/node/app/public/my-pain-config'. 

