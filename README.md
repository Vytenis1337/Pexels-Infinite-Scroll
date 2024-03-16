# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Clone repository

git clone https://github.com/Vytenis1337/Vinted-Infinite-Scroll.git

cd Vinted-Infinite-Scroll

## Install dependencies

npm install

## Setting up Your API Key

To run this application locally, you'll need to obtain an API key from Pexels. Follow the steps below to set up your API key:

Obtain an API Key:

&centerdot; Visit Pexels Developers and sign up for an API key if you haven't already.

Configure Environment Variables:

&centerdot; In the root directory of this project, create a file named .env.

&centerdot; Add the following line to the .env file, replacing your_api_key_here with your actual Pexels API key:

REACT_APP_PEXELS_API_KEY=your_api_key_here

&centerdot; This application is configured to automatically use this environment variable for API requests to Pexels.

## Usage

In this application, users can navigate through a gallery of images fetched from the Pexels API. Hovering over the images will display the title, photographer, and an option to favorite or unfavorite an image (the latter option is available if the image is already marked as a favorite, and vice versa).

Once at least one image is marked as a favorite, a button appears at the top right of the screen. Clicking this button opens a modal window containing all the images the user has marked as favorites. Users can scroll through their favorite images within the modal and choose to unfavorite them if desired.

As users scroll down and the window.scrollY value exceeds 300, a button becomes visible. Clicking this button smoothly scrolls the user back to the top of the page, enhancing navigation and user experience.

## Architecture

Components:

&centerdot; 'App': This is the root component where the application's main structure is defined.

&centerdot; 'MainPage': This is the main page of application. It serves as the container for the FetchImages component, encapsulating the gallery's core functionality within a dedicated layout.

&centerdot; 'FetchImages': Responsible for fetching and rendering the gallery images. It utilizes the custom useImages hook to retrieve image data from the Pexels API and manages pagination through infinite scrolling implemented by the useInfiniteScroll hook. It also interacts with the useFavorites context to allow users to favorite or unfavorite images.

&centerdot; 'ImageCard': A presentation component that displays individual images. It incorporates lazy loading via the useLazyLoad hook to improve performance and user experience. The card shows image details on hover and provides a button for toggling the image's favorite status, leveraging the useFavorites context.

&centerdot; 'FavSection': displays a button that triggers the modal.

&centerdot; 'FavModal': contains the favorited images. Users can review and manage their favorites within this modal.

&centerdot; 'ScrollTopButton': Appears when the user scrolls down the page and allows for a smooth scroll back to the top. This component enhances navigation and accessibility within the application.

Custom Hooks:

&centerdot; 'useImages': Fetches images from the Pexels API and manages loading state, errors, and pagination. It uses a combination of useState, useEffect, and useRef to handle the asynchronous API requests efficiently.

&centerdot; 'useInfiniteScroll': Implements infinite scrolling functionality by using an IntersectionObserver to load more images as the user scrolls down.

&centerdot; 'useLazyLoad': Optimizes image loading by deferring the loading of off-screen images until they are about to enter the viewport. It uses IntersectionObserver for performance-friendly lazy loading.

Context Management:

&centerdot; 'FavoritesContext and useFavoritesContext:': Manages the favorite images within the application, allowing users to add or remove images from their favorites list. This context provides a global state that can be accessed by various components.

Utility Functions and Helpers:

&centerdot; 'localStorage Helper Functions': Include functions for persisting the favorite images to localStorage, ensuring that user preferences are saved across sessions.

&centerdot; 'getPostPage Function': A utility function to abstract the API call logic, making it reusable and maintaining cleaner component code.

## API Documentation

The Pexels API was used to provide access to high-quality, curated photos from the Pexels platform, which photographers around the world contribute to.
The primary endpoint used in this application is the Curated Photos endpoint, which returns a curated selection of photos:
Curated Photos
Endpoint: /curated
Method: GET
Parameters:
page: The page number of the curated photo list.
per_page: The number of photos to return per page. Maximum is 80.
Headers:
Authorization: Your Pexels API key.
