
# Introduction

This is a simple trading dashboard application that uses Module Federation as a way of stitching together multiple React widget applications at runtime. The application is powered by a mock server created to supply it with mock data via WebSockets (for real-time updates) and REST endpoints (for initial information fetching).

Each widget serves a different purpose:

 - The **Position** widget allows the trader to see their current position.
 - The **Chart** widget shows a candlestick chart displaying the current price. This is updated via real time updates.
 - The **Order Entry** widget allows the trader to place buy/sell orders to be executed when the set price is reached.
 - The **Order Book** widget allows the trader to view the outstanding (unexecuted) orders.

 **Note: All orders are accepted, but any orders that are executed as a price is reached but can't be actioned due to insufficient funds or units will be discarded.**

There is also an example of **inter-widget communication** via Custom Event's, where the Chart widget dispatches an event containing the latest price information so that the Position widget can update its own state too. 

# Getting Started

Follow these steps in order to get your application running locally.

 1. Ensure you have NPM version 7 or above and run `npm install` at the root directory of the project to install dependencies for all packages.
 2. Navigate to the `/packages/server` package and run `npm start`, this will stock your mock server.
 3. Navigate each of the remaining packages and run `npm start` within each. The other packages include `chart-widget`, `dashboard`, `order-book-widget`, `order-entry-widget`, & `position-widget`.
 4. In your browser, go to `http://localhost:3000` to view the running application.


# Technologies/Patterns Chosen

 - **Monorepo** to enable Module Federation and to track changes more easily. 
 - **React** for the view layer.
 - **TypeScript** to gain strong typing at build time.
 - **CSS Modules** to prevent CSS from accidentally leaking out from one widget to another.
 - **Webpack 5** for bundling the application and to enable **Module Federation** based Microfrontends.
 - **ESLint** for linting the application.
 - **Prettier** for code style consistency.
 - **Jest** & **React Testing Library** for unit testing.
 - **Cypress** for E2E testing.
 - **Create-React-App** for bootstrapping the initial application.
 - **Craco** to allow us to override the CRA defaults.
 - **NodeJS**, **Express**, & **WS** to power the mock server. 

# Technologies Considered
 - Considered bringing in **Redux** for state management but as the level of state within each widget was small, I decided to just use regular React state. For a more complicated application, Redux would be a good candidate for state management as it scales very well for more complicated applications.

# Testing
 - For **unit testing** we have combined the use of **Jest** & **React Testing Library** for component testing. Also **Jest** by itself for testing business logic. Usually there would be a strict goal for high test coverage throughout the application but as this just a simple app there we have just put a simple example of component testing within the Position widget.
 - For **E2E testing** we are using **Cypress**. An example of this can be seen in the root of the project covering the Order Entry widget. To start Cypress run `npm run start:cypress` in the root of the project.

# Possible Future Improvements

 - If the application was expected to grow in complexity, we could look into introducing **Redux** for state management.
 - Introduce a library for Forms management such as **Formik** or **React Hook Form**.
 - Look at creating a shared component library building on top of something like **Material-UI**. This could then be shared across the widgets as necessary to encourage code re-use.
 - Consolidating common code such as API fetching into a shared package.
 - Increase integration tests and unit testing coverage across the application.
 - Introducing **Lerna** for monorepo build and versioning support.
 - Introduce **CI/CD** to streamline the build and release process.