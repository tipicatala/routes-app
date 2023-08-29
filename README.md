# Routes App

The **Routes App** is a web application that helps users plan their trips by calculating distances and displaying route maps between different cities. This application is built using React and leverages the MUI (Material-UI) framework for user interface components.

## Features

- **Search Form**: Users can input various criteria for their trip, including the origin city, destination city, date of the trip, number of passengers, and optional changes cities.

- **Distance Calculation**: The application calculates and displays the distances between different cities based on user input.

- **Route Map**: The calculated distances are visually represented on a map using the Leaflet library, providing users with a graphical representation of their route.

## Installation

To set up and run the Routes App locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/routes-app.git
   cd routes-app

2. Install dependencies:

   ```bash
   yarn

3. Start the development server:

   ```bash
   yarn dev

4. Access the app in your browser:

   ```bash
   Open http://localhost:5173 to view the app.


## Usage

1. Launch the app by visiting [http://localhost:5173](http://localhost:5173) in your browser.

2. On the home page, you can input the following details for your trip:

   - Origin city (autocomplete with suggestions)
   - Changes cities (optional, multiple can be added)
   - Destination city (autocomplete with suggestions)
   - Date of the trip (select a future date)
   - Number of passengers

3. Click the "Add destination" button to add additional changes cities.

4. After filling in the required details, click the "Search" button.

5. The app will display the calculated distances between cities, the total distance of the trip, and a route map.
