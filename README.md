# Netflix GPT Clone

A React-based movie streaming application that uses TMDB API to display movies, trailers, and provides a Netflix-like experience.

## Environment Setup

Before running the application, you need to set up your environment variables:

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Get your TMDB API token from [The Movie Database](https://www.themoviedb.org/settings/api)

3. Update the `.env` file with your API token:
   ```
   REACT_APP_TMDB_AUTH_TOKEN=your_tmdb_auth_token_here
   ```

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## ⚡️ Using Your Own Firebase Project

To deploy this app to your own Firebase Hosting, you must set up your own Firebase project and update the configuration:

### 1. Create a Firebase Project

- Go to [Firebase Console](https://console.firebase.google.com/).
- Click **Add project** and follow the steps.

### 2. Install Firebase CLI (if not already)

```bash
npm install -g firebase-tools
```

### 3. Login to Firebase

```bash
firebase login
```

### 4. Initialize Firebase in Your Project

```bash
firebase init
```
- Select **Hosting** and follow the prompts.
- When asked, select your new Firebase project.

### 5. Update `.firebaserc`

Edit the `.firebaserc` file in your project root to use your project ID:
```json
{
  "projects": {
    "default": "your-firebase-project-id"
  }
}
```
Replace `"your-firebase-project-id"` with your actual Firebase project ID.

### 6. Update Firebase Config in Code

If your app uses a Firebase config object (commonly in `src/utils/firebase.js`), replace it with your own config from the Firebase Console:
- Go to **Project Settings > General > Your apps > SDK setup and configuration**.
- Copy your config and replace the existing one in your code.

### 7. Deploy

```bash
npm run deploy
```

**Now your app will be deployed to your own Firebase Hosting project!**

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### Deploying to Firebase

1. **Build the app:**
   ```bash
   npm run build
   ```
2. **Deploy to Firebase:**
   ```bash
   npm run deploy
   ```
   This will build the app and deploy the contents of the `build/` folder to Firebase Hosting.

3. **Live App:**
   Your app is live at: [https://cheapflix-8f9b4.web.app](https://cheapflix-8f9b4.web.app)

---

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
