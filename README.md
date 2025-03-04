# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Resources

If you have problems fetching data, try to visit [CORS Anywhere](https://cors-anywhere.herokuapp.com/corsdemo).\
Then press the button "Request temporary access to the demo server".\
This should fix the problem.

## Project Structure and Architecture

This project follows a standard Create React App structure with a focus on modularity and scalability. Below is an overview of the project's structure and architecture:

### Project Structure

```
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── PodcastList.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   └── PodcastPage.js
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── index.js
│   └── App.css
├── .gitignore
├── package.json
└── README.md
```

### Architecture

#### Components

- **Header.js**: Contains the navigation bar and logo.
- **Footer.js**: Contains the footer content.
- **PodcastList.js**: Displays a list of podcasts.

#### Pages

- **HomePage.js**: The landing page of the application.
- **PodcastPage.js**: Displays detailed information about a selected podcast.

#### Services

- **api.js**: Contains functions to fetch data from external APIs.

### State Management

The project uses React's built-in state management with hooks like `useState` and `useEffect` for managing component state and side effects.

### Styling

Styling is done using CSS modules. Each component has its own CSS file to maintain modularity and avoid global scope pollution.

### API Integration

The `services/api.js` file contains all the functions required to interact with external APIs. This helps in keeping the API calls organized and reusable across different components.

### Deployment

The project is set up for deployment using the `serve` library. After building the project using `npm run build`, you can deploy it by running `serve -s build/`.

### Testing

Testing is done using Jest and React Testing Library. You can run the tests using `npm run test` and check the coverage using `npm run test:coverage`.

This structure and architecture ensure that the project is easy to maintain, scalable, and follows best practices for a React application.

## Available Scripts

In the project directory, you can run:

### `npm start` development mode

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run test:coverage`

To watch full application coverage

### `npm run build` production mode

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

Since the build folder has been created you need to install serve library to run this mode.\
You have to execute `npm install -g serve` to install serve library.\
Then you can execute `serve -s build/` to run this project.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
